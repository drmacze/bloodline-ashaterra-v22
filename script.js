const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const playerName = document.getElementById('playerName');
const playerId = document.getElementById('playerId');
const playerAvatar = document.getElementById('playerAvatar');
const referralCode = document.getElementById('referralCode');
const pinSection = document.getElementById('pinSection');
const pinInput = document.getElementById('pinInput');
const trialNotice = document.getElementById('trialNotice');

// Simulasi database lokal
let currentUser = null;

function login(method) {
  let name = "";
  if (method === 'google') name = "GoogleUser";
  else if (method === 'facebook') name = "FBUser";
  else if (method === 'apple') name = "AppleUser";
  else name = "GuestUser";

  currentUser = {
    name: name,
    id: "ID-" + Math.floor(Math.random() * 100000),
    avatar: pickAvatar(),
    method: method,
    referral: generateReferral(),
    pin: null,
    createdAt: new Date().toISOString()
  };

  if (method === 'guest') {
    trialNotice.classList.remove('hidden');
  } else {
    pinSection.classList.remove('hidden');
  }
}

function pickAvatar() {
  const options = ["🧙", "🧝", "🧛", "🧟", "🧞", "🧚"];
  return options[Math.floor(Math.random() * options.length)];
}

function generateReferral() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function submitPIN() {
  const pin = pinInput.value;
  if (pin.length === 6) {
    currentUser.pin = pin;
    startGame();
  } else {
    alert("PIN harus 6 digit");
  }
}

function startGame() {
  if (!currentUser) return;
  loginScreen.classList.add('hidden');
  dashboard.classList.remove('hidden');

  playerName.textContent = currentUser.name;
  playerId.textContent = currentUser.id;
  playerAvatar.textContent = currentUser.avatar;
  referralCode.textContent = currentUser.referral;
}

function logout() {
  location.reload();
}