#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
用法:
  ./deploy_ubuntu.sh <user@host> [port]

示例:
  ./deploy_ubuntu.sh ubuntu@10.10.10.20 3000

可选环境变量:
  APP_NAME    systemd 服务名（默认 mt2-web）
  REMOTE_DIR  远端部署目录（默认 /opt/mt2_web）
EOF
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "缺少命令: $1"
    exit 1
  fi
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

TARGET="$1"
PORT="${2:-3000}"
APP_NAME="${APP_NAME:-mt2-web}"
REMOTE_DIR="${REMOTE_DIR:-/opt/mt2_web}"

if [[ "$TARGET" != *"@"* ]]; then
  echo "请使用 user@host 形式，例如 ubuntu@1.2.3.4"
  exit 1
fi

REMOTE_USER="${TARGET%@*}"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

require_cmd ssh
require_cmd rsync

echo "[1/4] 同步项目到远端: ${TARGET}:${REMOTE_DIR}"
ssh "$TARGET" "mkdir -p '$REMOTE_DIR'"
rsync -az --delete \
  --exclude ".git/" \
  --exclude "node_modules/" \
  --exclude "server-data.json" \
  --exclude "*.log" \
  --exclude "deploy_ubuntu.sh" \
  "$PROJECT_DIR/" "$TARGET:$REMOTE_DIR/"

echo "[2/4] 安装运行环境并配置 systemd"
ssh "$TARGET" "APP_NAME='$APP_NAME' REMOTE_DIR='$REMOTE_DIR' PORT='$PORT' SERVICE_USER='$REMOTE_USER' bash -s" <<'REMOTE_SCRIPT'
set -euo pipefail

if command -v sudo >/dev/null 2>&1; then
  SUDO="sudo"
else
  if [[ "$(id -u)" -ne 0 ]]; then
    echo "远端缺少 sudo 且当前用户非 root，无法继续"
    exit 1
  fi
  SUDO=""
fi

need_node=1
if command -v node >/dev/null 2>&1; then
  node_major="$(node -p 'parseInt(process.versions.node.split(".")[0], 10)')"
  if [[ "$node_major" -ge 18 ]]; then
    need_node=0
  fi
fi

if [[ "$need_node" -eq 1 ]]; then
  $SUDO apt-get update
  $SUDO DEBIAN_FRONTEND=noninteractive apt-get install -y curl ca-certificates gnupg
  curl -fsSL https://deb.nodesource.com/setup_20.x | $SUDO -E bash -
  $SUDO DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs
fi

$SUDO mkdir -p "$REMOTE_DIR"
$SUDO chown -R "$SERVICE_USER":"$SERVICE_USER" "$REMOTE_DIR"

cd "$REMOTE_DIR"
npm install --omit=dev --no-audit --no-fund

SERVICE_FILE="/etc/systemd/system/${APP_NAME}.service"
$SUDO tee "$SERVICE_FILE" >/dev/null <<EOF
[Unit]
Description=MT2 Web Server (${APP_NAME})
After=network.target

[Service]
Type=simple
User=${SERVICE_USER}
WorkingDirectory=${REMOTE_DIR}
Environment=NODE_ENV=production
Environment=PORT=${PORT}
ExecStart=/usr/bin/env node server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

$SUDO systemctl daemon-reload
$SUDO systemctl enable "${APP_NAME}.service"
$SUDO systemctl restart "${APP_NAME}.service"
$SUDO systemctl --no-pager --full status "${APP_NAME}.service" | cat
REMOTE_SCRIPT

echo "[3/4] 本机健康检查"
ssh "$TARGET" "curl -fsS 'http://127.0.0.1:${PORT}/' >/dev/null && echo 'health check ok'"

echo "[4/4] 部署完成"
echo "服务名: ${APP_NAME}"
echo "远端目录: ${REMOTE_DIR}"
echo "端口: ${PORT}"
echo "查看日志: ssh ${TARGET} 'sudo journalctl -u ${APP_NAME} -f'"
