# Z-Wave Home Control

Smart home dashboard for Z-Wave devices.

## Quick Install (Linux)

```bash
cd zwave-app
chmod +x install.sh
sudo ./install.sh
npm start
```

## Docker

```bash
docker build -t zwave-app .
docker run -d -p 3000:3000 --device /dev/ttyACM0 zwave-app
```

## Manual

```bash
cd zwave-app
npm install
npm start
```

Open `http://localhost:3000`

## Connect to real Z-Wave stick

1. Plug in Z-Wave USB controller
2. Install `zwave-js-server`: `npm install @zwave-js/server`
3. Update `server.js` to bridge to zwave-js-server WebSocket

### Hardware

Works with any Z-Wave USB stick:
- Zooz ZST39
- Aeotec Z-Stick
- HomeSeer HS-MS100+

### Devices supported

- Lights (on/off, dimmer)
- Locks (door, garage)
- Sensors (motion, temp, door)
- Thermostats
- Smart plugs
