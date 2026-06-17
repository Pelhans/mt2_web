#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
用法:
  ./deploy_ubuntu.sh [port]

示例:
  ./deploy_ubuntu.sh 3000

可选环境变量:
  APP_NAME      systemd 服务名（默认 mt2-web）
  SERVICE_USER  运行服务的系统用户（默认当前用户）
  APP_DIR       项目目录（默认脚本所在目录）
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

PORT="${1:-3000}"
APP_NAME="${APP_NAME:-mt2-web}"
APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
SERVICE_USER="${SERVICE_USER:-$(id -un)}"

if [[ ! -f "$APP_DIR/server.js" ]]; then
  echo "未找到 $APP_DIR/server.js，请检查 APP_DIR 是否正确"
  exit 1
fi

if [[ ! -f "$APP_DIR/package.json" ]]; then
  echo "未找到 $APP_DIR/package.json，请检查 APP_DIR 是否正确"
  exit 1
fi

if command -v sudo >/dev/null 2>&1; then
  SUDO="sudo"
else
  if [[ "$(id -u)" -ne 0 ]]; then
    echo "当前环境无 sudo 且非 root，无法安装依赖和写入 systemd"
    exit 1
  fi
  SUDO=""
fi

echo "[1/4] 检查并安装 Node.js (>=18)"
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

echo "[2/4] 安装项目依赖"
cd "$APP_DIR"
npm install --omit=dev --no-audit --no-fund

echo "[3/4] 配置并启动 systemd 服务"
SERVICE_FILE="/etc/systemd/system/${APP_NAME}.service"
$SUDO tee "$SERVICE_FILE" >/dev/null <<EOF
[Unit]
Description=MT2 Web Server (${APP_NAME})
After=network.target

[Service]
Type=simple
User=${SERVICE_USER}
WorkingDirectory=${APP_DIR}
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

echo "[4/4] 本机健康检查"
if command -v curl >/dev/null 2>&1; then
  curl -fsS "http://localhost:${PORT}/" >/dev/null
  echo "health check ok"
else
  echo "未安装 curl，跳过健康检查"
fi

echo "部署完成"
echo "服务名: ${APP_NAME}"
echo "项目目录: ${APP_DIR}"
echo "端口: ${PORT}"
echo "查看日志: $SUDO journalctl -u ${APP_NAME} -f"

