#!/bin/bash
set -e

echo "=== Z-Wave Home Control - Linux Install ==="

# Install Node.js
if ! command -v node &> /dev/null; then
  echo "Installing Node.js..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
  sudo apt install -y nodejs
fi

echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"

# Install app dependencies
cd "$(dirname "$0")"
echo "Installing dependencies..."
npm install --production

echo ""
echo "=== Install complete ==="
echo ""
echo "To start:  npm start"
echo "Open at:   http://YOUR_SERVER_IP:3000"

# Optional: create systemd service
read -p "Create systemd service (auto-start on boot)? (y/n): " create_service
if [ "$create_service" = "y" ]; then
  APP_DIR="$(cd "$(dirname "$0")" && pwd)"
  sudo tee /etc/systemd/system/zwave-app.service > /dev/null <<EOF
[Unit]
Description=Z-Wave Home Control
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR
ExecStart=$(which node) $APP_DIR/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF
  sudo systemctl daemon-reload
  sudo systemctl enable zwave-app
  sudo systemctl start zwave-app
  echo "Service created and started!"
fi

echo "Done!"