// Club Member Dashboard page (3.3)
// Adds the requests that are stored in localStorage after the sample rows of the HTML.
// Each request looks like: { offering: "Gardens of Persia", requestDate: "01/11/2026", cost: "40 SAR", status: "Pending" }

var STORED_REQUESTS_KEY = "atlas_member_requests";

// Stops the text from being read as HTML
function safeText(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// The CSS class that gives the status its look
function statusClass(status) {
  if (status == "Completed") {
    return "status-completed";
  } else if (status == "Declined") {
    return "status-declined";
  }
  return "status-pending";
}

function showStoredRequests() {
  var requests = JSON.parse(localStorage.getItem(STORED_REQUESTS_KEY));
  if (requests == null) {
    return;
  }
  var body = document.getElementById("member-requests-body");
  for (var i = 0; i < requests.length; i++) {
    var r = requests[i];
    body.innerHTML += "<tr><td>" + safeText(r.offering) + "</td><td>" + safeText(r.requestDate) + "</td><td>" +
      safeText(r.cost) + '</td><td><span class="status ' + statusClass(r.status) + '">' + safeText(r.status) + "</span></td></tr>";
  }
}

showStoredRequests();
