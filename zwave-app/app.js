const devices = [
  { id: 1, name: 'Ceiling Light', room: 'Living Room', type: 'switch', icon: '💡', status: 'on', value: 80, battery: 100 },
  { id: 2, name: 'Floor Lamp', room: 'Living Room', type: 'dimmer', icon: '🪔', status: 'on', value: 60, battery: 100 },
  { id: 3, name: 'TV Light Strip', room: 'Living Room', type: 'dimmer', icon: '✨', status: 'off', value: 0, battery: 90 },
  { id: 4, name: 'Front Door Lock', room: 'Entry', type: 'lock', icon: '🔒', status: 'on', value: 1, battery: 85 },
  { id: 5, name: 'Garage Door', room: 'Entry', type: 'garage', icon: '🚗', status: 'off', value: 0, battery: 70 },
  { id: 6, name: 'Porch Light', room: 'Entry', type: 'switch', icon: '💡', status: 'on', value: 100, battery: 100 },
  { id: 7, name: 'Ceiling Light', room: 'Kitchen', type: 'switch', icon: '💡', status: 'on', value: 100, battery: 100 },
  { id: 8, name: 'Under Cabinet Light', room: 'Kitchen', type: 'dimmer', icon: '🔦', status: 'off', value: 0, battery: 95 },
  { id: 9, name: 'Motion Sensor', room: 'Kitchen', type: 'sensor', icon: '👁️', status: 'sleeping', value: 'Clear', battery: 60 },
  { id: 10, name: 'Temperature Sensor', room: 'Kitchen', type: 'sensor', icon: '🌡️', status: 'on', value: '72°F', battery: 80 },
  { id: 11, name: 'Ceiling Light', room: 'Bedroom', type: 'dimmer', icon: '💡', status: 'off', value: 0, battery: 100 },
  { id: 12, name: 'Smart Plug', room: 'Bedroom', type: 'switch', icon: '🔌', status: 'on', value: 100, battery: 100 },
  { id: 13, name: 'Door Sensor', room: 'Bedroom', type: 'sensor', icon: '🚪', status: 'on', value: 'Closed', battery: 75 },
  { id: 14, name: 'Smoke Detector', room: 'Hallway', type: 'sensor', icon: '🚨', status: 'on', value: 'Normal', battery: 90 },
  { id: 15, name: 'Thermostat', room: 'Hallway', type: 'thermostat', icon: '♨️', status: 'on', value: '71°F', battery: 85 }
];

let currentView = 'dashboard';

function render() {
  updateStats();
  renderDeviceGrid();
}

function updateStats() {
  const lightsOn = devices.filter(d => (d.type === 'switch' || d.type === 'dimmer') && d.status === 'on').length;
  const locks = devices.filter(d => d.type === 'lock');
  const lockedCount = locks.filter(d => d.value === 1).length;
  const tempDevice = devices.find(d => d.type === 'sensor' && d.name.includes('Temperature'));
  const lowBatt = devices.filter(d => d.battery < 20).length;

  document.getElementById('statLights').textContent = lightsOn;
  document.getElementById('statLocks').textContent = `${lockedCount}/${locks.length}`;
  document.getElementById('statTemp').textContent = tempDevice ? tempDevice.value : '--';
  document.getElementById('statBattery').textContent = lowBatt;
}

