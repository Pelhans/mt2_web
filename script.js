const LOCAL_SAVE_KEY = "mt2-web-save-v2";
const AUTH_SAVE_KEY = "mt2-web-auth-v1";
const API_BASE =
  window.MT2_API_BASE ||
  (window.location.protocol.startsWith("http") ? `${window.location.origin}/api` : "http://localhost:3000/api");

const HERO_POOL = [
  {
    id: "amt",
    name: "哀木涕",
    role: "坦克",
    quality: "SSR",
    avatar: "🛡️",
    portrait: "./assets/heroes/amt_q.jpg",
    artwork: "./assets/heroes/amt_art.png",
    hp: 1550,
    atk: 128,
    def: 76,
    speed: 78,
    skillName: "雷霆盾击",
    skillPower: 2.2,
    skillTrack: { engine: "lottie", src: "https://assets9.lottiefiles.com/packages/lf20_fcfjwiyb.json" },
  },
  {
    id: "shaman",
    name: "傻馒",
    role: "法师",
    quality: "SSR",
    avatar: "⚡",
    portrait: "./assets/heroes/shaman_q.png",
    artwork: "./assets/heroes/shaman_art.png",
    hp: 1080,
    atk: 206,
    def: 42,
    speed: 105,
    skillName: "闪电链",
    skillPower: 2.5,
    skillTrack: { engine: "lottie", src: "https://assets4.lottiefiles.com/packages/lf20_vf8hhr5r.json" },
  },
  {
    id: "hunter",
    name: "劣人",
    role: "射手",
    quality: "SR",
    avatar: "🏹",
    portrait: "./assets/heroes/hunter_q.png",
    artwork: "./assets/heroes/hunter_art.png",
    hp: 1160,
    atk: 184,
    def: 48,
    speed: 98,
    skillName: "穿云箭",
    skillPower: 2.35,
    skillTrack: { engine: "spine", skeleton: "./assets/spine/hunter/hunter.json" },
  },
  {
    id: "healer",
    name: "沐丝",
    role: "辅助",
    quality: "SR",
    avatar: "✨",
    portrait: "./assets/heroes/healer_q.png",
    artwork: "./assets/heroes/healer_art.png",
    hp: 1190,
    atk: 141,
    def: 55,
    speed: 92,
    healPower: 1.4,
    skillName: "圣光祈福",
    skillPower: 0,
    skillTrack: { engine: "lottie", src: "https://assets8.lottiefiles.com/packages/lf20_xwmj0hsk.json" },
  },
  {
    id: "mage",
    name: "院长加丁",
    role: "法师",
    quality: "SSR",
    avatar: "🔥",
    portrait: "./assets/heroes/mage_q.png",
    artwork: "./assets/heroes/mage_art.png",
    hp: 980,
    atk: 225,
    def: 38,
    speed: 110,
    skillName: "灵魂爆燃",
    skillPower: 2.65,
    skillTrack: { engine: "lottie", src: "https://assets2.lottiefiles.com/packages/lf20_3rwasyjy.json" },
  },
  {
    id: "warrior",
    name: "地中海",
    role: "战士",
    quality: "SR",
    avatar: "⚔️",
    portrait: "./assets/heroes/warrior_q.png",
    artwork: "./assets/heroes/warrior_art.png",
    hp: 1360,
    atk: 153,
    def: 66,
    speed: 83,
    skillName: "狂怒斩",
    skillPower: 2.1,
    skillTrack: { engine: "spine", skeleton: "./assets/spine/warrior/warrior.json" },
  },
  {
    id: "assassin",
    name: "暗夜男",
    role: "刺客",
    quality: "SSR",
    avatar: "🗡️",
    portrait: "./assets/heroes/assassin_q.png",
    artwork: "./assets/heroes/assassin_art.png",
    hp: 1010,
    atk: 213,
    def: 41,
    speed: 118,
    skillName: "影刃风暴",
    skillPower: 2.45,
    skillTrack: { engine: "lottie", src: "https://assets5.lottiefiles.com/packages/lf20_w6ri6udr.json" },
  },
  {
    id: "paladin",
    name: "圣骑大大姐",
    role: "坦克",
    quality: "SSR",
    avatar: "🛡",
    portrait: "./assets/heroes/paladin_q.png",
    artwork: "./assets/heroes/paladin_art.png",
    hp: 1720,
    atk: 118,
    def: 83,
    speed: 72,
    skillName: "光盾壁垒",
    skillPower: 2.1,
    skillTrack: { engine: "spine", skeleton: "./assets/spine/paladin/paladin.json" },
  },
  {
    id: "necromancer",
    name: "亡语先知",
    role: "法师",
    quality: "SSR",
    avatar: "☠️",
    portrait: "./assets/heroes/necromancer_q.png",
    artwork: "./assets/heroes/necromancer_art.png",
    hp: 990,
    atk: 232,
    def: 37,
    speed: 106,
    skillName: "噬魂陨灭",
    skillPower: 2.72,
    skillTrack: { engine: "lottie", src: "https://assets8.lottiefiles.com/packages/lf20_kkflmtur.json" },
  },
  {
    id: "druid",
    name: "月夜德鲁伊",
    role: "辅助",
    quality: "SR",
    avatar: "🌙",
    portrait: "./assets/heroes/druid_q.png",
    artwork: "./assets/heroes/druid_art.png",
    hp: 1280,
    atk: 134,
    def: 58,
    speed: 94,
    healPower: 1.28,
    skillName: "自然复苏",
    skillPower: 0,
    skillTrack: { engine: "lottie", src: "https://assets8.lottiefiles.com/packages/lf20_khzniaya.json" },
  },
  {
    id: "gunner",
    name: "爆弹萝莉",
    role: "射手",
    quality: "SR",
    avatar: "💣",
    portrait: "./assets/heroes/gunner_q.png",
    artwork: "./assets/heroes/gunner_art.png",
    hp: 1140,
    atk: 195,
    def: 43,
    speed: 102,
    skillName: "榴弹齐射",
    skillPower: 2.32,
    skillTrack: { engine: "lottie", src: "https://assets9.lottiefiles.com/packages/lf20_rbtawn7s.json" },
  },
  {
    id: "monk",
    name: "醉拳僧",
    role: "战士",
    quality: "SR",
    avatar: "🥊",
    portrait: "./assets/heroes/monk_q.png",
    artwork: "./assets/heroes/monk_art.png",
    hp: 1420,
    atk: 160,
    def: 61,
    speed: 90,
    skillName: "回旋烈拳",
    skillPower: 2.18,
    skillTrack: { engine: "spine", skeleton: "./assets/spine/monk/monk.json" },
  },
  {
    id: "frost",
    name: "冰霜魔女",
    role: "法师",
    quality: "SSR",
    avatar: "❄️",
    portrait: "./assets/heroes/frost_q.png",
    artwork: "./assets/heroes/frost_art.png",
    hp: 1020,
    atk: 220,
    def: 39,
    speed: 109,
    skillName: "极寒风暴",
    skillPower: 2.62,
    skillTrack: { engine: "lottie", src: "https://assets2.lottiefiles.com/packages/lf20_j1adxtyb.json" },
  },
  {
    id: "bard",
    name: "吟游诗人",
    role: "辅助",
    quality: "SR",
    avatar: "🎵",
    portrait: "./assets/heroes/bard_q.png",
    artwork: "./assets/heroes/bard_art.png",
    hp: 1230,
    atk: 130,
    def: 53,
    speed: 96,
    healPower: 1.34,
    skillName: "战歌鼓舞",
    skillPower: 0,
    skillTrack: { engine: "lottie", src: "https://assets1.lottiefiles.com/packages/lf20_ysrn2o6a.json" },
  },
  {
    id: "berserker",
    name: "狂兽战将",
    role: "战士",
    quality: "SSR",
    avatar: "🪓",
    portrait: "./assets/heroes/berserker_q.png",
    artwork: "./assets/heroes/berserker_art.png",
    hp: 1490,
    atk: 188,
    def: 58,
    speed: 88,
    skillName: "裂地狂袭",
    skillPower: 2.4,
    skillTrack: { engine: "spine", skeleton: "./assets/spine/berserker/berserker.json" },
  },
  {
    id: "shadow",
    name: "影月行者",
    role: "刺客",
    quality: "SSR",
    avatar: "🌘",
    portrait: "./assets/heroes/shadow_q.png",
    artwork: "./assets/heroes/shadow_art.png",
    hp: 980,
    atk: 224,
    def: 39,
    speed: 122,
    skillName: "瞬影绝杀",
    skillPower: 2.55,
    skillTrack: { engine: "lottie", src: "https://assets5.lottiefiles.com/packages/lf20_uxy0z4or.json" },
  },
  {
    id: "mech",
    name: "机甲工匠",
    role: "射手",
    quality: "SR",
    avatar: "🤖",
    portrait: "./assets/heroes/mech_q.png",
    artwork: "./assets/heroes/mech_art.png",
    hp: 1200,
    atk: 178,
    def: 50,
    speed: 97,
    skillName: "能量炮台",
    skillPower: 2.26,
    skillTrack: { engine: "lottie", src: "https://assets9.lottiefiles.com/packages/lf20_a8czq9tr.json" },
  },
];

const ENEMY_LIBRARY = {
  slime: { name: "泥浆怪", avatar: "🟢", portrait: "./assets/enemies/slime_q.png", hp: 500, atk: 88, def: 24, speed: 70 },
  wolf: { name: "幽暗座狼", avatar: "🐺", portrait: "./assets/enemies/wolf_q.png", hp: 620, atk: 103, def: 30, speed: 88 },
  skeleton: { name: "亡骨战士", avatar: "💀", portrait: "./assets/enemies/skeleton_q.png", hp: 700, atk: 111, def: 36, speed: 76 },
  caster: { name: "堕落术士", avatar: "🔮", portrait: "./assets/enemies/caster_q.png", hp: 590, atk: 136, def: 25, speed: 95 },
  guard: { name: "黑铁卫兵", avatar: "🪖", portrait: "./assets/enemies/guard_q.png", hp: 920, atk: 126, def: 47, speed: 72 },
  boss1: { name: "血吼督军", avatar: "👹", portrait: "./assets/enemies/boss1_q.png", hp: 1480, atk: 178, def: 52, speed: 84 },
  boss2: { name: "深渊龙裔", avatar: "🐉", portrait: "./assets/enemies/boss2_q.png", hp: 1810, atk: 205, def: 61, speed: 92 },
  demon: { name: "熔火恶魔", avatar: "😈", portrait: "./assets/enemies/demon_q.png", hp: 1980, atk: 212, def: 65, speed: 90 },
  titan: { name: "泰坦守卫", avatar: "🗿", portrait: "./assets/enemies/titan_q.png", hp: 2260, atk: 198, def: 78, speed: 72 },
};

const MAX_STAGE_CAP = 999999;
const STAGE_NAME_POOL = ["林地", "灰烬", "迷雾", "深渊", "龙眠", "远古", "虚空", "星辉", "暮色", "凛冬"];
const STAGE_ENEMY_PATTERNS = [
  ["slime", "slime", "wolf", "slime", "wolf"],
  ["wolf", "skeleton", "caster", "wolf", "skeleton"],
  ["guard", "wolf", "caster", "skeleton", "wolf"],
  ["guard", "caster", "boss1", "wolf", "guard"],
  ["guard", "boss1", "skeleton", "caster", "guard"],
  ["titan", "caster", "boss2", "guard", "skeleton"],
  ["demon", "boss1", "boss2", "caster", "titan"],
  ["titan", "demon", "boss2", "boss1", "guard"],
];

const RESOURCE_DUNGEONS = [
  {
    id: "daily_gold",
    name: "金币试炼",
    type: "daily",
    unlockStage: 2,
    maxTimes: 3,
    reward: { gold: 1200, gem: 0 },
    recPower: 6800,
    desc: "挑战盗宝哥布林，稳定获取金币",
  },
  {
    id: "daily_rune",
    name: "符文秘境",
    type: "daily",
    unlockStage: 4,
    maxTimes: 2,
    reward: { gold: 500, gem: 10 },
    recPower: 9800,
    desc: "挑战元素回廊，获取符文强化资源",
  },
  {
    id: "weekly_raid",
    name: "周常远古遗迹",
    type: "weekly",
    unlockStage: 8,
    maxTimes: 4,
    reward: { gold: 2200, gem: 26 },
    recPower: 14500,
    desc: "周常高收益副本，建议满编挑战",
  },
];

