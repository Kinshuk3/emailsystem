/*
 * Andrew Coakley (A00398990)
 * Kinshuk Chadha (A00431288)
 * Alexander Lamey (A00410007)
 * Priya Lollmun (A00430148)
 *
 * Revised by Priya Lollmun
 * 
 * settingUpToViewEmail.js
 * js file for when the user click on an email.
 * It sets up to link the viewSent or viewInbox.html
 */

/*
 * The function that is called when the user wants to view an email.
 * It takes the index and the encoding, sets up a JSON and links to the
 * appropriate page.
 *
 * i is theindex of the email
 * encoding is the key that is displayed on the screen.
 * 
 */
function viewEmail(i, encoding) {
  try {
    var name = getNameFromEncoding(encoding);
    var json = {
      collectionName: name,
      index: i,
      fromWhere: getFromWhere(name),
    };
    localStorage.setItem("emailToView", JSON.stringify(json));
    linkToCorrectViewPage(name);
  } catch (e) {
    alert(e.name + "\n" + e.message);
  }
}

/*
 * @author Priya Lollmun
 *
 * Function used to get the fromWhere for a collection name that
 * is required to allow users to reply to an email.
 *
 * 
 * name is collection where the email the student wants to see
 * is.
 * 
 * returns an integer representing the fromWhere.
 * 
 */
function getFromWhere(name) {
  switch (name) {
    case STUDENT_INBOX_NAME:
      return FROM_STUDENT_INBOX;
    case STUDENT_SENT_ITEMS_NAME:
      return FROM_STUDENT_SENT_ITEMS;;
    case ADMIN_INBOX_NAME:
      return FROM_ADMIN_INBOX
    case ADMIN_SENT_ITEMS_NAME:
      return FROM_ADMIN_SENT_ITEMS;
    default:
      alert("AN ISSUE OCCURED IN getFromWhere().");
  }
}

/*
 * @author Priya Lollmun
 *
 * Function that links to the student's or admin's viewInbox or viewSent page
 * based on what email is clicked.
 *
 * 
 * name is the collection where the email the student wants to see
 * is.
 *
 * returns N/A
 */
function linkToCorrectViewPage(name) {
  switch (name) {
    case STUDENT_SENT_ITEMS_NAME:
      window.location.href = "viewSent.html";
    case ADMIN_SENT_ITEMS_NAME:
      window.location.href = "viewSentAdmin.html";
    case ADMIN_INBOX_NAME:
      window.location.href = "viewInboxAdmin.html";
    case STUDENT_INBOX_NAME:
      window.location.href = "viewInbox.html";
    default:
      alert("Error");
  }

}
