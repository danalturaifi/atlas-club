
var themeBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  if (theme == "dark") {
    document.body.className = "dark-theme";
    themeBtn.innerHTML = "Light mode";
  } else {
    document.body.className = "";
    themeBtn.innerHTML = "Dark mode";
  }
}

function switchTheme() {
  var current = localStorage.getItem("atlasTheme");
  if (current == "dark") {
    localStorage.setItem("atlasTheme", "light");
    applyTheme("light");
  } else {
    localStorage.setItem("atlasTheme", "dark");
    applyTheme("dark");
  }
}

applyTheme(localStorage.getItem("atlasTheme"));
themeBtn.onclick = switchTheme;

// Mobile menu button 
var navBtn = document.getElementById("nav-toggle");
var nav = document.getElementById("main-nav");

function toggleMenu() {
  if (nav.className == "main-nav") {
    nav.className = "main-nav open";
  } else {
    nav.className = "main-nav";
  }
}
navBtn.onclick = toggleMenu;

// Back to Top button 
var topBtn = document.getElementById("back-to-top");

function checkScroll() {
  if (window.scrollY > 300) {
    topBtn.style.visibility = "visible";
  } else {
    topBtn.style.visibility = "hidden";
  }
}

window.onscroll = checkScroll;

var clockEl = document.getElementById("clock");

function twoDigits(n) {
  if (n < 10) {
    return "0" + n;
  }
  return "" + n;
}

function updateClock() {
  var now = new Date();
  var time = twoDigits(now.getHours()) + ":" + twoDigits(now.getMinutes()) + ":" + twoDigits(now.getSeconds());
  var date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  clockEl.innerHTML = date + " | " + time;
}

updateClock();
setInterval(updateClock, 1000);
