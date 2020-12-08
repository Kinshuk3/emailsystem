/*
 * Responsible for these inherited files: Andrew Coakley (A00398990)
 *
 * CheckBox.js:
 * This is a javascript file that is used by the inbox and sent items screens.
 * It describes what happens when the check box is clicked
 */

/*
 * Function read when checkbox is clicked.
 *
 * i = index of the email.
 * encoding = encoding for the collection name.
 *
 * returns N/A
 */
function clickCheckBox(i, encoding) {
  var name = getNameFromEncoding(encoding);
  $.post(
    SERVER_URL + "/clickCheckBox",
    createNameIndexReq(name, i),
    runOnCheckBoxSuccess
  ).fail(runOnCheckBoxError);

  function runOnCheckBoxSuccess(data) {
    if (DEBUG) alert(data.message);
  }

  function runOnCheckBoxError(err) {
    alert("Server error in clicking checkbox");
  }
}
