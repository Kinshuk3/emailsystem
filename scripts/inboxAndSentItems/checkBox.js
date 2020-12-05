/*
 * Andrew Coakley (A00398990)
 * Kinshuk Chadha (A00431288)
 * Alexander Lamey (A00410007)
 * Priya Lollmun (A00430148)
 *
 * Revised by Priya Lollmun
 * 
 * CheckBox.js:
 * js file that is used by the inbox and sent items screens.
 * It describes what happens when the check box is clicked
 */

/*
 * Function read when checkbox is clicked.
 *
 * i is the index of the email.
 * encoding = encoding for the collection name.
 *
 * returns N/A
 */
function clickCheckBox(i, encoding) {
  $.post(
    SERVER_URL + "/clickCheckBox",
    createNameIndexReq(getNameFromEncoding(encoding), i),
    runOnCheckBoxSuccess
  ).fail(runOnCheckBoxError);

  /*
 * @author Priya Lollmun
 * Function that checks if the checkox has been ran successfully.
 *
 * 
 */
  function runOnCheckBoxSuccess(data) {
    if (DEBUG) alert(data.message);
  }
  /*
   *@author Priya Lollmun
   * 
   Function that alerts the user when there is a server error.
   *
   * err is the error message
   * 
   * 
   */
  function runOnCheckBoxError(err) {
    alert("Server error in clicking checkbox");
  }
}
