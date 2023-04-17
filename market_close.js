const now = new Date();
const weekday = now.getDay(); // 0 (Sunday) to 6 (Saturday)
const hour = now.getUTCHours();

// Forex market trading hours are from Sunday 5pm to Friday 5pm EST
if (weekday === 0) { // Sunday
  if (hour < 17) {
    console.log("Market is closed");
  }
} else {
  if (hour >= 21) { // 5pm EST = 9pm UTC
    console.log("Market is closed");
  }
}
