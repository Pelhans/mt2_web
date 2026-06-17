const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const DB_PATH = path.join(ROOT, "server-data.json");
const PORT = Number(process.env.PORT) || 3000;

const DEFAULT_DB = {
  users: [],
  sessions: {},
  saves: {},
  leaderboard: {},
  mails: {},
  season: {
    lastSettledWeek: null,
    currentSeason: 1,
  settledLeaderboards: {},
  },
  guildBoss: {
    season: 1,
    maxHp: 250000,
    hp: 250000,
    contributions: {},
  },
};

let db = loadDb();
let writeQueue = Promise.resolve();

function loadDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_DB,
      ...parsed,
      sessions: parsed.sessions || {},
      saves: parsed.saves || {},
      leaderboard: parsed.leaderboard || {},
      mails: parsed.mails || {},
      season: {
        ...DEFAULT_DB.season,
        ...(parsed.season || {}),
        settledLeaderboards: (parsed.season && parsed.season.settledLeaderboards) || {},
      },
      guildBoss: {
        ...DEFAULT_DB.guildBoss,
        ...(parsed.guildBoss || {}),
        contributions: (parsed.guildBoss && parsed.guildBoss.contributions) || {},
      },
    };
  } catch {
    const fresh = JSON.parse(JSON.stringify(DEFAULT_DB));
    fs.writeFileSync(DB_PATH, JSON.stringify(fresh, null, 2));
    return fresh;
  }
}

function persistDb() {
  const payload = JSON.stringify(db, null, 2);
  writeQueue = writeQueue
    .then(() => fs.promises.writeFile(DB_PATH, payload, "utf8"))
    .catch((err) => {
      console.error("Persist DB failed:", err);
    });
  return writeQueue;
}

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  });
  res.end(JSON.stringify(body));
}

function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      sendJson(res, 404, { message: "Not found" });
      return;
    }
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(content);
  });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function hashPassword(password, salt) {
  return crypto.createHash("sha256").update(`${password}:${salt}`).digest("hex");
}

function issueToken() {
  return crypto.randomBytes(24).toString("hex");
}

function getAuthUser(req) {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  const userId = db.sessions[token];
  if (!userId) return null;
  const user = db.users.find((u) => u.id === userId);
  if (!user) return null;
  return user;
}

function sanitizeSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object") return null;
  const dungeonProgress = snapshot.dungeonProgress && typeof snapshot.dungeonProgress === "object"
    ? {
      dailyKey: String(snapshot.dungeonProgress.dailyKey || ""),
      weeklyKey: String(snapshot.dungeonProgress.weeklyKey || ""),
      attempts: snapshot.dungeonProgress.attempts && typeof snapshot.dungeonProgress.attempts === "object"
        ? snapshot.dungeonProgress.attempts
        : {},
    }
    : { dailyKey: "", weeklyKey: "", attempts: {} };

  return {
    gold: Number(snapshot.gold) || 0,
    gem: Number(snapshot.gem) || 0,
    unlockedStage: clamp(Number(snapshot.unlockedStage) || 1, 1, 999999),
    selectedStage: clamp(Number(snapshot.selectedStage) || 1, 1, 999999),
    selectedHero: typeof snapshot.selectedHero === "string" ? snapshot.selectedHero : null,
    team: Array.isArray(snapshot.team) ? snapshot.team.slice(0, 5) : [],
    heroes: snapshot.heroes && typeof snapshot.heroes === "object" ? snapshot.heroes : {},
    dungeonProgress,
    logs: Array.isArray(snapshot.logs)
      ? snapshot.logs.slice(-150).map((line) => ({
        text: String(line?.text || ""),
        type: typeof line?.type === "string" ? line.type : "",
      }))
      : [],
  };
}

function getLeaderboard() {
  return Object.values(db.leaderboard)
    .sort((a, b) => {
      if (b.power !== a.power) return b.power - a.power;
      if (b.stage !== a.stage) return b.stage - a.stage;
      return (a.updatedAt || 0) - (b.updatedAt || 0);
    })
    .slice(0, 50)
    .map((item) => ({
      userId: item.userId,
      username: item.username,
      power: item.power,
      stage: item.stage,
    }));
}

/**
 * 计算当前ISO周次标识 (格式: "YYYY-Www")
 */