function getStageConfig(stageId) {
  const id = clamp(Math.floor(Number(stageId) || 1), 1, MAX_STAGE_CAP);
  const tier = Math.floor((id - 1) / STAGE_NAME_POOL.length);
  const nameSeed = STAGE_NAME_POOL[(id - 1) % STAGE_NAME_POOL.length];
  const suffix = tier > 0 ? `·${tier + 1}阶` : "";
  const pattern = STAGE_ENEMY_PATTERNS[(id - 1) % STAGE_ENEMY_PATTERNS.length];
  const rewardGold = Math.round(140 + id * 56 + id * id * 1.12);
  const rewardGem = Math.max(2, Math.floor(id / 3) + 2);

  return {
    id,
    name: `${nameSeed}战线${suffix}`,
    enemies: pattern,
    rewardGold,
    rewardGem,
  };
}

function getVisibleStageIds() {
  const base = Math.max(1, Math.min(state.selectedStage || 1, state.unlockedStage || 1));
  const start = Math.max(1, base - 3);
  const end = Math.min(MAX_STAGE_CAP, start + 11);
  const ids = [];
  for (let id = start; id <= end; id += 1) {
    ids.push(id);
  }
  if (!ids.includes(state.unlockedStage)) ids.push(state.unlockedStage);
  if (!ids.includes(state.selectedStage)) ids.push(state.selectedStage);
  return ids.sort((a, b) => a - b);
}

const state = {
  gold: 0,
  gem: 0,
  unlockedStage: 1,
  selectedStage: 1,
  selectedHero: null,
  team: ["amt", "paladin", "shaman", "hunter", "healer"],
  heroes: {},
  battle: null,
  cinematicRunning: false,
  logs: [],
  leaderboard: [],
  leaderboardSeason: null,
  mails: [],
  dungeonProgress: {
    dailyKey: "",
    weeklyKey: "",
    attempts: {},
  },
  guildBoss: {
    season: 1,
    maxHp: 250000,
    hp: 250000,
  },
  myBossDamage: 0,
  account: {
    username: "",
    token: "",
  },
};

