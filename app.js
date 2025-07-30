let timerInterval;
let totalDuration = 0, elapsed = 0, phase = 'brisk', running = false;

const status = document.getElementById("status");
const timer = document.getElementById("timer");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 3000);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function playSound() {
  const audio = new Audio('sounds/notify.mp3');
  audio.play();
}

function vibrate() {
  if (navigator.vibrate) navigator.vibrate(500);
}

function updatePhase() {
  phase = (phase === 'brisk') ? 'slow' : 'brisk';
  const message = phase === 'brisk' ? "Start Brisk Walking!" : "Slow Down";
  showToast(message);
  playSound();
  vibrate();
}

document.getElementById("startBtn").onclick = () => {
  if (running) return;
  running = true;
  totalDuration = parseInt(document.getElementById("duration").value) * 60;
  elapsed = 0;
  phase = 'brisk';
  showToast("Brisk Walking Started");
  timerInterval = setInterval(() => {
    elapsed++;
    timer.textContent = formatTime(elapsed);
    if (elapsed % 180 === 0) updatePhase();
    if (elapsed >= totalDuration) document.getElementById("stopBtn").click();
  }, 1000);
  status.textContent = "Status: Walking";
};

document.getElementById("stopBtn").onclick = () => {
  if (!running) return;
  running = false;
  clearInterval(timerInterval);
  status.textContent = "Status: Stopped";
  showToast("Brisk Walking Stopped");
  // dummy graph drawing
  const ctx = document.getElementById("graph").getContext("2d");
  ctx.clearRect(0, 0, 400, 200);
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(0, 150, elapsed * 400 / totalDuration, 50);
};