function getCurrentWeekKey() {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now - jan1) / 86400000) + 1;
  const weekNum = Math.ceil((dayOfYear + jan1.getDay()) / 7);
  return `${now.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

/**
 * 获取当前赛季的起止日期文本
 */
function getSeasonDateRange() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const fmt = (d) => `${d.getMonth() + 1}/${d.getDate()}`;
  return { startText: fmt(monday), endText: fmt(sunday) };
}

/**
 * 检测并执行赛季结算
 * - 每个ISO周只结算一次
 * - 结算时对上一赛季排行榜前50名发放奖励邮件
 * - 清空当前排行榜，赛季号 +1
 */
function checkAndSettleSeason() {
  const currentWeek = getCurrentWeekKey();
  if (db.season.lastSettledWeek === currentWeek) return false;

  // 有排行榜数据时才结算
  const board = getLeaderboard();
  if (board.length > 0) {
    // 存档旧赛季排行榜
    db.season.settledLeaderboards[`S${db.season.currentSeason}`] = board.slice(0, 50);
    // 保留最近5赛季
    const keys = Object.keys(db.season.settledLeaderboards).sort();
    while (keys.length > 5) {
      delete db.season.settledLeaderboards[keys.shift()];
    }

    // 按排名发放奖励邮件
    const REWARD_TIERS = [
      { maxRank: 1, gold: 8000, gem: 80 },
      { maxRank: 3, gold: 5000, gem: 50 },
      { maxRank: 10, gold: 3000, gem: 30 },
      { maxRank: 30, gold: 1500, gem: 15 },
      { maxRank: 50, gold: 800, gem: 8 },
    ];

    board.forEach((entry, idx) => {
      const rank = idx + 1;
      const tier = REWARD_TIERS.find((t) => rank <= t.maxRank);
      if (!tier) return;

      const userId = entry.userId;
      if (!db.mails[userId]) db.mails[userId] = [];

      db.mails[userId].unshift({
        id: `season-S${db.season.currentSeason}-${userId}-${rank}`,
        title: `赛季 S${db.season.currentSeason} 结算奖励`,
        body: `恭喜你在赛季 S${db.season.currentSeason} 排行榜中获得第 ${rank} 名！`,
        reward: { gold: tier.gold, gem: tier.gem },
        claimed: false,
        createdAt: Date.now(),
      });

      // 最多保留20封邮件
      if (db.mails[userId].length > 20) {
        db.mails[userId] = db.mails[userId].slice(0, 20);
      }
    });
  }

  // 清空当前排行榜并推进赛季
  db.leaderboard = {};
  db.season.currentSeason += 1;
  db.season.lastSettledWeek = currentWeek;
  return true;
}

function rotateBossSeasonIfNeeded() {
  if (db.guildBoss.hp > 0) return false;
  const nextMax = Math.round(db.guildBoss.maxHp * 1.28);
  db.guildBoss = {
    season: db.guildBoss.season + 1,
    maxHp: nextMax,
    hp: nextMax,
    contributions: {},
  };
  return true;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

async function handleApi(req, res, pathname) {
  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (pathname === "/api/auth/register" && req.method === "POST") {
    const body = await parseBody(req);
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (username.length < 2 || username.length > 18) {
      sendJson(res, 400, { message: "用户名长度需在2-18之间" });
      return;
    }
    if (password.length < 4 || password.length > 32) {
      sendJson(res, 400, { message: "密码长度需在4-32之间" });
      return;
    }
    if (db.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      sendJson(res, 409, { message: "用户名已存在" });
      return;
    }

    const userId = crypto.randomBytes(8).toString("hex");
    const salt = crypto.randomBytes(8).toString("hex");
    const user = {
      id: userId,
      username,
      salt,
      passwordHash: hashPassword(password, salt),
      createdAt: Date.now(),
    };
    db.users.push(user);

    const token = issueToken();
    db.sessions[token] = userId;

    await persistDb();
    sendJson(res, 200, { username, token });
    return;
  }

  if (pathname === "/api/auth/login" && req.method === "POST") {
    const body = await parseBody(req);
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    const user = db.users.find((u) => u.username.toLowerCase() === username.toLowerCase());
    if (!user || user.passwordHash !== hashPassword(password, user.salt)) {
      sendJson(res, 401, { message: "用户名或密码错误" });
      return;
    }

    const token = issueToken();
    db.sessions[token] = user.id;
    await persistDb();
    sendJson(res, 200, { username: user.username, token });
    return;
  }

  if (pathname === "/api/leaderboard" && req.method === "GET") {
    checkAndSettleSeason();
    const { startText, endText } = getSeasonDateRange();
    sendJson(res, 200, {
      leaderboard: getLeaderboard(),
      season: {
        season: db.season.currentSeason,
        startText,
        endText,
      },
    });
    return;
  }

  if (pathname === "/api/leaderboard" && req.method === "POST") {
    const user = getAuthUser(req);
    if (!user) {
      sendJson(res, 401, { message: "请先登录" });
      return;
    }

    const body = await parseBody(req);
    const power = clamp(Number(body.power) || 0, 0, 9999999);
    const stage = clamp(Number(body.stage) || 1, 1, 99);

    db.leaderboard[user.id] = {
      userId: user.id,
      username: user.username,
      power,
      stage,
      updatedAt: Date.now(),
    };

    await persistDb();
    sendJson(res, 200, { ok: true });
    return;
  }

  if (pathname === "/api/save" && req.method === "GET") {
    const user = getAuthUser(req);
    if (!user) {
      sendJson(res, 401, { message: "请先登录" });
      return;
    }

    sendJson(res, 200, { snapshot: db.saves[user.id] || null });
    return;
  }

  if (pathname === "/api/save" && req.method === "POST") {
    const user = getAuthUser(req);
    if (!user) {
      sendJson(res, 401, { message: "请先登录" });
      return;
    }

    const body = await parseBody(req);
    const snapshot = sanitizeSnapshot(body.snapshot);
    if (!snapshot) {
      sendJson(res, 400, { message: "存档数据无效" });
      return;
    }

    db.saves[user.id] = snapshot;
    await persistDb();
    sendJson(res, 200, { ok: true });
    return;
  }

  if (pathname === "/api/mail" && req.method === "GET") {
    const user = getAuthUser(req);
    if (!user) {
      sendJson(res, 401, { message: "请先登录" });
      return;
    }

    const userMails = (db.mails[user.id] || []).map((mail) => ({
      id: mail.id,
      title: mail.title,
      body: mail.body,
      reward: mail.reward,
      claimed: mail.claimed,
      createdAt: mail.createdAt,
    }));

    sendJson(res, 200, { mails: userMails });
    return;
  }

  if (pathname === "/api/mail/claim" && req.method === "POST") {
    const user = getAuthUser(req);
    if (!user) {
      sendJson(res, 401, { message: "请先登录" });
      return;
    }

    const body = await parseBody(req);
    const mailId = String(body.mailId || "");
    if (!mailId) {
      sendJson(res, 400, { message: "缺少邮件ID" });
      return;
    }

    const userMails = db.mails[user.id];
    if (!userMails) {
      sendJson(res, 404, { message: "邮件不存在" });
      return;
    }

    const mail = userMails.find((m) => m.id === mailId);
    if (!mail) {
      sendJson(res, 404, { message: "邮件不存在" });
      return;
    }

    if (mail.claimed) {
      sendJson(res, 400, { message: "奖励已领取" });
      return;
    }

    mail.claimed = true;
    const reward = { gold: mail.reward.gold || 0, gem: mail.reward.gem || 0 };

    await persistDb();
    sendJson(res, 200, { ok: true, reward });
    return;
  }

  if (pathname === "/api/guildboss" && req.method === "GET") {
    const user = getAuthUser(req);
    rotateBossSeasonIfNeeded();

    const myDamage = user ? Number(db.guildBoss.contributions[user.id] || 0) : 0;
    sendJson(res, 200, {
      boss: {
        season: db.guildBoss.season,
        maxHp: db.guildBoss.maxHp,
        hp: db.guildBoss.hp,
      },
      mySeasonDamage: myDamage,
    });
    return;
  }

  if (pathname === "/api/guildboss/attack" && req.method === "POST") {
    const user = getAuthUser(req);
    if (!user) {
      sendJson(res, 401, { message: "请先登录" });
      return;
    }

    rotateBossSeasonIfNeeded();

    const body = await parseBody(req);
    const expectedDamage = clamp(Number(body.damage) || 0, 1, 1000000);
    const roll = 0.84 + Math.random() * 0.34;
    const actualDamage = clamp(Math.round(expectedDamage * roll), 1, db.guildBoss.hp);

    db.guildBoss.hp = clamp(db.guildBoss.hp - actualDamage, 0, db.guildBoss.maxHp);
    db.guildBoss.contributions[user.id] = Number(db.guildBoss.contributions[user.id] || 0) + actualDamage;

    const bossDefeated = db.guildBoss.hp <= 0;
    const reward = {
      gold: Math.max(80, Math.round(actualDamage * 0.02) + (bossDefeated ? 1800 : 0)),
      gem: Math.max(1, Math.round(actualDamage / 13000) + (bossDefeated ? 18 : 0)),
    };

    const mySeasonDamageBeforeRotate = db.guildBoss.contributions[user.id] || 0;
    if (bossDefeated) {
      rotateBossSeasonIfNeeded();
    }

    await persistDb();

    sendJson(res, 200, {
      actualDamage,
      bossDefeated,
      reward,
      boss: {
        season: db.guildBoss.season,
        maxHp: db.guildBoss.maxHp,
        hp: db.guildBoss.hp,
      },
      mySeasonDamage: bossDefeated ? 0 : mySeasonDamageBeforeRotate,
    });
    return;
  }

  sendJson(res, 404, { message: "API not found" });
}

function handleStatic(req, res, pathname) {
  const filePath = pathname === "/" ? path.join(ROOT, "index.html") : path.join(ROOT, pathname);
  const normalized = path.normalize(filePath);
  if (!normalized.startsWith(ROOT)) {
    sendJson(res, 403, { message: "Forbidden" });
    return;
  }

  const ext = path.extname(normalized).toLowerCase();
  const typeMap = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };

  const contentType = typeMap[ext] || "application/octet-stream";
  fs.stat(normalized, (err, stat) => {
    if (err || !stat.isFile()) {
      sendJson(res, 404, { message: "Not found" });
      return;
    }
    sendFile(res, normalized, contentType);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    const pathname = reqUrl.pathname;

    if (pathname.startsWith("/api/")) {
      await handleApi(req, res, pathname);
      return;
    }

    if (req.method === "GET") {
      handleStatic(req, res, pathname);
      return;
    }

    if (req.method === "OPTIONS") {
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 405, { message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    sendJson(res, 500, { message: "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`MT2 server running at http://localhost:${PORT}`);
});
