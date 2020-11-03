/*
 * Andrew Coakley (A00398990)
 * Kinshuk Chadha (A00431288)
 * Alexander Lamey (A00410007)
 * Priya Lollmun (A00430148)
 *
 * generalHelperMethods.js:
 * js file that is used by the student screens to add miscellaneous features. Contains functionss for the
 * theme button, the checkboxes at the bottom of the student compose screens, and for the initial login screen.
 *
 */

// variable used to represent the number of times a user click on the theme button
var numberOfClicks = 1;

/* Andrew Coakley (A00398990)
 *
 * This method is used to change the background color upon clicking the theme button.
 *
 * no inputs
 *
 * Returns: N/A
 */
function changeBackground() {
  if (numberOfClicks % 5 == 1) {
    document.body.style.background = "white";
  } else if (numberOfClicks % 5 == 2) {
    document.body.style.background = "lightSalmon";
  } else if (numberOfClicks % 5 == 3) {
    document.body.style.background = "mediumSeaGreen";
  } else if (numberOfClicks % 5 == 4) {
    document.body.style.background = "plum";
  } else {
    document.body.style.background = "powderBlue";
  }
  numberOfClicks++;
}

/* Andrew Coakley (A00398990)
 *
 * This method is used to change make the text "you're ready to send" appear
 * once all four checkboxes at the bottom of the screen have been checked.
 *
 * no inputs
 *
 * Returns: N/A
 */
function isChecked() {
  var chb = document.getElementsByClassName("chb");

  if (chb[0].checked && chb[1].checked && chb[2].checked) {
    document.getElementById("readyMessage").innerHTML =
      "You're ready to send :)";
  }
}

// a variables to keep track of what the user's name and password
var userName = "";
var password = "";

// a boolean to keep track of whether of not the user is logged in
var loggedIn = false;

/*
 * Andrew Coakley (A00398990)
 *
 * This method is used to create the initial login screen feature.
 *
 * no inputs
 *
 * Returns: N/A
 */
function loginScreen() {
  if (loggedIn == false) {
    userName = prompt("What's your name? :)");
    while (userName != password) {
      password = prompt("Enter your password (same as username)");
    }
  }
  loggedIn = true;
}
