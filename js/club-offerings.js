// Club Offerings page: random order at first, then sorting by price or name.

var list = document.getElementsByClassName("home-offerings")[0];

// Step 1: collect the offering cards into an array
var cardElements = list.getElementsByClassName("offering-card");
var cards = [];
for (var i = 0; i < cardElements.length; i++) {
  cards.push(cardElements[i]);
}

// Step 2: read the name and the price of a card
function getName(card) {
  return card.getElementsByTagName("h3")[0].innerHTML;
}

function getPrice(card) {
  var priceText = card.getElementsByTagName("strong")[0].innerHTML;   // e.g. "Price: 30 SAR"
  return parseFloat(priceText.replace(/[^0-9.]/g, ""));              // keep only the number
}

// Step 3: show the cards in the order of the array
function showCards(orderedCards) {
  for (var i = 0; i < orderedCards.length; i++) {
    list.appendChild(orderedCards[i]);
  }
}

// Step 4: random order (swap each card with a random one)
function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// Step 5: should card a and card b swap places? (true = swap)
function mustSwap(a, b, choice) {
  if (choice == "price-asc") {
    return getPrice(a) > getPrice(b);
  } else if (choice == "price-desc") {
    return getPrice(a) < getPrice(b);
  } else if (choice == "name-asc") {
    return getName(a).toLowerCase() > getName(b).toLowerCase();
  } else if (choice == "name-desc") {
    return getName(a).toLowerCase() < getName(b).toLowerCase();
  }
  return false;
}

// Step 6: sort with two loops (swap neighbors until the order is right)
function sortCards(arr, choice) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (mustSwap(arr[j], arr[j + 1], choice)) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Step 7: runs when the Sort button is clicked
function sortOfferings() {
  var choice = document.getElementById("sort").value;
  var sorted = cards.slice();   // copy of the array
  sortCards(sorted, choice);
  showCards(sorted);
}

// Run: random order when the page loads, then connect the button
showCards(shuffle(cards.slice()));
document.getElementById("sort-button").onclick = sortOfferings;
