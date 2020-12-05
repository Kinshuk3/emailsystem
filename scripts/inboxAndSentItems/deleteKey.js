/*
 * Andrew Coakley (A00398990)
 * Kinshuk Chadha (A00431288)
 * Alexander Lamey (A00410007)
 * Priya Lollmun (A00430148)
 *
 * Revised for efficiency by Priya Lollmun.
 * 
 * deleteKey.js:
 * js file that is used by the inbox and sent items screens.
 * It describes :how to delete an email,
 */

/*DELETING AN EMAIL*/

/*
 * Function that deletes an email when clicking  on the
 * delete key.
 *
 * encoding is the collection Name.
 * i is the index of the email
 * 
 */
function deleteEmail(encoding, i) {

  if (confirm("Are you sure you want to delete this email?") == true) {
    var name = getNameFromEncoding(encoding);
    $.post(
      SERVER_URL + "/deleteEmail",
      createNameIndexReq(name, i),
      runOnSuccessFulDeletion
    ).fail(alert("could not delete email"));
    reloadPage(name);
  }

  function runOnSuccessFulDeletion(data) {
    if (DEBUG) {
      alert(data.message);
    }
  }

}

/*
 * @author Priya Lollmun
 * Function that reloads the page based on the key used.
 *
 * name is the collection from which an email was deleted
 *
 * 
 * 
 */
function reloadPage(name) {
  switch (name) {
    case ADMIN_INBOX_NAME:
      window.location.href = "adminInbox.html";
      break;
    case ADMIN_SENT_ITEMS_NAME:
      window.location.href = "adminSentItems.html";
      break;
    case STUDENT_INBOX_NAME:
      window.location.href = "index.html";
      break;
    case STUDENT_SENT_ITEMS_NAME:
      window.location.href = "sentItems.html";
      break;
    default:
      alert("error")
  }
}