function renderDeviceGrid() {
  const grid = document.getElementById('deviceGrid');
  grid.innerHTML = '';

  devices.forEach(dev => {
    const card = document.createElement('div');
    card.className = 'device-card';
    card.dataset.id = dev.id;

    const statusClass = dev.status === 'on' ? 'on' : dev.status === 'off' ? 'off' : dev.status;

    let controls = '';
    let extra = '';

    if (dev.type === 'switch') {
      controls = `
        <button class="btn-control ${dev.status === 'on' ? 'on' : ''}" data-action="toggle" data-id="${dev.id}">
          ${dev.status === 'on' ? '🔌 On' : '⏻ Off'}
        </button>
      `;
    } else if (dev.type === 'dimmer') {
      controls = `
        <button class="btn-control ${dev.status === 'on' ? 'on' : ''}" data-action="toggle" data-id="${dev.id}">
          ${dev.status === 'on' ? '🔌 On' : '⏻ Off'}
        </button>
      `;
      extra = `<input type="range" min="0" max="100" value="${dev.value}" data-action="dim" data-id="${dev.id}">`;
    } else if (dev.type === 'lock') {
      controls = `
        <button class="btn-control ${dev.value === 1 ? 'on' : ''}" data-action="lock" data-id="${dev.id}">
          ${dev.value === 1 ? '🔒 Locked' : '🔓 Unlocked'}
        </button>
      `;
    } else if (dev.type === 'garage') {
      controls = `
        <button class="btn-control" data-action="garage" data-id="${dev.id}">
          ${dev.value === 1 ? '⬇️ Close' : '⬆️ Open'}
        </button>
      `;
    } else if (dev.type === 'sensor') {
      extra = '';
    } else if (dev.type === 'thermostat') {
      extra = '';
    }

    card.innerHTML = `
      <div class="device-header">
        <span class="device-icon">${dev.icon}</span>
        <div class="device-info">
          <div class="device-name">${dev.name}</div>
          <div class="device-room">${dev.room}</div>
        </div>
        <span class="device-status ${statusClass}"></span>
      </div>
      <div class="device-value">
        ${dev.type === 'sensor' || dev.type === 'thermostat' ? 'Value: <span>' + dev.value + '</span>' : 'Level: <span>' + dev.value + '%</span>'}
        &middot; Battery: <span>${dev.battery}%</span>
      </div>
      <div class="device-controls">${controls}</div>
      ${extra}
    `;

    grid.appendChild(card);
  });
}

function toggleDevice(id) {
  const dev = devices.find(d => d.id === id);
  if (!dev) return;
  if (dev.status === 'on') {
    dev.status = 'off';
    dev.value = 0;
  } else {
    dev.status = 'on';
    dev.value = dev.type === 'dimmer' ? 60 : 100;
  }
  render();
}

function toggleLock(id) {
  const dev = devices.find(d => d.id === id && d.type === 'lock');
  if (!dev) return;
  dev.value = dev.value === 1 ? 0 : 1;
  render();
}

function toggleGarage(id) {
  const dev = devices.find(d => d.id === id);
  if (!dev) return;
  dev.value = dev.value === 1 ? 0 : 1;
  render();
}

function dimDevice(id, value) {
  const dev = devices.find(d => d.id === id && d.type === 'dimmer');
  if (!dev) return;
  dev.value = parseInt(value);
  if (parseInt(value) > 0 && dev.status === 'off') dev.status = 'on';
  if (parseInt(value) === 0 && dev.status === 'on') dev.status = 'off';
  updateStats();
  const levelEl = document.querySelector(`.device-card[data-id="${id}"] .device-value span`);
  if (levelEl) levelEl.textContent = value + '%';
}

document.addEventListener('DOMContentLoaded', () => {
  render();

  document.getElementById('deviceGrid').addEventListener('click', e => {
    const btn = e.target.closest('.btn-control');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const action = btn.dataset.action;

    if (action === 'toggle') toggleDevice(id);
    else if (action === 'lock') toggleLock(id);
    else if (action === 'garage') toggleGarage(id);
  });

  document.getElementById('deviceGrid').addEventListener('input', e => {
    if (e.target.matches('input[type="range"]')) {
      const id = parseInt(e.target.dataset.id);
      dimDevice(id, e.target.value);
    }
  });

  document.getElementById('refreshBtn').addEventListener('click', () => {
    render();
    document.getElementById('lastUpdated').textContent = 'just now';
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      document.getElementById('viewTitle').textContent = item.textContent.trim();
    });
  });
});