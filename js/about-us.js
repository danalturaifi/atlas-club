// About Us page: "Join Our Team" form validation.

var fieldIds = ["name", "photo", "dob", "email", "expertise", "skills", "education"];

// A value is empty if it has no character other than spaces
function isEmpty(text) {
  return text.search(/\S/) == -1;
}

// Show an error message under a field and mark the field in red
function showError(id, message) {
  document.getElementById(id).style.backgroundColor = "#fbeeee";
  var msg = document.getElementById(id + "-error");
  msg.innerHTML = message;
  msg.style.color = "red";
}

// Remove the old errors before checking again
function clearErrors() {
  for (var i = 0; i < fieldIds.length; i++) {
    document.getElementById(fieldIds[i]).style.backgroundColor = "";
    document.getElementById(fieldIds[i] + "-error").innerHTML = "";
  }
}

// Empty all the fields after a successful submit
function clearForm() {
  for (var i = 0; i < fieldIds.length; i++) {
    document.getElementById(fieldIds[i]).value = "";
  }
}

// Runs when the Submit button is clicked
function validateJoinForm() {
  clearErrors();
  var valid = true;

  var name = document.getElementById("name").value;
  var photo = document.getElementById("photo").value;   // the file name
  var dob = document.getElementById("dob").value;       // format: YYYY-MM-DD
  var email = document.getElementById("email").value;
  var expertise = document.getElementById("expertise").value;
  var skills = document.getElementById("skills").value;
  var education = document.getElementById("education").value;

  // 1) Name: not empty, and must not start with a number
  if (isEmpty(name)) {
    showError("name", "Please enter your name.");
    valid = false;
  } else if (name.search(/^\s*[0-9]/) != -1) {
    showError("name", "Name cannot start with a number.");
    valid = false;
  }

  // 2) Photo: not empty, and the file name must end with an image extension
  if (photo == "") {
    showError("photo", "Please upload your photo.");
    valid = false;
  } else if (photo.search(/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i) == -1) {
    showError("photo", "Only image files are allowed.");
    valid = false;
  }

  // 3) Date of birth: not empty, and the year must be 2008 or less
  if (dob == "") {
    showError("dob", "Please enter your date of birth.");
    valid = false;
  } else if (parseInt(dob.substring(0, 4)) > 2008) {
    showError("dob", "Date of birth must be in 2008 or earlier.");
    valid = false;
  }

  // 4) The other fields: not empty
  if (isEmpty(email)) {
    showError("email", "Please enter your email.");
    valid = false;
  }
  if (isEmpty(expertise)) {
    showError("expertise", "Please enter your area of expertise.");
    valid = false;
  }
  if (isEmpty(skills)) {
    showError("skills", "Please enter your skills.");
    valid = false;
  }
  if (isEmpty(education)) {
    showError("education", "Please enter your education.");
    valid = false;
  }

  // Everything is correct: alert with the applicant name, then clear the form
  if (valid) {
    alert("Thank you, " + name + "! Your application to join our team was submitted successfully.");
    clearForm();
  }
}

// Connect the button to the function
document.getElementById("submit-button").onclick = validateJoinForm;