const refs = {
  goldVal: document.getElementById("goldVal"),
  gemVal: document.getElementById("gemVal"),
  progressVal: document.getElementById("progressVal"),
  teamPowerVal: document.getElementById("teamPowerVal"),
  rosterGrid: document.getElementById("rosterGrid"),
  heroDetail: document.getElementById("heroDetail"),
  stageList: document.getElementById("stageList"),
  resourceResetHint: document.getElementById("resourceResetHint"),
  resourceDungeonList: document.getElementById("resourceDungeonList"),
  slot0: document.getElementById("slot0"),
  slot1: document.getElementById("slot1"),
  slot2: document.getElementById("slot2"),
  slot3: document.getElementById("slot3"),
  slot4: document.getElementById("slot4"),
  allyBoard: document.getElementById("allyBoard"),
  enemyBoard: document.getElementById("enemyBoard"),
  battleFxLayer: document.getElementById("battleFxLayer"),
  battleCinematicLayer: document.getElementById("battleCinematicLayer"),
  playAnimDemoBtn: document.getElementById("playAnimDemoBtn"),
  battleLog: document.getElementById("battleLog"),
  recruitGoldBtn: document.getElementById("recruitGoldBtn"),
  recruitGemBtn: document.getElementById("recruitGemBtn"),
  upgradeHeroBtn: document.getElementById("upgradeHeroBtn"),
  upWeaponBtn: document.getElementById("upWeaponBtn"),
  upArmorBtn: document.getElementById("upArmorBtn"),
  upRuneBtn: document.getElementById("upRuneBtn"),
  upSkillBtn: document.getElementById("upSkillBtn"),
  upgradeCostHint: document.getElementById("upgradeCostHint"),
  equipCostHint: document.getElementById("equipCostHint"),
  runeCostHint: document.getElementById("runeCostHint"),
  skillCostHint: document.getElementById("skillCostHint"),
  startBattleBtn: document.getElementById("startBattleBtn"),
  autoBattleBtn: document.getElementById("autoBattleBtn"),
  autoBattleStopBtn: document.getElementById("autoBattleStopBtn"),
  autoBattleCount: document.getElementById("autoBattleCount"),
  autoBattleProgress: document.getElementById("autoBattleProgress"),
  refreshBossBtn: document.getElementById("refreshBossBtn"),
  bossAttackBtn: document.getElementById("bossAttackBtn"),
  bossName: document.getElementById("bossName"),
  bossHpFill: document.getElementById("bossHpFill"),
  bossHpText: document.getElementById("bossHpText"),
  bossSeasonText: document.getElementById("bossSeasonText"),
  bossContribution: document.getElementById("bossContribution"),
  leaderSeasonText: document.getElementById("leaderSeasonText"),
  leaderboardList: document.getElementById("leaderboardList"),
  submitRankBtn: document.getElementById("submitRankBtn"),
  refreshMailBtn: document.getElementById("refreshMailBtn"),
  mailList: document.getElementById("mailList"),
  usernameInput: document.getElementById("usernameInput"),
  passwordInput: document.getElementById("passwordInput"),
  registerBtn: document.getElementById("registerBtn"),
  loginBtn: document.getElementById("loginBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  accountHint: document.getElementById("accountHint"),
  cloudSaveBtn: document.getElementById("cloudSaveBtn"),
  cloudLoadBtn: document.getElementById("cloudLoadBtn"),
  cloudHint: document.getElementById("cloudHint"),
  pageTabs: document.getElementById("pageTabs"),
};

function getDungeonResetKeys() {
  const now = new Date();
  const dailyKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const day = now.getDay();
  const diffToMonday = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  const weeklyKey = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;

  return { dailyKey, weeklyKey };
}

function resetDungeonProgressIfNeeded() {
  const { dailyKey, weeklyKey } = getDungeonResetKeys();
  const progress = state.dungeonProgress || { dailyKey: "", weeklyKey: "", attempts: {} };

  const dailyChanged = progress.dailyKey !== dailyKey;
  const weeklyChanged = progress.weeklyKey !== weeklyKey;

  const attempts = {};
  RESOURCE_DUNGEONS.forEach((dungeon) => {
    const prevUsed = Number(progress.attempts?.[dungeon.id] || 0);
    if ((dungeon.type === "daily" && dailyChanged) || (dungeon.type === "weekly" && weeklyChanged)) {
      attempts[dungeon.id] = 0;
    } else {
      attempts[dungeon.id] = prevUsed;
    }
  });

  state.dungeonProgress = {
    dailyKey,
    weeklyKey,
    attempts,
  };

  return dailyChanged || weeklyChanged;
}

function initState() {
  const local = loadLocalSave();
  if (local) {
    applyGameData(local, false);
  } else {
    state.gold = 1200;
    state.gem = 60;
    state.unlockedStage = 1;
    state.selectedStage = 1;
    state.team = ["amt", "paladin", "shaman", "hunter", "healer"];
    ["amt", "paladin", "shaman", "hunter", "healer"].forEach((id) => {
      state.heroes[id] = normalizeHeroOwn({ level: 1, exp: 0, stars: 1, weaponLv: 0, armorLv: 0, runeLv: 0 });
    });
  }

  resetDungeonProgressIfNeeded();

  const auth = loadAuthSession();
  if (auth) {
    state.account.username = auth.username;
    state.account.token = auth.token;
  }

  if (!state.selectedHero || !state.heroes[state.selectedHero]) {
    state.selectedHero = Object.keys(state.heroes)[0] || null;
  }

  normalizeTeam();
}

function loadLocalSave() {
  try {
    const raw = localStorage.getItem(LOCAL_SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveLocalGame() {
  localStorage.setItem(LOCAL_SAVE_KEY, JSON.stringify(serializeGameData()));
}

function serializeGameData() {
  return {
    gold: state.gold,
    gem: state.gem,
    unlockedStage: state.unlockedStage,
    selectedStage: state.selectedStage,
    selectedHero: state.selectedHero,
    team: [...state.team],
    heroes: state.heroes,
    dungeonProgress: state.dungeonProgress,
    logs: state.logs,
  };
}

function applyGameData(snapshot, saveToLocal) {
  state.gold = Number(snapshot.gold) || 0;
  state.gem = Number(snapshot.gem) || 0;
  state.unlockedStage = clamp(Number(snapshot.unlockedStage) || 1, 1, MAX_STAGE_CAP);
  state.selectedStage = clamp(Number(snapshot.selectedStage) || 1, 1, MAX_STAGE_CAP);
  state.selectedHero = snapshot.selectedHero || null;
  state.team = Array.isArray(snapshot.team)
    ? snapshot.team.slice(0, 5)
    : ["amt", "paladin", "shaman", "hunter", "healer"];
  state.heroes = {};
  state.dungeonProgress = snapshot.dungeonProgress && typeof snapshot.dungeonProgress === "object"
    ? {
      dailyKey: String(snapshot.dungeonProgress.dailyKey || ""),
      weeklyKey: String(snapshot.dungeonProgress.weeklyKey || ""),
      attempts: snapshot.dungeonProgress.attempts && typeof snapshot.dungeonProgress.attempts === "object"
        ? snapshot.dungeonProgress.attempts
        : {},
    }
    : { dailyKey: "", weeklyKey: "", attempts: {} };
  state.logs = Array.isArray(snapshot.logs)
    ? snapshot.logs.slice(-150).map((line) => ({
      text: String(line?.text || ""),
      type: typeof line?.type === "string" ? line.type : "",
    }))
    : [];

  if (snapshot.heroes && typeof snapshot.heroes === "object") {
    Object.entries(snapshot.heroes).forEach(([heroId, own]) => {
      state.heroes[heroId] = normalizeHeroOwn(own);
    });
  }

  resetDungeonProgressIfNeeded();
  normalizeTeam();
  if (!state.selectedHero || !state.heroes[state.selectedHero]) {
    state.selectedHero = Object.keys(state.heroes)[0] || null;
  }

  if (saveToLocal) saveLocalGame();
}

function normalizeHeroOwn(own) {
  return {
    level: Math.max(1, Number(own?.level) || 1),
    exp: Math.max(0, Number(own?.exp) || 0),
    stars: clamp(Number(own?.stars) || 1, 1, 5),
    weaponLv: Math.max(0, Number(own?.weaponLv) || 0),
    armorLv: Math.max(0, Number(own?.armorLv) || 0),
    runeLv: Math.max(0, Number(own?.runeLv) || 0),
    skillLv: Math.max(1, Number(own?.skillLv) || 1),
  };
}

function loadAuthSession() {
  try {
    const raw = localStorage.getItem(AUTH_SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.username || !parsed.token) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveAuthSession() {
  if (state.account.username && state.account.token) {
    localStorage.setItem(AUTH_SAVE_KEY, JSON.stringify({ username: state.account.username, token: state.account.token }));
  } else {
    localStorage.removeItem(AUTH_SAVE_KEY);
  }
}

function getHeroById(heroId) {
  return HERO_POOL.find((item) => item.id === heroId);
}

function getOwnedHeroIds() {
  return Object.keys(state.heroes);
}

function getHeroPower(heroId) {
  const hero = getHeroById(heroId);
  const own = state.heroes[heroId];
  if (!hero || !own) return null;

  const lvScale = 1 + (own.level - 1) * 0.11;
  const starScale = 1 + (own.stars - 1) * 0.13;
  const weaponScale = 1 + own.weaponLv * 0.07;
  const armorScale = 1 + own.armorLv * 0.07;
  const runeScale = 1 + own.runeLv * 0.05;
  const baseScale = lvScale * starScale;

  const skillLv = Math.max(1, Number(own.skillLv) || 1);
  const skillEnhance = 0.12 * Math.log2(skillLv);

  // 技能里程碑被动
  const milestones = getSkillMilestones(skillLv);
  const milestoneCritBonus = milestones.includes(20) ? 0.08 : 0;
  const milestoneAmpBonus = milestones.includes(50) ? 0.2 : 0;
  const milestoneAoeBonus = milestones.includes(100);

  return {
    ...hero,
    ...own,
    skillLv,
    skillEnhance,
    milestones,
    milestoneAoeBonus,
    maxHp: Math.round(hero.hp * baseScale * armorScale),
    atk: Math.round(hero.atk * baseScale * weaponScale * runeScale),
    def: Math.round(hero.def * baseScale * (1 + own.armorLv * 0.08)),
    speed: Math.round(hero.speed * (1 + (own.level - 1) * 0.018 + own.runeLv * 0.01)),
    critRate: clamp(0.08 + own.runeLv * 0.012 + (hero.role === "刺客" ? 0.08 : 0) + milestoneCritBonus, 0.03, 0.65),
    dodgeRate: clamp(0.03 + own.runeLv * 0.008 + (hero.role === "刺客" ? 0.05 : 0), 0, 0.35),
    skillAmp: (1 + own.runeLv * 0.045) * (1 + skillEnhance + milestoneAmpBonus),
  };
}

function normalizeTeam() {
  const owned = getOwnedHeroIds();
  for (let i = 0; i < 5; i += 1) {
    if (!state.team[i] || !state.heroes[state.team[i]]) {
      state.team[i] = owned[i] || owned[0] || null;
    }
  }
  state.team = state.team.slice(0, 5);
}

function calcTeamPower() {
  return state.team.reduce((sum, heroId) => {
    const hero = getHeroPower(heroId);
    if (!hero) return sum;
    const value =
      hero.maxHp * 0.2 +
      hero.atk * 2.4 +
      hero.def * 1.3 +
      hero.speed * 1.1 +
      hero.stars * 120 +
      (hero.weaponLv + hero.armorLv + hero.runeLv) * 80;
    return sum + Math.round(value);
  }, 0);
}

function renderAll() {
  renderResources();
  renderRoster();
  renderHeroDetail();
  renderStages();
  renderResourceDungeons();
  renderTeamSelectors();
  renderBattlefield();
  renderLogs();
  renderGuildBoss();
  renderLeaderboard();
  renderMails();
  renderAccountSection();
}

function renderResources() {
  refs.goldVal.textContent = String(state.gold);
  refs.gemVal.textContent = String(state.gem);
  refs.progressVal.textContent = `1-${state.unlockedStage}`;
  refs.teamPowerVal.textContent = String(calcTeamPower());
}

function getSafeImgMarkup(className, src, alt, fallbackText) {
  if (!src) return `<span class="${className}">${fallbackText}</span>`;
  return `<img class="${className}" src="${src}" alt="${alt}" decoding="async" loading="eager" referrerpolicy="no-referrer" onerror="if(!this.dataset.fallbackTried){this.dataset.fallbackTried='1';this.src='${src}'.replace(/\\.jpg(\\?.*)?$/i,'.png$1').replace(/\\.jpeg(\\?.*)?$/i,'.png$1');return;}this.style.display='none';if(this.nextElementSibling){this.nextElementSibling.style.display='flex';}" /><span class="${className} fallback" style="display:none;">${fallbackText}</span>`;
}

function getHeroAvatarMarkup(hero, className) {
  return getSafeImgMarkup(className, hero.portrait, hero.name, hero.avatar || "⚔️");
}

function renderRoster() {
  refs.rosterGrid.innerHTML = "";
  getOwnedHeroIds()
    .sort((a, b) => state.heroes[b].level - state.heroes[a].level)
    .forEach((heroId) => {
      const hero = getHeroById(heroId);
      if (!hero) return;
      const own = state.heroes[heroId];

      const card = document.createElement("div");
      card.className = "hero-card";
      if (state.selectedHero === heroId) card.classList.add("selected");
      card.innerHTML = `
        <div class="hero-head">
          <div class="avatar-wrap">${getHeroAvatarMarkup(hero, "avatar")}</div>
          <div>
            <h4>${hero.name}</h4>
            <p>${hero.role} · ${hero.quality}</p>
          </div>
        </div>
        <p>Lv.${own.level} · ${"★".repeat(own.stars)}</p>
        <p>装 ${own.weaponLv + own.armorLv} · 符文 ${own.runeLv}</p>
      `;

      card.onclick = () => {
        state.selectedHero = heroId;
        renderRoster();
        renderHeroDetail();
      };

      refs.rosterGrid.appendChild(card);
    });
}

function getSkillMilestones(skillLv) {
  const result = [];
  if (skillLv >= 20) result.push(20);
  if (skillLv >= 50) result.push(50);
  if (skillLv >= 100) result.push(100);
  return result;
}

function getSkillMilestoneDescription(skillLv) {
  const descs = [];
  if (skillLv >= 20) descs.push('【Lv20 穿透之心】暴击率+8%');
  if (skillLv >= 50) descs.push('【Lv50 毁灭之力】技能增幅额外+20%');
  if (skillLv >= 100) descs.push('【Lv100 天罚之雨】技能附带 AOE 溅射（对其他敌人造成30%伤害）');
  const next = skillLv < 20 ? 20 : skillLv < 50 ? 50 : skillLv < 100 ? 100 : null;
  if (next) descs.push(`下一里程碑：Lv${next}`);
  return descs.length ? descs.join('\n') : '暂无解锁，下一里程碑：Lv20';
}

function getSkillCost(heroId) {
  const own = state.heroes[heroId];
  if (!own) return Infinity;
  const lv = Math.max(1, Number(own.skillLv) || 1);
  if (lv <= 30) {
    return Math.round(60 + lv * 28);
  }

  const stage1End = 60 + 30 * 28;
  if (lv <= 100) {
    return Math.round(stage1End + Math.pow(lv - 30, 1.46) * 28);
  }

  const stage2End = stage1End + Math.pow(70, 1.46) * 28;
  const extraLv = lv - 100;
  return Math.round(stage2End + Math.pow(extraLv, 1.14) * 44 + Math.log2(extraLv + 1) * 34);
}

function getSkillDescription(heroId, heroStat) {
  const hero = heroStat || getHeroPower(heroId);
  if (!hero) return "暂无";
  const bonusPct = Math.round(((hero.skillAmp || 1) - 1) * 100);
  if (hero.healPower) {
    return `释放 ${hero.skillName} 为生命最低的队友回复生命（当前额外增幅 ${bonusPct}%）。`;
  }
  return `释放 ${hero.skillName} 对敌方目标造成高额伤害（当前额外增幅 ${bonusPct}%）。`;
}

function renderHeroDetail() {
  const heroId = state.selectedHero;
  if (!heroId || !state.heroes[heroId]) {
    refs.heroDetail.innerHTML = "<p>点击英雄查看详情</p>";
    refs.upgradeCostHint.textContent = "升级花费：-";
    refs.equipCostHint.textContent = "装备花费：-";
    refs.runeCostHint.textContent = "符文花费：-";
    if (refs.skillCostHint) refs.skillCostHint.textContent = "技能花费：-";
    return;
  }

  const hero = getHeroPower(heroId);
  const upCost = getUpgradeCost(heroId);
  const weaponCost = getWeaponCost(heroId);
  const armorCost = getArmorCost(heroId);
  const runeCost = getRuneCost(heroId);
  const skillCost = getSkillCost(heroId);

  refs.heroDetail.innerHTML = `
    <div class="hero-art-wrap">
      <img class="hero-art" src="${hero.artwork || ""}" alt="${hero.name}" decoding="async" loading="eager" referrerpolicy="no-referrer" onerror="if(!this.dataset.fallbackTried){this.dataset.fallbackTried='1';this.src=(this.src||'').replace(/\.jpg(\?.*)?$/i,'.png$1').replace(/\.jpeg(\?.*)?$/i,'.png$1');return;}this.style.display='none'" />
    </div>
    <p><strong>${hero.avatar} ${hero.name}</strong> (${hero.role})</p>
    <p>等级：Lv.${hero.level} · 星级：${"★".repeat(hero.stars)}</p>
    <p>生命：${hero.maxHp} · 攻击：${hero.atk} · 防御：${hero.def}</p>
    <p>速度：${hero.speed} · 暴击：${Math.round(hero.critRate * 100)}% · 闪避：${Math.round(hero.dodgeRate * 100)}%</p>
    <p>武器Lv.${hero.weaponLv} · 护甲Lv.${hero.armorLv} · 符文Lv.${hero.runeLv} · 技能Lv.${hero.skillLv}</p>
    <p>技能：${hero.skillName}</p>
    <p>技能描述：${getSkillDescription(heroId, hero)}</p>
<p>技能增幅：${Math.round(((hero.skillAmp || 1) - 1) * 100)}%</p>
<p>里程碑：${getSkillMilestoneDescription(hero.skillLv).replace(/\n/g, '<br>')}</p>
<p>动画轨道：${hero.skillTrack?.engine || "none"}</p>
`;

  refs.upgradeCostHint.textContent = `升级花费：${upCost} 金币`;
  refs.equipCostHint.textContent = `武器 ${weaponCost} 金币 / 护甲 ${armorCost} 金币`;
  refs.runeCostHint.textContent = `符文花费：${runeCost} 钻石`;
  if (refs.skillCostHint) {
    refs.skillCostHint.textContent = `技能花费：${skillCost} 钻石`;
  }

  refs.upgradeHeroBtn.disabled = state.gold < upCost;
  refs.upWeaponBtn.disabled = state.gold < weaponCost;
  refs.upArmorBtn.disabled = state.gold < armorCost;
  refs.upRuneBtn.disabled = state.gem < runeCost;
  if (refs.upSkillBtn) {
    refs.upSkillBtn.disabled = state.gem < skillCost;
  }
}

function renderStages() {
  refs.stageList.innerHTML = "";

  getVisibleStageIds().forEach((stageId) => {
    const stage = getStageConfig(stageId);
    const unlocked = stage.id <= state.unlockedStage;
    const isActive = stage.id === state.selectedStage;
    const enemyCountFactor = stage.enemies.length / 3;
    const recPower = Math.round((3200 + stage.id * 1250) * enemyCountFactor);

    const card = document.createElement("div");
    card.className = "stage-card";
    if (isActive) card.classList.add("active");
    if (!unlocked) card.classList.add("locked");

    card.innerHTML = `
      <div class="stage-title">
        <strong>1-${stage.id} ${stage.name}</strong>
        <span>${unlocked ? "可挑战" : "未解锁"}</span>
      </div>
      <div class="stage-meta">敌人：${stage.enemies.map((id) => ENEMY_LIBRARY[id].name).join(" / ")}</div>
      <div class="stage-meta">推荐战力：${recPower}</div>
      <div class="stage-meta">奖励：${stage.rewardGold} 金币 + ${stage.rewardGem} 钻石</div>
    `;

    if (unlocked) {
      card.onclick = () => {
        state.selectedStage = stage.id;
        renderStages();
        renderBattlefield();
      };
    }

    refs.stageList.appendChild(card);
  });
}

function getDungeonAttemptUsed(dungeonId) {
  return Number(state.dungeonProgress?.attempts?.[dungeonId] || 0);
}

function getDungeonRemainTimes(dungeon) {
  return Math.max(0, dungeon.maxTimes - getDungeonAttemptUsed(dungeon.id));
}

function runResourceDungeon(dungeonId) {
  const dungeon = RESOURCE_DUNGEONS.find((item) => item.id === dungeonId);
  if (!dungeon) return;

  resetDungeonProgressIfNeeded();

  if (state.unlockedStage < dungeon.unlockStage) {
    appendLog(`${dungeon.name} 需通关 1-${dungeon.unlockStage} 后解锁`, "log-lose");
    return;
  }

  const usedBefore = getDungeonAttemptUsed(dungeon.id);
  const remain = Math.max(0, dungeon.maxTimes - usedBefore);
  if (remain <= 0) {
    appendLog(`${dungeon.name} 今日/本周次数已用完`, "log-lose");
    return;
  }

  const teamPower = calcTeamPower();
  const passRate = clamp(0.42 + (teamPower - dungeon.recPower) / (dungeon.recPower * 1.8), 0.42, 0.95);
  const success = Math.random() < passRate;

  state.dungeonProgress.attempts[dungeon.id] = usedBefore + 1;
  const remainAfter = Math.max(0, dungeon.maxTimes - state.dungeonProgress.attempts[dungeon.id]);

  if (success) {
    const rewardGold = Math.round((dungeon.reward.gold || 0) * (0.92 + Math.random() * 0.22));
    const rewardGem = Math.round((dungeon.reward.gem || 0) * (0.92 + Math.random() * 0.22));
    state.gold += rewardGold;
    state.gem += rewardGem;
    appendLog(`挑战 ${dungeon.name} 成功，获得 ${rewardGold} 金币 + ${rewardGem} 钻石（剩余 ${remainAfter} 次）`, "log-win");
  } else {
    const pityGold = Math.max(80, Math.round((dungeon.reward.gold || 0) * 0.16));
    state.gold += pityGold;
    appendLog(`挑战 ${dungeon.name} 失利，获得保底 ${pityGold} 金币（剩余 ${remainAfter} 次）`, "log-lose");
  }

  saveLocalGame();
  renderResources();
  renderResourceDungeons();
}

function renderResourceDungeons() {
  if (!refs.resourceDungeonList) return;

  const didReset = resetDungeonProgressIfNeeded();
  if (didReset) {
    saveLocalGame();
  }

  if (refs.resourceResetHint) {
    refs.resourceResetHint.textContent = `每日 00:00 / 每周一重置 · 今日 ${state.dungeonProgress.dailyKey || "-"}`;
  }

  refs.resourceDungeonList.innerHTML = RESOURCE_DUNGEONS.map((dungeon) => {
    const unlocked = state.unlockedStage >= dungeon.unlockStage;
    const used = getDungeonAttemptUsed(dungeon.id);
    const remain = Math.max(0, dungeon.maxTimes - used);
    const btnDisabled = !unlocked || remain <= 0;

    return `
      <div class="resource-dungeon-card ${unlocked ? "" : "locked"}">
        <div class="resource-dungeon-title">
          <strong>${dungeon.name}</strong>
          <span>${dungeon.type === "daily" ? "日常" : "周常"}</span>
        </div>
        <div class="resource-dungeon-meta">${dungeon.desc}</div>
        <div class="resource-dungeon-meta">解锁：通关 1-${dungeon.unlockStage} · 推荐战力：${dungeon.recPower}</div>
        <div class="resource-dungeon-meta">基础奖励：${dungeon.reward.gold} 金币 + ${dungeon.reward.gem} 钻石</div>
        <div class="resource-dungeon-footer">
          <span>剩余次数：${remain}/${dungeon.maxTimes}</span>
          <button class="${btnDisabled ? "" : "success"}" ${btnDisabled ? "disabled" : ""} onclick="runResourceDungeon('${dungeon.id}')">
            ${unlocked ? (remain > 0 ? "挑战" : "次数耗尽") : "未解锁"}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function renderTeamSelectors() {
  const ownedIds = getOwnedHeroIds();
  [refs.slot0, refs.slot1, refs.slot2, refs.slot3, refs.slot4].forEach((select, idx) => {
    if (!select) return;
    const current = state.team[idx];
    select.innerHTML = "";

    ownedIds.forEach((heroId) => {
      const hero = getHeroById(heroId);
      if (!hero) return;
      const option = document.createElement("option");
      option.value = heroId;
      option.textContent = `${hero.avatar} ${hero.name} (Lv.${state.heroes[heroId].level})`;
      if (heroId === current) option.selected = true;
      select.appendChild(option);
    });

    select.onchange = (event) => {
      state.team[idx] = event.target.value;
      dedupeTeam();
      saveLocalGame();
      renderTeamSelectors();
      renderResources();
      renderBattlefield();
    };
  });
}

function dedupeTeam() {
  const set = new Set();
  for (let i = 0; i < state.team.length; i += 1) {
    const heroId = state.team[i];
    if (!heroId || !state.heroes[heroId]) continue;
    if (!set.has(heroId)) {
      set.add(heroId);
      continue;
    }
    const replacement = getOwnedHeroIds().find((id) => !set.has(id));
    if (replacement) {
      state.team[i] = replacement;
      set.add(replacement);
    }
  }
}

function updateUnitCard(card, unit) {
  const hpRate = unit.maxHp ? clamp(unit.hp / unit.maxHp, 0, 1) : 0;
  const energyRate = unit.energy ? clamp(unit.energy / 100, 0, 1) : 0;

  card.classList.toggle("dead", unit.hp <= 0);

  const statusEl = card.querySelector(".unit-status");
  if (statusEl) statusEl.textContent = unit.hp > 0 ? "战斗中" : "已倒下";

  const hpTextEl = card.querySelector(".unit-hptext");
  if (hpTextEl) hpTextEl.textContent = `HP: ${Math.max(0, Math.round(unit.hp))}/${unit.maxHp}`;

  const hpFillEl = card.querySelector(".hp-fill");
  if (hpFillEl) hpFillEl.style.width = `${Math.round(hpRate * 100)}%`;

  const energyTextEl = card.querySelector(".unit-energytext");
  if (energyTextEl) energyTextEl.textContent = `能量: ${Math.round(unit.energy || 0)}/100`;

  const energyFillEl = card.querySelector(".energy-fill");
  if (energyFillEl) energyFillEl.style.width = `${Math.round(energyRate * 100)}%`;
}

function upsertUnitBoard(boardEl, units) {
  const existing = new Map(Array.from(boardEl.children).map((el) => [String(el.dataset.unitId), el]));

  units.forEach((unit) => {
    const unitId = String(unit.id);
    let card = existing.get(unitId);
    if (!card) {
      card = createUnitCard(unit);
    }
    updateUnitCard(card, unit);
    boardEl.appendChild(card);
    existing.delete(unitId);
  });

  existing.forEach((el) => el.remove());
}

function renderBattlefield() {
  const battle = state.battle;
  const allies = battle ? battle.allies : state.team.map((heroId) => previewUnitFromHero(heroId)).filter(Boolean);
  const enemies = battle
    ? battle.enemies
    : buildStageEnemies(state.selectedStage).map((enemy) => ({ ...enemy, hp: enemy.maxHp, energy: 0 }));

  upsertUnitBoard(refs.allyBoard, allies);
  upsertUnitBoard(refs.enemyBoard, enemies);

  refs.startBattleBtn.disabled = Boolean(state.battle) || state.cinematicRunning || autoBattleRunning;
  if (refs.playAnimDemoBtn) {
    refs.playAnimDemoBtn.disabled = Boolean(state.battle) || state.cinematicRunning || autoBattleRunning;
  }
  if (refs.autoBattleBtn) {
    refs.autoBattleBtn.disabled = Boolean(state.battle) || state.cinematicRunning || autoBattleRunning;
  }
}

function createUnitCard(unit) {
  const card = document.createElement("div");
  card.className = "unit-card";
  card.dataset.unitId = unit.id;
  card.dataset.side = unit.side;

  const portraitMarkup = getSafeImgMarkup("unit-portrait", unit.portrait, unit.name, unit.avatar || "⚔️");

  card.innerHTML = `
    <div class="unit-top">
      <div style="display:flex;align-items:center;gap:8px;">
        ${portraitMarkup}
        <div>
          <div><strong>${unit.name}</strong></div>
          <small>${unit.role || "单位"}</small>
        </div>
      </div>
      <small class="unit-status"></small>
    </div>
    <div class="unit-hptext"></div>
    <div class="hp-bar"><div class="hp-fill"></div></div>
    <div class="unit-energytext"></div>
    <div class="energy-bar"><div class="energy-fill"></div></div>
  `;

  updateUnitCard(card, unit);
  return card;
}

function previewUnitFromHero(heroId) {
  const stat = getHeroPower(heroId);
  if (!stat) return null;

  return {
    side: "ally",
    id: heroId,
    name: stat.name,
    role: stat.role,
    avatar: stat.avatar,
    portrait: stat.portrait,
    artwork: stat.artwork,
    skillTrack: stat.skillTrack || null,
    maxHp: stat.maxHp,
    hp: stat.maxHp,
    atk: stat.atk,
    def: stat.def,
    speed: stat.speed,
    skillName: stat.skillName,
    skillPower: stat.skillPower,
    healPower: stat.healPower || 0,
    critRate: stat.critRate,
    dodgeRate: stat.dodgeRate,
    skillAmp: stat.skillAmp,
    runeLv: stat.runeLv,
    milestoneAoeBonus: stat.milestoneAoeBonus || false,
    energy: 0,
  };
}

function buildStageEnemies(stageId) {
  const stage = getStageConfig(stageId);
  const grow = 1 + (stage.id - 1) * 0.34;

  return stage.enemies.map((enemyKey, idx) => {
    const base = ENEMY_LIBRARY[enemyKey];
    const factor = grow * (1 + idx * 0.04);

    return {
      side: "enemy",
      id: `${enemyKey}-${idx}`,
      name: base.name,
      role: "敌人",
      avatar: base.avatar,
      portrait: base.portrait,
      maxHp: Math.round(base.hp * factor),
      hp: Math.round(base.hp * factor),
      atk: Math.round(base.atk * factor),
      def: Math.round(base.def * factor),
      speed: Math.round(base.speed * factor),
      critRate: 0.06 + stage.id * 0.005,
      dodgeRate: 0.02 + stage.id * 0.002,
      skillAmp: 1,
      energy: 0,
      skillName: "凶猛打击",
      skillPower: 1.9,
      skillTrack: { engine: "lottie", src: "https://assets8.lottiefiles.com/packages/lf20_Rh6H8H.json" },
    };
  });
}

function appendLog(text, type = "") {
  const stamp = new Date().toLocaleTimeString("zh-CN", { hour12: false });
  state.logs.push({ text: `[${stamp}] ${text}`, type });
  if (state.logs.length > 150) {
    state.logs.splice(0, state.logs.length - 150);
  }
  renderLogs();
}

function renderLogs() {
  refs.battleLog.innerHTML = state.logs.map((line) => `<div class="${line.type || ""}">${line.text}</div>`).join("");
  refs.battleLog.scrollTop = refs.battleLog.scrollHeight;
}

let cinematicHideTimer = null;
let cinematicTeamsOverride = null;

function clearCinematicLayer() {
  if (!refs.battleCinematicLayer) return;
  if (cinematicHideTimer) {
    clearTimeout(cinematicHideTimer);
    cinematicHideTimer = null;
  }
  refs.battleCinematicLayer.classList.remove("active", "shake");
  refs.battleCinematicLayer.innerHTML = "";
}

function getCinematicPosition(side, index) {
  // 5人阵：从前排到后排按横向铺开
  const allyPos = [
    { x: 48, y: 66 },
    { x: 40, y: 52 },
    { x: 32, y: 40 },
    { x: 23, y: 52 },
    { x: 15, y: 66 },
  ];
  const enemyPos = [
    { x: 52, y: 66 },
    { x: 60, y: 52 },
    { x: 68, y: 40 },
    { x: 77, y: 52 },
    { x: 85, y: 66 },
  ];
  const source = side === "ally" ? allyPos : enemyPos;
  return source[index] || source[Math.floor(source.length / 2)];
}

function ensureCinematicSquad(units, side) {
  const cap = 5;
  const normalized = units.slice(0, cap).map((unit, idx) => ({
    ...unit,
    side,
    cinIndex: idx,
  }));

  while (normalized.length < cap) {
    normalized.push({
      id: `ghost-${side}-${normalized.length}`,
      name: "援军",
      avatar: "❔",
      maxHp: 1,
      hp: 1,
      energy: 0,
      side,
      isGhost: true,
      cinIndex: normalized.length,
    });
  }

  return normalized;
}

function getCinematicTeams() {
  if (cinematicTeamsOverride) {
    return {
      allies: ensureCinematicSquad(cinematicTeamsOverride.allies, "ally"),
      enemies: ensureCinematicSquad(cinematicTeamsOverride.enemies, "enemy"),
    };
  }

  const battle = state.battle;
  const allies = battle ? battle.allies : state.team.map((heroId) => previewUnitFromHero(heroId)).filter(Boolean);
  const enemies = battle ? battle.enemies : buildStageEnemies(state.selectedStage);

  return {
    allies: ensureCinematicSquad(allies, "ally"),
    enemies: ensureCinematicSquad(enemies, "enemy"),
  };
}

function findCinematicUnit(layer, side, unitId) {
  const candidates = Array.from(layer.querySelectorAll(`.cin-unit[data-cin-side="${side}"]`));
  return candidates.find((el) => el.dataset.cinId === String(unitId)) || null;
}

function formatCompactNumber(value) {
  const num = Math.max(0, Number(value) || 0);
  if (num >= 100000000) return `${(num / 100000000).toFixed(num >= 1000000000 ? 1 : 2)}亿`;
  if (num >= 10000) return `${(num / 10000).toFixed(num >= 1000000 ? 1 : 2)}万`;
  return String(Math.round(num));
}

function renderCinematicUnit(unit, side, index) {
  const pos = getCinematicPosition(side, index);
  const hpRate = unit.maxHp ? clamp(unit.hp / unit.maxHp, 0, 1) : 0;
  const energyRate = clamp((unit.energy || 0) / 100, 0, 1);
  const avatarMarkup = getSafeImgMarkup("cin-unit-avatar", unit.portrait, unit.name, unit.avatar || "⚔️");
  return `
    <div class="cin-unit ${unit.isGhost ? "ghost" : ""}" data-cin-id="${unit.id}" data-cin-side="${side}" style="left:${pos.x}%;top:${pos.y}%;">
      <div class="cin-unit-avatar-wrap">${avatarMarkup}</div>
      <div class="cin-unit-name">${unit.name}</div>
      <div class="cin-unit-hp"><div class="cin-unit-hpfill" style="width:${Math.round(hpRate * 100)}%;"></div></div>
      <div class="cin-unit-energy"><div class="cin-unit-energyfill" style="width:${Math.round(energyRate * 100)}%;"></div></div>
    </div>
  `;
}

function renderBottomPortrait(unit) {
  const hpRate = unit.maxHp ? clamp(unit.hp / unit.maxHp, 0, 1) : 0;
  const energyRate = clamp((unit.energy || 0) / 100, 0, 1);
  const avatarMarkup = getSafeImgMarkup("cin-portrait-avatar", unit.portrait, unit.name, unit.avatar || "⚔️");
  return `
    <div class="cin-portrait ${unit.isGhost ? "ghost" : ""}">
      ${avatarMarkup}
      <div class="cin-portrait-hp"><div class="cin-portrait-hpfill" style="width:${Math.round(hpRate * 100)}%;"></div></div>
      <div class="cin-portrait-energy"><div class="cin-portrait-energyfill" style="width:${Math.round(energyRate * 100)}%;"></div></div>
    </div>
  `;
}

function playCinematicAction(attacker, target, options) {
  const layer = refs.battleCinematicLayer;
  if (!layer || !attacker || !target) return;

  const { allies, enemies } = getCinematicTeams();
  const attackerTeam = attacker.side === "ally" ? allies : enemies;
  const targetTeam = target.side === "ally" ? allies : enemies;
  const targetInTeam = targetTeam.find((unit) => unit.id === target.id);
  if (targetInTeam && Number.isFinite(options.targetRate)) {
    targetInTeam.hp = Math.round(targetInTeam.maxHp * clamp(options.targetRate, 0, 1));
  }

  const isHeal = Boolean(options.isHeal);
  const isMiss = Boolean(options.miss);
  const showSkill = Boolean(options.useSkill) || isHeal;
  const dramaticSkill = showSkill && !isHeal;
  const bannerText = isHeal
    ? `${attacker.name} · 治疗祷言`
    : showSkill
      ? `${attacker.name} · ${attacker.skillName || "终结技"}`
      : `${attacker.name} · 普攻`;
  const damageText = isMiss ? "MISS" : `${isHeal ? "+" : "-"}${Math.round(options.value)}${options.crit ? " 暴击" : ""}`;
  const damageClass = isHeal ? "cin-dmg cin-heal" : isMiss ? "cin-dmg miss" : "cin-dmg";

  const attackerIndex = attackerTeam.findIndex((unit) => unit.id === attacker.id);
  const targetIndex = targetTeam.findIndex((unit) => unit.id === target.id);
  const attackerPos = getCinematicPosition(attacker.side, attackerIndex < 0 ? 2 : attackerIndex);
  const targetPos = getCinematicPosition(target.side, targetIndex < 0 ? 2 : targetIndex);
  const dx = targetPos.x - attackerPos.x;
  const dy = targetPos.y - attackerPos.y;
  const slashAngle = Math.atan2(dy, dx) * (180 / Math.PI);
  const slashLen = Math.max(120, Math.min(440, Math.hypot(dx, dy) * 8));
  const fightClock = String(68 + (state.selectedStage - 1) * 3).padStart(2, "0");
  const combo = Math.max(1, Math.round((options.value || 0) / 10000) + (options.crit ? 2 : 0) + (showSkill ? 1 : 0));
  const stageInfo = getStageConfig(state.selectedStage);
  const wave = ((state.selectedStage - 1) % 3) + 1;
  const actionTag = isHeal ? "治疗技" : showSkill ? "必杀技" : "普通攻击";
  const battleSpeed = autoBattleRunning ? "x2.0" : "x1.0";

  const calcTeamRate = (team) => {
    const aliveTeam = team.filter((unit) => !unit.isGhost);
    const totalHp = aliveTeam.reduce((sum, unit) => sum + (Number(unit.hp) || 0), 0);
    const totalMax = aliveTeam.reduce((sum, unit) => sum + (Number(unit.maxHp) || 0), 0);
    return totalMax > 0 ? clamp(totalHp / totalMax, 0, 1) : 0;
  };

  const calcTeamPowerScore = (team) =>
    team
      .filter((unit) => !unit.isGhost)
      .reduce((sum, unit) => sum + (Number(unit.maxHp) || 0) * 0.2 + (Number(unit.atk) || 0) * 2.6 + (Number(unit.def) || 0) * 1.2 + (Number(unit.speed) || 0) * 1.5, 0);

  const allyAlive = allies.filter((unit) => !unit.isGhost && unit.hp > 0).length;
  const enemyAlive = enemies.filter((unit) => !unit.isGhost && unit.hp > 0).length;
  const allyHpRate = calcTeamRate(allies);
  const enemyHpRate = calcTeamRate(enemies);
  const allyPower = Math.round(calcTeamPowerScore(allies));
  const enemyPower = Math.round(calcTeamPowerScore(enemies));

  layer.innerHTML = `
    <div class="cin-stage ${dramaticSkill ? "dramatic" : ""}">
      <div class="cin-bg"></div>
      <div class="cin-vignette"></div>
      <div class="cin-grain"></div>
      <div class="cin-ground"></div>
      <div class="cin-blackout ${dramaticSkill ? "show" : ""}"></div>
      <div class="cin-spotlight ${dramaticSkill ? "show" : ""}" style="left:${attackerPos.x}%;top:${attackerPos.y - 8}%;"></div>
      <div class="cin-screen-flash ${isHeal ? "heal" : showSkill ? "skill" : ""}"></div>
      <div class="cin-top-panel">
        <div class="cin-stage-title">${stageInfo.name}</div>
        <div class="cin-top-meta">
          <span>WAVE ${wave}/3</span>
          <span>TIME 01:${fightClock}</span>
          <span>SPEED ${battleSpeed}</span>
        </div>
      </div>
      <div class="cin-team-status ally">
        <div class="cin-status-head"><span>我方</span><span>${allyAlive}/5</span></div>
        <div class="cin-status-bar"><div class="cin-status-fill" style="width:${Math.round(allyHpRate * 100)}%;"></div></div>
        <div class="cin-status-power">战力 ${formatCompactNumber(allyPower)}</div>
      </div>
      <div class="cin-team-status enemy">
        <div class="cin-status-head"><span>敌方</span><span>${enemyAlive}/5</span></div>
        <div class="cin-status-bar"><div class="cin-status-fill" style="width:${Math.round(enemyHpRate * 100)}%;"></div></div>
        <div class="cin-status-power">战力 ${formatCompactNumber(enemyPower)}</div>
      </div>
      <div class="cin-action-tag">${actionTag}</div>
      <div class="cin-skill-banner">${bannerText}</div>
      <div class="cin-team">${allies.map((unit, index) => renderCinematicUnit(unit, "ally", index)).join("")}</div>
      <div class="cin-team">${enemies.map((unit, index) => renderCinematicUnit(unit, "enemy", index)).join("")}</div>
      <div class="cin-impact-wave" style="left:${targetPos.x}%;top:${targetPos.y}%;"></div>
      <div class="cin-slash ${showSkill ? "skill" : ""}" style="left:${(attackerPos.x + targetPos.x) / 2}%;top:${(attackerPos.y + targetPos.y) / 2}%;--slash-rotate:${slashAngle}deg;--slash-len:${slashLen}px;"></div>
      <div class="${damageClass}" style="left:${targetPos.x}%;top:${targetPos.y - 18}%;">${damageText}</div>
      <div class="cin-combo ${showSkill ? "show" : ""}">COMBO ×${combo}</div>
      <div class="cin-bottom-bar">${allies.map((unit) => renderBottomPortrait(unit)).join("")}</div>
    </div>
  `;

  const attackerEl = findCinematicUnit(layer, attacker.side, attacker.id);
  const targetEl = findCinematicUnit(layer, target.side, target.id);
  const bannerEl = layer.querySelector(".cin-skill-banner");
  const dmgEl = layer.querySelector(".cin-dmg");
  const slashEl = layer.querySelector(".cin-slash");
  const impactEl = layer.querySelector(".cin-impact-wave");

  layer.classList.add("active");
  requestAnimationFrame(() => {
    layer.classList.add("shake");
    if (showSkill) {
      layer.classList.add("skill-focus");
      attackerEl?.classList.add("cast");
      bannerEl?.classList.add("show");
    } else {
      attackerEl?.classList.add("attack");
    }

    const triggerImpact = () => {
      targetEl?.classList.add("hit");
      dmgEl?.classList.add("show");
      slashEl?.classList.add("show");
      impactEl?.classList.add("show");
    };

    if (dramaticSkill) {
      setTimeout(triggerImpact, 120);
    } else {
      triggerImpact();
    }
  });

  const resetDelay = dramaticSkill ? 560 : 420;
  setTimeout(() => {
    layer.classList.remove("shake", "skill-focus");
    attackerEl?.classList.remove("attack", "cast");
    targetEl?.classList.remove("hit");
  }, resetDelay);

  if (cinematicHideTimer) clearTimeout(cinematicHideTimer);
  const hideDelay = options.holdMs || (dramaticSkill ? 980 : 880);
  cinematicHideTimer = setTimeout(() => {
    layer.classList.remove("active", "shake", "skill-focus");
  }, hideDelay);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function playBattleAnimationDemo() {
  if (state.battle || state.cinematicRunning) return;

  const demoAllies = ensureCinematicSquad(state.team.map((heroId) => previewUnitFromHero(heroId)).filter(Boolean), "ally");
  const demoEnemies = ensureCinematicSquad(buildStageEnemies(state.selectedStage), "enemy");

  if (!demoAllies.length || !demoEnemies.length) {
    appendLog("当前无法播放动画演示，请先配置阵容", "log-lose");
    return;
  }

  const healer = demoAllies.find((unit) => unit.healPower) || demoAllies[1] || demoAllies[0];
  state.cinematicRunning = true;
  cinematicTeamsOverride = { allies: demoAllies, enemies: demoEnemies };
  renderBattlefield();
  appendLog("开始播放MT2风格战斗动画演示", "log-win");

  try {
    const sequences = [
      { attacker: demoAllies[2], target: demoEnemies[1], useSkill: false, damage: Math.round(demoEnemies[1].maxHp * 0.16) },
      { attacker: demoEnemies[0], target: demoAllies[0], useSkill: false, damage: Math.round(demoAllies[0].maxHp * 0.13) },
      { attacker: demoAllies[1], target: demoEnemies[0], useSkill: true, damage: Math.round(demoEnemies[0].maxHp * 0.24), crit: true },
      { attacker: demoEnemies[2], target: demoAllies[1], useSkill: true, damage: Math.round(demoAllies[1].maxHp * 0.18) },
      { attacker: healer, target: demoAllies[0], useSkill: true, heal: Math.round(demoAllies[0].maxHp * 0.2) },
      { attacker: demoAllies[0], target: demoEnemies[2], useSkill: true, damage: Math.round(demoEnemies[2].maxHp * 0.34), crit: true },
    ];

    for (const action of sequences) {
      action.attacker.energy = clamp((action.attacker.energy || 0) + 34, 0, 100);

      if (action.heal) {
        action.target.hp = clamp(action.target.hp + action.heal, 1, action.target.maxHp);
        action.attacker.energy = 0;
        playCinematicAction(action.attacker, action.target, {
          isHeal: true,
          useSkill: true,
          value: action.heal,
          targetRate: action.target.hp / action.target.maxHp,
          holdMs: 840,
        });
      } else {
        action.target.hp = clamp(action.target.hp - action.damage, 1, action.target.maxHp);
        if (action.useSkill) action.attacker.energy = 0;
        playCinematicAction(action.attacker, action.target, {
          useSkill: action.useSkill,
          value: action.damage,
          crit: action.crit,
          targetRate: action.target.hp / action.target.maxHp,
          holdMs: 840,
        });
      }

      await sleep(880);
    }

    appendLog("演示结束：可点击开始战斗体验同款实时镜头", "log-win");
  } finally {
    cinematicTeamsOverride = null;
    state.cinematicRunning = false;
    clearCinematicLayer();
    renderBattlefield();
  }
}

function emitBattleFx(type, side, unitId) {
  const layer = refs.battleFxLayer;
  if (!layer) return;

  const rootRect = layer.getBoundingClientRect();
  const target = document.querySelector(`.unit-card[data-side="${side}"][data-unit-id="${unitId}"]`);

  let centerX = rootRect.width / 2;
  let centerY = rootRect.height / 2;
  if (target) {
    const rect = target.getBoundingClientRect();
    centerX = rect.left - rootRect.left + rect.width * (0.3 + Math.random() * 0.4);
    centerY = rect.top - rootRect.top + rect.height * (0.3 + Math.random() * 0.4);
  }

  const count = type === "skill" ? 6 : 3;
  for (let i = 0; i < count; i += 1) {
    const fx = document.createElement("span");
    fx.className = `battle-fx ${type}`;
    fx.style.left = `${centerX + (Math.random() - 0.5) * 24}px`;
    fx.style.top = `${centerY + (Math.random() - 0.5) * 24}px`;
    layer.appendChild(fx);
    fx.onanimationend = () => fx.remove();
  }
}

function flashUnitHit(side, unitId) {
  const card = document.querySelector(`.unit-card[data-side="${side}"][data-unit-id="${unitId}"]`);
  if (!card) return;
  card.classList.remove("hit");
  void card.offsetWidth;
  card.classList.add("hit");
}

function startBattle() {
  if (state.battle || state.cinematicRunning) return;

  const allies = state.team.map((heroId) => previewUnitFromHero(heroId)).filter(Boolean);
  if (allies.length < 5) {
    appendLog("上阵英雄不足 5 名，无法开始战斗", "log-lose");
    return;
  }

  state.battle = {
    allies,
    enemies: buildStageEnemies(state.selectedStage),
    queue: [],
    timer: null,
  };

  appendLog(`开始挑战 1-${state.selectedStage} ${getStageName(state.selectedStage)}`);
  renderBattlefield();

  state.battle.timer = setInterval(() => {
    battleTick();
  }, 680);
}

function battleTick() {
  const battle = state.battle;
  if (!battle) return;

  const aliveAllies = battle.allies.filter((u) => u.hp > 0);
  const aliveEnemies = battle.enemies.filter((u) => u.hp > 0);

  if (!aliveAllies.length || !aliveEnemies.length) {
    finishBattle(aliveAllies.length > 0);
    return;
  }

  if (!battle.queue.length) {
    battle.queue = [...aliveAllies, ...aliveEnemies].sort((a, b) => b.speed + Math.random() * 8 - (a.speed + Math.random() * 8));
  }

  const actor = battle.queue.shift();
  if (!actor || actor.hp <= 0) return;

  actor.energy = clamp((actor.energy || 0) + 34, 0, 100);

  if (actor.side === "ally" && actor.healPower && actor.energy >= 100) {
    castHealSkill(actor, battle.allies);
    actor.energy = 0;
  } else {
    const opponents = actor.side === "ally" ? battle.enemies : battle.allies;
    const targets = opponents.filter((u) => u.hp > 0);
    if (!targets.length) {
      finishBattle(actor.side === "ally");
      return;
    }

    const target = pickTarget(targets);
    const useSkill = actor.energy >= 100;
    doDamage(actor, target, useSkill);
    if (useSkill) actor.energy = 0;
    if (target.hp <= 0) appendLog(`${target.name} 被击倒`);
  }

  renderBattlefield();

  const stillAllies = battle.allies.some((u) => u.hp > 0);
  const stillEnemies = battle.enemies.some((u) => u.hp > 0);
  if (!stillAllies || !stillEnemies) {
    finishBattle(stillAllies);
  }
}

function pickTarget(targets) {
  return targets.reduce((prev, cur) => (cur.hp < prev.hp ? cur : prev), targets[0]);
}

function doDamage(attacker, defender, useSkill) {
  if (Math.random() < (defender.dodgeRate || 0)) {
    appendLog(`${defender.name} 闪避了 ${attacker.name} 的攻击`);
    emitBattleFx("damage", defender.side, defender.id);
    playCinematicAction(attacker, defender, {
      useSkill,
      miss: true,
      value: 0,
      targetRate: defender.maxHp ? defender.hp / defender.maxHp : 1,
    });
    return;
  }

  const randomSwing = 0.82 + Math.random() * 0.36;
  const baseDamage = attacker.atk * randomSwing;
  const skillFactor = useSkill ? (attacker.skillPower || 1.9) * (attacker.skillAmp || 1) : 1;
  const reduced = defender.def * (0.34 + Math.random() * 0.08);

  let damage = Math.max(1, Math.round(baseDamage * skillFactor - reduced));
  const crit = Math.random() < (attacker.critRate || 0.06);
  if (crit) damage = Math.round(damage * 1.6);

  defender.hp = clamp(defender.hp - damage, 0, defender.maxHp);
  emitBattleFx(useSkill ? "skill" : "damage", defender.side, defender.id);
  flashUnitHit(defender.side, defender.id);
  playCinematicAction(attacker, defender, {
    useSkill,
    value: damage,
    crit,
    targetRate: defender.maxHp ? defender.hp / defender.maxHp : 0,
  });

  // Lv100 里程碑 AOE 溅射
  if (useSkill && attacker.milestoneAoeBonus && attacker.side === "ally") {
    const splashTargets = (attacker.side === "ally"
      ? (state.battle ? state.battle.enemies : [])
      : (state.battle ? state.battle.allies : [])
    ).filter((u) => u.hp > 0 && u.id !== defender.id);
    for (const splash of splashTargets) {
      const splashDmg = Math.max(1, Math.round(damage * 0.3));
      splash.hp = clamp(splash.hp - splashDmg, 0, splash.maxHp);
      emitBattleFx("skill", splash.side, splash.id);
      if (splash.hp <= 0) appendLog(`${splash.name} 被溅射击倒`);
    }
    if (splashTargets.length) {
      appendLog(`💥 天罚之雨溅射 ${splashTargets.length} 个目标，各造成 ${Math.round(damage * 0.3)} 伤害`);
    }
  }

  if (useSkill) {
    appendLog(`${attacker.name} 释放 ${attacker.skillName}，对 ${defender.name} 造成 ${damage} 伤害${crit ? "（暴击）" : ""}`);
  } else {
    appendLog(`${attacker.name} 攻击 ${defender.name}，造成 ${damage} 伤害${crit ? "（暴击）" : ""}`);
  }
}

function castHealSkill(actor, allies) {
  const aliveAllies = allies.filter((u) => u.hp > 0);
  if (!aliveAllies.length) return;

  const wounded = aliveAllies.filter((u) => u.hp < u.maxHp);
  const target = wounded.sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0] || aliveAllies[0];
  const heal = Math.max(1, Math.round(actor.atk * (actor.healPower || 1.3) * (actor.skillAmp || 1) * (1 + (actor.runeLv || 0) * 0.06)));

  target.hp = clamp(target.hp + heal, 0, target.maxHp);
  emitBattleFx("heal", target.side, target.id);
  playCinematicAction(actor, target, {
    isHeal: true,
    useSkill: true,
    value: heal,
    targetRate: target.maxHp ? target.hp / target.maxHp : 1,
  });
  appendLog(`${actor.name} 释放 ${actor.skillName}，为 ${target.name} 回复 ${heal} 生命`);
}

function finishBattle(win) {
  const battle = state.battle;
  if (!battle) return;

  autoBattleLastWin = win;
  clearInterval(battle.timer);
  state.battle = null;
  clearCinematicLayer();

  if (win) {
    const stage = getStageConfig(state.selectedStage);
    state.gold += stage.rewardGold;
    state.gem += stage.rewardGem;
    grantTeamExp(stage.id * 16);

    if (state.selectedStage === state.unlockedStage && state.unlockedStage < MAX_STAGE_CAP) {
      state.unlockedStage += 1;
      appendLog(`胜利！解锁了 1-${state.unlockedStage} ${getStageName(state.unlockedStage)}`, "log-win");
    } else {
      appendLog(`战斗胜利，获得 ${stage.rewardGold} 金币 + ${stage.rewardGem} 钻石`, "log-win");
    }

    if (state.account.token) {
      submitLeaderboard().catch(() => {});
    }
  } else {
    appendLog("战斗失败，建议强化装备与符文后再试", "log-lose");
  }

  saveLocalGame();
  renderAll();
}

// ── 连续战斗（挂机）系统 ──
let autoBattleRunning = false;
let autoBattleCancelled = false;
let autoBattleLastWin = false;

async function waitForBattleEnd() {
  while (state.battle) {
    await sleep(80);
  }
  return autoBattleLastWin;
}

async function startAutoBattle() {
  if (state.battle || state.cinematicRunning || autoBattleRunning) return;

  const allies = state.team.map((heroId) => previewUnitFromHero(heroId)).filter(Boolean);
  if (allies.length < 5) {
    appendLog("上阵英雄不足 5 名，无法挂机战斗", "log-lose");
    return;
  }

  const stageId = state.selectedStage;
  const stage = getStageConfig(stageId);
  const totalRounds = parseInt(refs.autoBattleCount?.value || "10", 10);
  autoBattleRunning = true;
  autoBattleCancelled = false;

  if (refs.autoBattleBtn) refs.autoBattleBtn.style.display = "none";
  if (refs.autoBattleStopBtn) refs.autoBattleStopBtn.style.display = "";
  if (refs.autoBattleProgress) refs.autoBattleProgress.style.display = "";
  if (refs.startBattleBtn) refs.startBattleBtn.disabled = true;
  if (refs.playAnimDemoBtn) refs.playAnimDemoBtn.disabled = true;

  let wins = 0;
  let losses = 0;
  let totalGold = 0;
  let totalGem = 0;
  let totalExp = 0;

  appendLog(`🔄 开始连续战斗 ×${totalRounds}（关卡 1-${stageId}）`, "log-win");

  for (let i = 0; i < totalRounds; i += 1) {
    if (autoBattleCancelled) break;

    if (refs.autoBattleProgress) {
      refs.autoBattleProgress.textContent = `${i + 1}/${totalRounds}`;
    }

    const beforeGold = state.gold;
    const beforeGem = state.gem;
    state.selectedStage = stageId;
    autoBattleLastWin = false;

    startBattle();
    const win = await waitForBattleEnd();

    const gainedGold = Math.max(0, state.gold - beforeGold);
    const gainedGem = Math.max(0, state.gem - beforeGem);
    totalGold += gainedGold;
    totalGem += gainedGem;

    if (win) {
      wins += 1;
      totalExp += stage.id * 16;
    } else {
      losses += 1;
    }

    appendLog(`挂机第 ${i + 1} 场：${win ? "胜利" : "失败"}`, win ? "log-win" : "log-lose");

    await sleep(120);
  }

  appendLog(
    `🏁 连续战斗结束：${wins}胜 / ${losses}负，获得 ${totalGold} 金币 + ${totalGem} 钻石 + ${totalExp} 经验`,
    wins > 0 ? "log-win" : "log-lose"
  );

  if (autoBattleCancelled) {
    appendLog("⏹ 连续战斗已停止", "log-lose");
  }

  if (state.account.token) {
    submitLeaderboard().catch(() => {});
  }

  autoBattleRunning = false;
  autoBattleCancelled = false;
  if (refs.autoBattleBtn) refs.autoBattleBtn.style.display = "";
  if (refs.autoBattleStopBtn) refs.autoBattleStopBtn.style.display = "none";
  if (refs.autoBattleProgress) {
    refs.autoBattleProgress.style.display = "none";
    refs.autoBattleProgress.textContent = "";
  }
  if (refs.startBattleBtn) refs.startBattleBtn.disabled = false;
  if (refs.playAnimDemoBtn) refs.playAnimDemoBtn.disabled = false;

  saveLocalGame();
  renderAll();
}

function stopAutoBattle() {
  if (autoBattleRunning) {
    autoBattleCancelled = true;
    appendLog("⏹ 连续战斗将在当前场次后停止", "log-lose");
  }
}

function grantTeamExp(amount) {
  const levelUps = [];
  const LEVEL_UP_CAP_PER_BATTLE = 6;

  state.team.forEach((heroId) => {
    const own = state.heroes[heroId];
    if (!own) return;

    own.exp += amount;
    let gainedThisBattle = 0;
    while (own.exp >= expNeed(own.level) && gainedThisBattle < LEVEL_UP_CAP_PER_BATTLE) {
      own.exp -= expNeed(own.level);
      own.level += 1;
      gainedThisBattle += 1;
      levelUps.push(`${getHeroById(heroId).name} Lv.${own.level}`);
    }
  });

  if (levelUps.length) {
    appendLog(`队伍升级：${levelUps.join("，")}`, "log-win");
  }
}

function expNeed(level) {
  const lv = Math.max(1, Number(level) || 1);
  if (lv <= 30) {
    return Math.round(260 + lv * 55);
  }

  const stage1End = 260 + 30 * 55;
  if (lv <= 100) {
    return Math.round(stage1End + Math.pow(lv - 30, 1.52) * 86);
  }

  const stage2End = stage1End + Math.pow(70, 1.52) * 86;
  const extraLv = lv - 100;
  return Math.round(stage2End + Math.pow(extraLv, 1.24) * 190 + Math.log2(extraLv + 1) * 520);
}

function getUpgradeCost(heroId) {
  const own = state.heroes[heroId];
  if (!own) return Infinity;
  const lv = Math.max(1, Number(own.level) || 1);
  if (lv <= 30) {
    return Math.round(260 + lv * 130);
  }

  const stage1End = 260 + 30 * 130;
  if (lv <= 100) {
    return Math.round(stage1End + Math.pow(lv - 30, 1.55) * 280);
  }

  const stage2End = stage1End + Math.pow(70, 1.55) * 280;
  const extraLv = lv - 100;
  return Math.round(stage2End + Math.pow(extraLv, 1.18) * 420 + Math.log2(extraLv + 1) * 360);
}

function getWeaponCost(heroId) {
  const own = state.heroes[heroId];
  if (!own) return Infinity;
  const lv = Math.max(1, Number(own.weaponLv) + 1 || 1);
  if (lv <= 30) {
    return Math.round(300 + lv * 170);
  }

  const stage1End = 300 + 30 * 170;
  if (lv <= 100) {
    return Math.round(stage1End + Math.pow(lv - 30, 1.5) * 240);
  }

  const stage2End = stage1End + Math.pow(70, 1.5) * 240;
  const extraLv = lv - 100;
  return Math.round(stage2End + Math.pow(extraLv, 1.16) * 330 + Math.log2(extraLv + 1) * 280);
}

function getArmorCost(heroId) {
  const own = state.heroes[heroId];
  if (!own) return Infinity;
  const lv = Math.max(1, Number(own.armorLv) + 1 || 1);
  if (lv <= 30) {
    return Math.round(280 + lv * 155);
  }

  const stage1End = 280 + 30 * 155;
  if (lv <= 100) {
    return Math.round(stage1End + Math.pow(lv - 30, 1.48) * 225);
  }

  const stage2End = stage1End + Math.pow(70, 1.48) * 225;
  const extraLv = lv - 100;
  return Math.round(stage2End + Math.pow(extraLv, 1.15) * 310 + Math.log2(extraLv + 1) * 260);
}

function getRuneCost(heroId) {
  const own = state.heroes[heroId];
  if (!own) return Infinity;
  const lv = Math.max(1, Number(own.runeLv) + 1 || 1);
  if (lv <= 30) {
    return Math.round(40 + lv * 18);
  }

  const stage1End = 40 + 30 * 18;
  if (lv <= 100) {
    return Math.round(stage1End + Math.pow(lv - 30, 1.42) * 22);
  }

  const stage2End = stage1End + Math.pow(70, 1.42) * 22;
  const extraLv = lv - 100;
  return Math.round(stage2End + Math.pow(extraLv, 1.12) * 32 + Math.log2(extraLv + 1) * 26);
}

function recruitByGold() {
  const cost = 1000000;
  if (state.gold < cost) {
    appendLog("金币不足，无法招募", "log-lose");
    return;
  }
  state.gold -= cost;
  recruitHero("gold");
}

function recruitByGem() {
  const cost = 1000;
  if (state.gem < cost) {
    appendLog("钻石不足，无法招募", "log-lose");
    return;
  }
  state.gem -= cost;
  recruitHero("gem");
}

function recruitHero(mode) {
  const weights = HERO_POOL.map((hero) => (hero.quality === "SSR" ? (mode === "gem" ? 2.45 : 1.65) : 3.2));
  const picked = weightedRandom(HERO_POOL, weights);
  const own = state.heroes[picked.id];

  if (!own) {
    state.heroes[picked.id] = normalizeHeroOwn({ level: 1, exp: 0, stars: 1, weaponLv: 0, armorLv: 0, runeLv: 0 });
    appendLog(`招募成功，获得新英雄：${picked.name}`, "log-win");
  } else if (own.stars < 5) {
    own.stars += 1;
    appendLog(`重复英雄转化碎片：${picked.name} 升至 ${own.stars} 星`, "log-win");
  } else {
    const comp = picked.quality === "SSR" ? 180 : 100;
    state.gold += comp;
    appendLog(`${picked.name} 已满星，转化为 ${comp} 金币`, "log-win");
  }

  if (!state.selectedHero) state.selectedHero = picked.id;
  normalizeTeam();
  saveLocalGame();
  renderAll();
}

function weightedRandom(items, weights) {
  const total = weights.reduce((sum, value) => sum + value, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < items.length; i += 1) {
    roll -= weights[i];
    if (roll <= 0) return items[i];
  }
  return items[items.length - 1];
}

function upgradeHero() {
  const heroId = state.selectedHero;
  const own = state.heroes[heroId];
  if (!own) return;
  const cost = getUpgradeCost(heroId);
  if (state.gold < cost) {
    appendLog("金币不足，升级失败", "log-lose");
    return;
  }

  state.gold -= cost;
  own.level += 1;
  appendLog(`${getHeroById(heroId).name} 升至 Lv.${own.level}`, "log-win");
  saveLocalGame();
  renderAll();
}

function upgradeWeapon() {
  const heroId = state.selectedHero;
  const own = state.heroes[heroId];
  if (!own) return;
  const cost = getWeaponCost(heroId);
  if (state.gold < cost) {
    appendLog("金币不足，无法强化武器", "log-lose");
    return;
  }

  state.gold -= cost;
  own.weaponLv += 1;
  appendLog(`${getHeroById(heroId).name} 武器强化到 Lv.${own.weaponLv}`, "log-win");
  saveLocalGame();
  renderAll();
}

function upgradeArmor() {
  const heroId = state.selectedHero;
  const own = state.heroes[heroId];
  if (!own) return;
  const cost = getArmorCost(heroId);
  if (state.gold < cost) {
    appendLog("金币不足，无法强化护甲", "log-lose");
    return;
  }

  state.gold -= cost;
  own.armorLv += 1;
  appendLog(`${getHeroById(heroId).name} 护甲强化到 Lv.${own.armorLv}`, "log-win");
  saveLocalGame();
  renderAll();
}

function upgradeRune() {
  const heroId = state.selectedHero;
  const own = state.heroes[heroId];
  if (!own) return;
  const cost = getRuneCost(heroId);
  if (state.gem < cost) {
    appendLog("钻石不足，无法强化符文", "log-lose");
    return;
  }

  state.gem -= cost;
  own.runeLv += 1;
  appendLog(`${getHeroById(heroId).name} 符文强化到 Lv.${own.runeLv}`, "log-win");
  saveLocalGame();
  renderAll();
}

function upgradeSkill() {
  const heroId = state.selectedHero;
  const own = state.heroes[heroId];
  if (!own) return;

  const skillLv = Math.max(1, Number(own.skillLv) || 1);
  const cost = getSkillCost(heroId);
  if (state.gem < cost) {
    appendLog("钻石不足，无法强化技能", "log-lose");
    return;
  }

  state.gem -= cost;
  const prevMilestones = getSkillMilestones(skillLv);
  own.skillLv = skillLv + 1;
  const newMilestones = getSkillMilestones(own.skillLv);
  appendLog(`${getHeroById(heroId).name} 技能强化到 Lv.${own.skillLv}`, "log-win");

  // 检测新解锁的里程碑
  const unlocked = newMilestones.filter((m) => !prevMilestones.includes(m));
  for (const m of unlocked) {
    if (m === 20) appendLog(`⭐ 里程碑解锁！【穿透之心】暴击率+8%`, "log-win");
    if (m === 50) appendLog(`⭐ 里程碑解锁！【毁灭之力】技能增幅额外+20%`, "log-win");
    if (m === 100) appendLog(`⭐ 里程碑解锁！【天罚之雨】技能附带AOE溅射`, "log-win");
  }

  saveLocalGame();
  renderAll();
}

function renderGuildBoss() {
  refs.bossName.textContent = "黑龙军团长·古雷曼";
  refs.bossSeasonText.textContent = `赛季 ${state.guildBoss.season}`;
  refs.bossHpText.textContent = `${Math.max(0, Math.round(state.guildBoss.hp))} / ${Math.round(state.guildBoss.maxHp)}`;
  refs.bossContribution.textContent = `我的累计伤害：${Math.round(state.myBossDamage)}`;

  const rate = state.guildBoss.maxHp ? clamp(state.guildBoss.hp / state.guildBoss.maxHp, 0, 1) : 0;
  refs.bossHpFill.style.width = `${Math.round(rate * 100)}%`;
}

function renderLeaderboard() {
  if (refs.leaderSeasonText) {
    if (state.leaderboardSeason) {
      refs.leaderSeasonText.textContent = `周赛季 S${state.leaderboardSeason.season} · ${state.leaderboardSeason.startText} - ${state.leaderboardSeason.endText}`;
    } else {
      refs.leaderSeasonText.textContent = "周赛季信息加载中...";
    }
  }

  if (!state.leaderboard.length) {
    refs.leaderboardList.innerHTML = "<div class='minor-text'>暂无数据，登录后可上传战力</div>";
    return;
  }

  refs.leaderboardList.innerHTML = state.leaderboard
    .map((item, idx) => {
      const isMe = state.account.username && state.account.username === item.username;
      return `
        <div class="rank-item" style="${isMe ? "color:#9fe6ff;" : ""}">
          <span>#${idx + 1} ${item.username}${isMe ? " (我)" : ""}</span>
          <span>战力 ${item.power} · 进度 1-${item.stage}</span>
        </div>
      `;
    })
    .join("");
}

function renderMails() {
  if (!refs.mailList) return;
  if (!state.account.token) {
    refs.mailList.innerHTML = "<div class='minor-text'>登录后可查看奖励邮件</div>";
    return;
  }
  if (!state.mails.length) {
    refs.mailList.innerHTML = "<div class='minor-text'>暂无新邮件</div>";
    return;
  }

  const hasUnclaimed = state.mails.some((m) => !m.claimed);
  let html = "";

  if (hasUnclaimed) {
    html += `<div class="mail-actions"><button class="claim-all-btn" onclick="claimAllMails()">一键领取全部奖励</button></div>`;
  }

  html += state.mails
    .map((mail) => {
      const statusClass = mail.claimed ? "claimed" : "unclaimed";
      const statusText = mail.claimed ? "已领取" : "可领取";
      const claimBtn = mail.claimed
        ? ""
        : `<button class="claim-btn" onclick="claimMail('${mail.id}')">领取</button>`;
      return `
        <div class="mail-item ${statusClass}">
          <div class="mail-header">
            <span class="mail-title">${mail.title}</span>
            <span class="mail-status ${statusClass}">${statusText}</span>
          </div>
          <div class="mail-body">${mail.body || ""}</div>
          <div class="mail-footer">
            <span class="mail-reward">${mail.rewardText}</span>
            ${claimBtn}
          </div>
        </div>
      `;
    })
    .join("");

  refs.mailList.innerHTML = html;
}

function renderAccountSection() {
  refs.accountHint.textContent = state.account.token ? `已登录：${state.account.username}` : "未登录";
  const disabled = !state.account.token;
  refs.logoutBtn.disabled = disabled;
  refs.cloudSaveBtn.disabled = disabled;
  refs.cloudLoadBtn.disabled = disabled;
  if (refs.refreshMailBtn) refs.refreshMailBtn.disabled = disabled;
}

async function refreshBossState() {
  try {
    const data = await apiRequest("/guildboss", { method: "GET", authOptional: true });
    state.guildBoss = {
      season: data.boss.season,
      maxHp: data.boss.maxHp,
      hp: data.boss.hp,
    };
    state.myBossDamage = Number(data.mySeasonDamage) || 0;
    renderGuildBoss();
  } catch {
    refs.bossContribution.textContent = "我的累计伤害：后端未连接";
  }
}

async function attackGuildBoss() {
  if (!state.account.token) {
    refs.accountHint.textContent = "请先登录后挑战公会BOSS";
    return;
  }

  const estimateDamage = Math.round(calcTeamPower() * (0.85 + Math.random() * 0.5));

  try {
    const data = await apiRequest("/guildboss/attack", {
      method: "POST",
      body: { damage: estimateDamage },
      authRequired: true,
    });

    state.guildBoss = {
      season: data.boss.season,
      maxHp: data.boss.maxHp,
      hp: data.boss.hp,
    };
    state.myBossDamage = Number(data.mySeasonDamage) || state.myBossDamage;

    const rewardGold = Number(data.reward?.gold) || 0;
    const rewardGem = Number(data.reward?.gem) || 0;
    state.gold += rewardGold;
    state.gem += rewardGem;

    appendLog(`公会BOSS战造成 ${data.actualDamage} 伤害，奖励 ${rewardGold} 金币 + ${rewardGem} 钻石`, "log-boss");
    saveLocalGame();
    renderAll();
  } catch (error) {
    refs.accountHint.textContent = error.message || "挑战失败";
  }
}

async function refreshLeaderboard() {
  try {
    const data = await apiRequest("/leaderboard", { method: "GET", authOptional: true });
    state.leaderboard = Array.isArray(data.leaderboard) ? data.leaderboard : [];
    if (data.season) {
      state.leaderboardSeason = data.season;
    }
    renderLeaderboard();
  } catch {
    if (!state.leaderboard.length) {
      refs.leaderboardList.innerHTML = "<div class='minor-text'>排行榜服务未连接</div>";
    }
  }
}

async function refreshMails() {
  if (!state.account.token) {
    state.mails = [];
    renderMails();
    return;
  }
  try {
    const data = await apiRequest("/mail", { method: "GET", authRequired: true });
    state.mails = Array.isArray(data.mails) ? data.mails.map((mail) => ({
      ...mail,
      rewardText: `${mail.reward.gold || 0}金币 / ${mail.reward.gem || 0}钻石`,
    })) : [];
    renderMails();
  } catch {
    refs.mailList.innerHTML = "<div class='minor-text'>邮件服务未连接</div>";
  }
}

async function claimMail(mailId) {
  if (!state.account.token) return;
  try {
    const data = await apiRequest("/mail/claim", {
      method: "POST",
      body: { mailId },
      authRequired: true,
    });

    const rewardGold = Number(data.reward?.gold) || 0;
    const rewardGem = Number(data.reward?.gem) || 0;
    state.gold += rewardGold;
    state.gem += rewardGem;

    // 更新本地邮件状态
    const mail = state.mails.find((m) => m.id === mailId);
    if (mail) mail.claimed = true;

    appendLog(`领取邮件奖励：${rewardGold} 金币 + ${rewardGem} 钻石`, "log-win");
    saveLocalGame();
    renderAll();
    await refreshMails();
  } catch (error) {
    appendLog(`领取失败：${error.message}`, "log-lose");
  }
}

async function claimAllMails() {
  if (!state.account.token) return;
  const unclaimed = state.mails.filter((m) => !m.claimed);
  if (!unclaimed.length) return;

  let totalGold = 0;
  let totalGem = 0;
  let failCount = 0;

  for (const mail of unclaimed) {
    try {
      const data = await apiRequest("/mail/claim", {
        method: "POST",
        body: { mailId: mail.id },
        authRequired: true,
      });
      totalGold += Number(data.reward?.gold) || 0;
      totalGem += Number(data.reward?.gem) || 0;
      mail.claimed = true;
    } catch {
      failCount += 1;
    }
  }

  state.gold += totalGold;
  state.gem += totalGem;

  if (totalGold > 0 || totalGem > 0) {
    appendLog(`批量领取奖励：${totalGold} 金币 + ${totalGem} 钻石${failCount > 0 ? `（${failCount}封失败）` : ""}`, "log-win");
  }

  saveLocalGame();
  renderAll();
  await refreshMails();
}

async function submitLeaderboard() {
  if (!state.account.token) {
    refs.accountHint.textContent = "登录后才能上传排行榜";
    return;
  }

  const payload = {
    power: calcTeamPower(),
    stage: state.unlockedStage,
  };

  await apiRequest("/leaderboard", {
    method: "POST",
    body: payload,
    authRequired: true,
  });

  await refreshLeaderboard();
  appendLog("战力已上传到排行榜", "log-win");
}

async function registerAccount() {
  const username = refs.usernameInput.value.trim();
  const password = refs.passwordInput.value;
  if (!username || !password) {
    refs.accountHint.textContent = "请输入用户名和密码";
    return;
  }

  try {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: { username, password },
      authOptional: true,
    });

    state.account.username = data.username;
    state.account.token = data.token;
    saveAuthSession();
    renderAccountSection();
    refs.cloudHint.textContent = "注册并登录成功";
    appendLog(`账号 ${data.username} 注册成功`, "log-win");

    await Promise.all([refreshBossState(), refreshLeaderboard(), refreshMails()]);
  } catch (error) {
    refs.accountHint.textContent = error.message || "注册失败";
  }
}

async function loginAccount() {
  const username = refs.usernameInput.value.trim();
  const password = refs.passwordInput.value;
  if (!username || !password) {
    refs.accountHint.textContent = "请输入用户名和密码";
    return;
  }

  try {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: { username, password },
      authOptional: true,
    });

    state.account.username = data.username;
    state.account.token = data.token;
    saveAuthSession();
    renderAccountSection();
    refs.cloudHint.textContent = "登录成功";
    appendLog(`欢迎回来，${data.username}`, "log-win");

    await Promise.all([refreshBossState(), refreshLeaderboard(), refreshMails()]);
  } catch (error) {
    refs.accountHint.textContent = error.message || "登录失败";
  }
}

function logoutAccount() {
  state.account.username = "";
  state.account.token = "";
  saveAuthSession();
  renderAccountSection();
  refs.cloudHint.textContent = "已退出登录";
}

async function cloudSave() {
  if (!state.account.token) {
    refs.accountHint.textContent = "请先登录";
    return;
  }

  try {
    await apiRequest("/save", {
      method: "POST",
      body: { snapshot: serializeGameData() },
      authRequired: true,
    });
    refs.cloudHint.textContent = "云存档上传成功";
  } catch (error) {
    refs.cloudHint.textContent = error.message || "上传失败";
  }
}

async function cloudLoad() {
  if (!state.account.token) {
    refs.accountHint.textContent = "请先登录";
    return;
  }

  try {
    const data = await apiRequest("/save", {
      method: "GET",
      authRequired: true,
    });

    if (data.snapshot) {
      applyGameData(data.snapshot, true);
      renderAll();
      refs.cloudHint.textContent = "云存档拉取成功";
      appendLog("已从云端同步游戏进度", "log-win");
    } else {
      refs.cloudHint.textContent = "云端暂无存档";
    }
  } catch (error) {
    refs.cloudHint.textContent = error.message || "拉取失败";
  }
}

async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    authRequired = false,
    authOptional = false,
  } = options;

  const headers = {
    "Content-Type": "application/json",
  };

  if (state.account.token && (authRequired || authOptional)) {
    headers.Authorization = `Bearer ${state.account.token}`;
  }

  if (authRequired && !state.account.token) {
    throw new Error("请先登录");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.message || `请求失败(${response.status})`);
  }

  return payload || {};
}

function getStageName(stageId) {
  return getStageConfig(stageId).name;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function switchPage(page) {
  const panels = document.querySelectorAll(".page-panel");
  const tabs = document.querySelectorAll(".page-tab");

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.page === page);
  });
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.page === page);
  });
}

function bindEvents() {
  refs.recruitGoldBtn.onclick = recruitByGold;
  refs.recruitGemBtn.onclick = recruitByGem;
  refs.upgradeHeroBtn.onclick = upgradeHero;
  refs.upWeaponBtn.onclick = upgradeWeapon;
  refs.upArmorBtn.onclick = upgradeArmor;
  refs.upRuneBtn.onclick = upgradeRune;
  if (refs.upSkillBtn) refs.upSkillBtn.onclick = upgradeSkill;
  refs.startBattleBtn.onclick = startBattle;
  if (refs.autoBattleBtn) refs.autoBattleBtn.onclick = startAutoBattle;
  if (refs.autoBattleStopBtn) refs.autoBattleStopBtn.onclick = stopAutoBattle;
  if (refs.playAnimDemoBtn) {
    refs.playAnimDemoBtn.onclick = () => {
      playBattleAnimationDemo().catch(() => {});
    };
  }

  refs.refreshBossBtn.onclick = () => {
    refreshBossState().catch(() => {});
  };
  refs.bossAttackBtn.onclick = () => {
    attackGuildBoss().catch(() => {});
  };
  refs.submitRankBtn.onclick = () => {
    submitLeaderboard().catch(() => {});
  };

  refs.registerBtn.onclick = () => {
    registerAccount().catch(() => {});
  };
  refs.loginBtn.onclick = () => {
    loginAccount().catch(() => {});
  };
  refs.logoutBtn.onclick = logoutAccount;
  refs.cloudSaveBtn.onclick = () => {
    cloudSave().catch(() => {});
  };
  refs.cloudLoadBtn.onclick = () => {
    cloudLoad().catch(() => {});
  };
  if (refs.refreshMailBtn) {
    refs.refreshMailBtn.onclick = () => {
      refreshMails().catch(() => {});
    };
  }

  if (refs.pageTabs) {
    refs.pageTabs.addEventListener("click", (event) => {
      const btn = event.target.closest(".page-tab");
      if (!btn) return;
      switchPage(btn.dataset.page || "adventure");
    });
  }
}

initState();
bindEvents();
renderAll();
if (!state.logs.length) {
  appendLog("欢迎来到我叫MT2网页版，准备好你的队伍开始冒险吧！");
  saveLocalGame();
}

refreshLeaderboard().catch(() => {});
refreshBossState().catch(() => {});
refreshMails().catch(() => {});

