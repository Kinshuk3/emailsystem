/*
 * Andrew Coakley (A00398990)
 * Kinshuk Chadha (A00431288)
 * Alexander Lamey (A00410007)
 * Priya Lollmun (A00430148)
 * 
 * 
 * help.js:
 * js file that is used by the help screens to load the messages.
 */

/*
 * Revised by Priya Lollmun 
 * Below are the variables for each message.
 * 
 */
const BODY_MESSAGE =
  "<p>1) How should you greet the person you are emailing?<p>" +
  "<p> For example: You can use 'hello' for professors and 'hi' for family and friends.<p>" +
  "<p> It is important to know the difference between informal and formal salutations.<p>" +
  "<p>2) Do you need any questions?<p>" +
  "<p>3) Does the person you are emailing need to know any " +
  "information about you?<p>" +
  "<p>4) Example of an email:<br><br>" +
  "Hello,<br><br>" +
  "How are you doing today?<br><br>" +
  "Regards,<br><br>" +
  "(insert your own name here)";

const CC_MESSAGE =
  "<br>" + "<p>Is there anyone you need to copy on this email?<p>" + "<br>";

const FROM_MESSAGE = "<br>" + "<p>Who sent you this email?<p>";

const SUBJECT_MESSAGE =
  "<br>" +
  "<p>1) What is this email about?<p>" +
  "<br><br>" +
  "<p>2) Why are you sending this email?<p>";

const TO_MESSAGE =
  "<br>" +
  "<p>1) Who do you need to send an email to?<p>" +
  "<br><br>" +
  "<p>2) How many people do you need to send this email to?<p>";

/*
 * Function that loads the body message onto helpBody's HTML.
 *
 * no inputs
 *
 * returns N/A
 */
function loadHelpBody() {
  $("body.emailBody").append(BODY_MESSAGE);
}

/*
 * Function that loads the Cc message onto helpCc's HTML.
 *
 * no inputs
 *
 * returns N/A
 */
function loadHelpCc() {
  $("body.emailCc").append(CC_MESSAGE);
}

/*
 * Function that loads the From message onto helpFrom's HTML.
 *
 * no inputs
 *
 * returns N/A
 */
function loadHelpFrom() {
  $("body.emailFrom").html(FROM_MESSAGE);
}

/*
 * Function that loads the body message onto helpSubject's HTML.
 *
 * no inputs
 *
 * returns N/A
 */
function loadHelpSubject() {
  $("body.emailSubject").html(SUBJECT_MESSAGE);
}

/*
 * Function that loads the body message onto helpTo's HTML.
 *
 * no inputs
 *
 * returns N/A
 */
function loadHelpTo() {
  $("body.emailTo").html(TO_MESSAGE);
}
