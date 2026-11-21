// ATLAS - Club Manager pages (Phase 3)
// 3.6 Manager Dashboard, 3.7 Add a New Offering, 3.8 Manage Activity Leaders
// Uses only what we took in lectures: DOM access, onclick, alert/confirm, RegEx string methods, localStorage + JSON

var OFFERINGS_KEY = "atlas_manager_offerings";

// ---------- Helpers shared by the three pages ----------

// Remove the spaces at the start and the end of a text
function trimText(text) {
  return text.replace(/^\s+|\s+$/g, "");
}

// Stops the text from being read as HTML
function safeText(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function twoDigits(n) {
  if (n < 10) {
    return "0" + n;
  }
  return "" + n;
}

// Today as "YYYY-MM-DD" (the same format the date input gives)
function todayText() {
  var now = new Date();
  return now.getFullYear() + "-" + twoDigits(now.getMonth() + 1) + "-" + twoDigits(now.getDate());
}

// The file name of a file input must end with an image extension
function isImageName(fileName) {
  return fileName.search(/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i) != -1;
}

// Offerings saved by the manager (an array of objects in localStorage)
function readOfferings() {
  var saved = JSON.parse(localStorage.getItem(OFFERINGS_KEY));
  if (saved == null) {
    return [];
  }
  return saved;
}

// =====================================================
// 3.7 ADD A NEW OFFERING PAGE
// =====================================================
function addOffering() {
  var name = trimText(document.getElementById("offering-name").value);
  var image = document.getElementById("offering-image").value;   // the file name
  var priceText = trimText(document.getElementById("offering-price").value);
  var description = trimText(document.getElementById("offering-description").value);
  var errors = [];

  // Rules: the name cannot start with a number, the price must be a non-negative number,
  // the image must be an image file, the description cannot be empty
  if (name == "") {
    errors.push("Enter the activity name.");
  } else if (name.search(/^[0-9]/) != -1) {
    errors.push("Activity name cannot start with a number.");
  }

  if (image == "") {
    errors.push("Choose an activity image.");
  } else if (!isImageName(image)) {
    errors.push("The selected file must be an image.");
  }

  if (priceText == "") {
    errors.push("Enter the activity price (0 if free).");
  } else if (priceText.search(/^[0-9]+(\.[0-9]+)?$/) == -1) {
    errors.push("Price must be a valid non-negative number.");
  }

  if (description == "") {
    errors.push("Enter an activity description.");
  }

  if (errors.length > 0) {
    alert("Please correct the following:\n\n" + errors.join("\n"));
    return;
  }

  // Save the new offering with the old ones (only the image file name is saved)
  var offerings = readOfferings();
  offerings.push({
    id: "" + new Date().getTime() + "-" + offerings.length,
    name: name,
    price: parseFloat(priceText),
    description: description,
    imageName: image,
    status: "Published"
  });
  localStorage.setItem(OFFERINGS_KEY, JSON.stringify(offerings));

  alert('Activity "' + name + '" was added successfully!');
  document.getElementById("offering-name").value = "";
  document.getElementById("offering-image").value = "";
  document.getElementById("offering-price").value = "";
  document.getElementById("offering-description").value = "";
}

if (document.getElementById("add-offering-button")) {
  document.getElementById("add-offering-button").onclick = addOffering;
}

// =====================================================
// 3.6 CLUB MANAGER DASHBOARD PAGE
// (shows the offerings saved by the manager, after the sample rows of the HTML)
// =====================================================
var managerTable = document.getElementById("manager-table-body");

if (managerTable) {
  var savedOfferings = readOfferings();
  for (var i = 0; i < savedOfferings.length; i++) {
    var priceLabel = savedOfferings[i].price + " SAR";
    if (savedOfferings[i].price == 0) {
      priceLabel = "0 SAR (Free)";
    }
    managerTable.innerHTML += "<tr><td>" + safeText(savedOfferings[i].name) + "</td><td>" + priceLabel +
      '</td><td><span class="status status-published">Published</span></td></tr>';
  }
}

// =====================================================
// 3.8 MANAGE ACTIVITY LEADERS PAGE
// (an editable array of leader objects; it starts with the six leaders of the About Us page)
// =====================================================
var teamList = document.getElementById("team-list");

if (teamList) {
  var leaders = [
    { id: "leader-1", name: "Dr. Layla Haddad", expertise: "Mesopotamia", photo: "images/leader-1.svg" },
    { id: "leader-2", name: "Rania Mansour", expertise: "Ancient Egypt", photo: "images/leader-2.svg" },
    { id: "leader-3", name: "Khalid Al-Shehri", expertise: "Ancient Arabia", photo: "images/leader-3.svg" },
    { id: "leader-4", name: "Dr. Yasmin Farahani", expertise: "Persia", photo: "images/leader-4.svg" },
    { id: "leader-5", name: "Tariq Al-Ghamdi", expertise: "Islamic Golden Age", photo: "images/leader-5.svg" },
    { id: "leader-6", name: "Mei Lin Zhao", expertise: "Silk Road", photo: "images/leader-6.svg" }
  ];
  var newLeaderCount = 0;

  // Draw the whole list again from the array
  function showLeaders() {
    teamList.innerHTML = "";
    for (var i = 0; i < leaders.length; i++) {
      var l = leaders[i];
      teamList.innerHTML += '<li><img src="' + l.photo + '" alt="Photo of ' + safeText(l.name) + '">' +
        '<span class="member-info">' + safeText(l.name) + "<span>" + safeText(l.expertise) + "</span></span>" +
        '<label><input type="checkbox" name="delete_leader" value="' + l.id + '"> Select</label></li>';
    }
  }

  // Is this id in the list of selected ids?
  function isSelected(selected, id) {
    for (var i = 0; i < selected.length; i++) {
      if (selected[i] == id) {
        return true;
      }
    }
    return false;
  }

  // Runs when the Delete Selected button is clicked
  function deleteLeaders() {
    var boxes = document.querySelectorAll('input[name="delete_leader"]');
    var selected = [];
    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        selected.push(boxes[i].value);
      }
    }

    if (selected.length == 0) {
      alert("Please select at least one leader or instructor to delete.");
      return;
    }
    if (!confirm("Are you sure you want to delete the selected leaders/instructors?")) {
      return;
    }

    var remaining = [];
    for (var j = 0; j < leaders.length; j++) {
      if (!isSelected(selected, leaders[j].id)) {
        remaining.push(leaders[j]);
      }
    }
    leaders = remaining;
    showLeaders();
  }

  // Runs when the Add button is clicked
  function addLeader() {
    var name = trimText(document.getElementById("leader-name").value);
    var photo = document.getElementById("leader-photo").value;   // the file name
    var birthDate = document.getElementById("leader-dob").value;   // YYYY-MM-DD
    var email = trimText(document.getElementById("leader-email").value);
    var expertise = trimText(document.getElementById("leader-expertise").value);
    var skills = trimText(document.getElementById("leader-skills").value);
    var education = trimText(document.getElementById("leader-education").value);
    var errors = [];

    // Name: not empty, does not start with a number, letters only
    if (name == "") {
      errors.push("Enter the leader's name.");
    } else if (name.search(/^[0-9]/) != -1) {
      errors.push("Name cannot start with a number.");
    } else if (name.search(/[^A-Za-zء-ي .'-]/) != -1) {
      errors.push("Name must contain letters only.");
    }

    // Photo: not empty and an image file
    if (photo == "") {
      errors.push("Choose a leader photo.");
    } else if (!isImageName(photo)) {
      errors.push("Photo must be an image file.");
    }

    // Date of birth: not empty and not in the future
    if (birthDate == "") {
      errors.push("Enter the date of birth.");
    } else if (birthDate > todayText()) {
      errors.push("Enter a valid date of birth (not in the future).");
    }

    // Email: not empty and written like name@site.com
    if (email == "") {
      errors.push("Enter the email address.");
    } else if (email.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == -1) {
      errors.push("Enter a valid email address.");
    }

    if (expertise == "") {
      errors.push("Enter the area of expertise.");
    }
    if (skills == "") {
      errors.push("Enter the skills.");
    }
    if (education == "") {
      errors.push("Enter the education.");
    }

    if (errors.length > 0) {
      alert("Please correct the following:\n\n" + errors.join("\n"));
      return;
    }

    // The chosen photo cannot be read without more tools, so a placeholder picture is shown
    newLeaderCount = newLeaderCount + 1;
    leaders.push({
      id: "new-leader-" + newLeaderCount,
      name: name,
      expertise: expertise,
      photo: "images/leader-placeholder.svg",
      birthDate: birthDate,
      email: email,
      skills: skills,
      education: education
    });
    showLeaders();

    document.getElementById("leader-name").value = "";
    document.getElementById("leader-photo").value = "";
    document.getElementById("leader-dob").value = "";
    document.getElementById("leader-email").value = "";
    document.getElementById("leader-expertise").value = "";
    document.getElementById("leader-skills").value = "";
    document.getElementById("leader-education").value = "";
    alert('Leader/instructor "' + name + '" was added successfully!');
  }

  document.getElementById("delete-button").onclick = deleteLeaders;
  document.getElementById("add-leader-button").onclick = addLeader;
  showLeaders();
}
