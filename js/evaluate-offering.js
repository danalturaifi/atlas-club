// Offering Evaluation page

var fieldIds = ["completed-offering", "rating-group", "feedback"];

function isEmpty(text) {
  return text.search(/\S/) == -1;
}

// Mark a field in red and show a message under it
function showError(id, message) {
  document.getElementById(id).style.backgroundColor = "#fbeeee";
  var msg = document.getElementById(id + "-error");
  msg.innerHTML = message;
  msg.style.color = "red";
}

function clearErrors() {
  for (var i = 0; i < fieldIds.length; i++) {
    document.getElementById(fieldIds[i]).style.backgroundColor = "";
    document.getElementById(fieldIds[i] + "-error").innerHTML = "";
  }
}

// Returns the chosen star (1 to 5), or 0 if none is chosen
function getRating() {
  for (var i = 1; i <= 5; i++) {
    if (document.getElementById("star" + i).checked) {
      return i;
    }
  }
  return 0;
}

// Runs when the Submit button is clicked
function validateEvaluation() {
  clearErrors();
  var valid = true;

  var offering = document.getElementById("completed-offering").value;
  var rating = getRating();
  var feedback = document.getElementById("feedback").value;

  // 1) An offering must be selected
  if (offering == "") {
    showError("completed-offering", "Please select the activity you completed.");
    valid = false;
  }

  // 2) A rating must be chosen
  if (rating == 0) {
    showError("rating-group", "Please choose a rating.");
    valid = false;
  }

  // 3) Feedback must not be empty
  if (isEmpty(feedback)) {
    showError("feedback", "Please write your feedback.");
    valid = false;
  }

  // Something is missing: stop here, the missing fields are marked
  if (!valid) {
    return;
  }

  // Everything is filled: message depending on the rating, then go to the dashboard
  if (rating >= 3) {
    alert("Thank you for your great feedback! We are happy you enjoyed the experience.");
  } else {
    alert("We are sorry your experience was not good. We will use your feedback to improve.");
  }

  // Go to the member dashboard
  window.location.href = "member-dashboard.html";
}

// Connect the button to the function
document.getElementById("submit-button").onclick = validateEvaluation;
