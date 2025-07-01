let selectedAvatar = "🧙";

document.querySelectorAll(".avatar").forEach((el) => {
  if (!el.classList.contains("locked")) {
    el.addEventListener("click", () => {
      document.querySelectorAll(".avatar").forEach((a) => a.classList.remove("selected"));
      el.classList.add("selected");
      selectedAvatar = el.innerText;
    });
  }
});

function login(method) {
  const name = document.getElementById("username").value.trim();
  const pin = document.getElementById("pin").value.trim();

  if (!name || pin.length < 6) {
    alert("Nama dan PIN 6 digit wajib diisi!");
    return;
  }

  const player = {
    name,
    avatar: selectedAvatar,
    pin,
    id: "ID" + Math.floor(Math.random() * 999999),
    status: method === "guest" ? "Trial (1 hari)" : "Aktif"
  };

  localStorage.setItem("player", JSON.stringify(player));
  showDashboard(player);
}

function showDashboard(player) {
  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("dashboard").classList.add("active");

  document.getElementById("player-name").innerText = player.name;
  document.getElementById("player-avatar").innerText = player.avatar;
  document.getElementById("player-id").innerText = player.id;
  document.getElementById("player-status").innerText = player.status;
}

function logout() {
  localStorage.removeItem("player");
  location.reload();
}

window.onload = function () {
  const player = JSON.parse(localStorage.getItem("player"));
  if (player) showDashboard(player);
};