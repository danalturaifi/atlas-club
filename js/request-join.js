// Request to Join an Offering page (3.4)
// Uses only what we took in lectures: DOM access, onclick, alert/confirm, RegEx string methods, localStorage

// Offerings published by the manager are saved here by js/manager-phase3.js
var MANAGER_OFFERINGS_KEY = "atlas_manager_offerings";

// A full name must have at least this many words (2 = first + family name, 3 = triple name)
var MIN_NAME_WORDS = 2;

// The offerings of the club-offerings page (name + price in SAR)
var offerings = [
  { id: "first-story", name: "The First Story", price: 0 },
  { id: "fables-nile", name: "Fables of the Nile", price: 30 },
  { id: "hero-path", name: "The Hero's Path", price: 30 },
  { id: "desert-stories", name: "Stories of the Desert", price: 0 },
  { id: "gardens-persia", name: "Gardens of Persia", price: 40 },
  { id: "house-wisdom", name: "Minds of the House of Wisdom", price: 50 },
  { id: "silk-road", name: "Trade Along the Silk Road", price: 25 }
];

// Temporary requests of this visit. They live only in this array,
// so they disappear as soon as the member leaves the page.
var tempRequests = [];

function twoDigits(n) {
  if (n < 10) {
    return "0" + n;
  }
  return "" + n;
}

// Date object -> "YYYY-MM-DD" (the same format the date input gives)
function toDateText(date) {
  return date.getFullYear() + "-" + twoDigits(date.getMonth() + 1) + "-" + twoDigits(date.getDate());
}

// "YYYY-MM-DD" -> "DD/MM/YYYY"
function formatDate(dateText) {
  var parts = dateText.split("-");
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}

// Remove the spaces at the start and the end, and keep one space between the words
function cleanName(text) {
  return text.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
}

// Stops the text from being read as HTML
function safeText(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function costText(price) {
  if (price == 0) {
    return "Free";
  }
  return price + " SAR";
}

// ---------- Fill the select: club offerings + offerings added by the manager ----------
function loadManagerOfferings() {
  var saved = JSON.parse(localStorage.getItem(MANAGER_OFFERINGS_KEY));
  if (saved == null) {
    return;
  }
  for (var i = 0; i < saved.length; i++) {
    offerings.push({ id: "manager-" + saved[i].id, name: saved[i].name, price: parseFloat(saved[i].price) });
  }
}

function fillSelect() {
  var select = document.getElementById("activity");
  for (var i = 0; i < offerings.length; i++) {
    select.innerHTML += '<option value="' + offerings[i].id + '">' + safeText(offerings[i].name) + " (" + costText(offerings[i].price) + ")</option>";
  }
}

function findOffering(id) {
  for (var i = 0; i < offerings.length; i++) {
    if (offerings[i].id == id) {
      return offerings[i];
    }
  }
  return null;
}

// ---------- Validation: returns a list with exactly what is wrong ----------
function validateRequest(offeringId, fullName, dateText) {
  var errors = [];

  // 1) an offering must be selected
  if (offeringId == "") {
    errors.push("- Select an offering.");
  }

  // 2) full name: not empty, no numbers, no special characters, at least 2 names
  if (fullName == "") {
    errors.push("- Enter your full name.");
  } else {
    if (fullName.search(/[0-9٠-٩]/) != -1) {
      errors.push("- The name must not contain numbers.");
    }
    if (fullName.search(/[^A-Za-zء-ي0-9٠-٩ ]/) != -1) {
      errors.push("- The name must not contain special characters (like ? ! @ # . , -).");
    }
    if (fullName.split(" ").length < MIN_NAME_WORDS) {
      errors.push("- Enter your full name (at least " + MIN_NAME_WORDS + " names, e.g. Sara Fahad).");
    }
  }

  // 3) date: not empty, and after today (YYYY-MM-DD texts can be compared directly)
  if (dateText == "") {
    errors.push("- Choose a preferred date.");
  } else if (dateText <= toDateText(new Date())) {
    errors.push("- The preferred date must be in the future (after today).");
  }

  return errors;
}

// ---------- Show the requests of this visit in the table ----------
function showTempRequests() {
  var body = document.getElementById("session-requests-body");
  body.innerHTML = "";
  for (var i = 0; i < tempRequests.length; i++) {
    var r = tempRequests[i];
    body.innerHTML += "<tr><td>" + safeText(r.offering) + "</td><td>" + safeText(r.fullName) + "</td><td>" +
      r.preferredDate + "</td><td>" + r.cost + '</td><td><span class="status status-pending">Pending</span></td></tr>';
  }
  if (tempRequests.length > 0) {
    document.getElementById("session-requests").style.display = "block";
  } else {
    document.getElementById("session-requests").style.display = "none";
  }
}

function clearForm() {
  document.getElementById("activity").value = "";
  document.getElementById("full-name").value = "";
  document.getElementById("preferred-date").value = "";
}

// Runs when the Submit button is clicked
function submitRequest() {
  var offeringId = document.getElementById("activity").value;
  var fullName = cleanName(document.getElementById("full-name").value);
  var dateText = document.getElementById("preferred-date").value;

  var errors = validateRequest(offeringId, fullName, dateText);
  if (errors.length > 0) {
    alert("Please correct the following:\n\n" + errors.join("\n"));
    return;
  }

  // The data is valid: keep the request as a temporary one
  var offering = findOffering(offeringId);
  tempRequests.push({
    offering: offering.name,
    fullName: fullName,
    preferredDate: formatDate(dateText),
    cost: costText(offering.price)
  });

  // Confirmation window: OK = stay, Cancel = go back to the dashboard
  var stay = confirm(
    "Your request to join \"" + offering.name + "\" was submitted successfully.\n\n" +
    "Press OK to stay on this page and add another request.\n" +
    "Press Cancel to go back to the Dashboard."
  );

  if (stay) {
    // Show all the requests of this visit and allow a new one
    clearForm();
    showTempRequests();
  } else {
    // Leave: the temporary requests are cleared, the stored ones stay as they are
    tempRequests = [];
    window.location.href = "member-dashboard.html";
  }
}

// ---------- Start ----------
loadManagerOfferings();
fillSelect();

// The earliest date is tomorrow (a day is 24 * 60 * 60 * 1000 milliseconds)
var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
document.getElementById("preferred-date").min = toDateText(tomorrow);

document.getElementById("submit-button").onclick = submitRequest;
