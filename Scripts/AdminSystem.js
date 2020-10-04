/*
*JS File doing all the requirements for P3
*
*@author Priya Lollmun, Narmeen Fatimah Oozeer, Kreetish Venkataswami
*A00430148, A00439194, A00422814
*/
/*global array containing studentSent emails*/
//var studentSentEmails = [];

/*
*Using mongo
*/
var SERVER_URL = "http://140.184.230.209:3007";
/*
*Global arrays to be stored in local storage later
*/
var to = ["Student1", "Student2", "student3"];
var from= ["Terry Goldsmith (Terence Goldsmith@smu.ca)", "Terry(Terry@humanisticsystems.ca)","Charli(Charli@autismns.ca)","Chrystal(Chrystal@autismns.ca)"]
var cc= from.concat(to);
function loadOptions(){
	loadAdminTo();
	loadAdminFrom();
	loadAdminCc();
	checkCapacity();
	
}
/*
* Function to check the number of emails present
*/
function checkCapacity(){

		   var constructJSON = {
			   "inbox":"studentInbox",
			   "sent":"adminSent",
		   };
		   $.post(SERVER_URL + '/checkCapacity',constructJSON, findCapacity).fail(errorCallback);	
				
		   function findCapacity(capacity) {
			 if(!capacity.inboxSpace){
				 alert("Recipient's inbox is full");
				 window.history.back();
			 }
		     else if(!capacity.sentSpace){
				alert("Your sent items is full.");
				window.history.back();
			  }
		   }
		   function errorCallback (err) {
			  console.log(err.responseText);
		   } 
}

/*
* Function to load To for Admin
*/
function loadAdminTo(){
var str= '';
for (var i=0; i < to.length;++i){
str += '<option value="'+to[i]+'" /><br/>'; // Storing options in variable
}
$("#tolist").append(str);
}

/*
* Function to load From for Admin
*/
function loadAdminFrom(){
var str= '';
for (var i=0; i < from.length;++i){
str += '<option value="'+from[i]+'" />'; // Storing options in variable
}
$("#fromlist").append(str);
}

/*
* Funtion to load Cc for Admin
*/
function loadAdminCc(){
var str= '';
for (var i=0; i < cc.length;++i){
str += '<option value="'+cc[i]+'" />'; // Storing options in variable
}
$("#cclist").append(str);
}

/*
* Function to link to admincompose.html
*/
function linkToCompose() {
    window.location.href="admincompose.html";
}
/*
 * 5 functions to alert the user about the purpose 
 * of each page on the Admin side
 */
function showHelpAdminIndex(){
	alert("The purpose of this page is to view the Inbox");
}
function showHelpAdminCompose(){
	alert("The purpose of this page is to compose an email");
}
function showHelpAdminSentItems(){
	alert("The purpose of this page is to view the Sent Items");
}
function showHelpAdminViewInbox(){
	alert("The purpose of this page is to view one Inbox Item");
}
function showHelpAdminViewSentItems(){
	alert("The purpose of this page is to view one Sent Item");
}

/*
*This function allows the Admin to confirm cancellation before cancelling an email
*/
function confirmCancellation(){
	var answer = confirm("Are you sure you want to cancel?");
	if(answer == true){
	linkToIndex();
	}
}
/*
*This function links to adminIndex.html
*/
function linkToIndex() {
    window.location.href="adminIndex.html";
}
/*
*This function links to studentSentitems.html
*/
function linkToSentItems() {
    window.location.href="adminsentitems.html";
}

/*
*This function displays the Inbox Items of Admin
*/
function displayAdminInboxItems(){
	var inboxItems=document.getElementById("inboxItems");
	var JSONObject = {"name":"adminInbox"};
	$.post(SERVER_URL + '/displayAllEmails',JSONObject, grabTheArray).fail(errorCallback);	
    function grabTheArray(foundArray){
                console.log(foundArray);
		var adminInboxEmails =foundArray.emails;
		if(adminInboxEmails.length!= 0)
		{
			inboxItems.innerHTML = "";
			for (i = 0; i < adminInboxEmails.length; i++)
			{
				var from = "Student";
				var subject = adminInboxEmails[i].subject;
				var unread ="";
				if(adminInboxEmails[i].read){
				 unread = "unread";
				}
			
				var flag = "";
				if (!adminInboxEmails[i].checked)
				{
			        flag = "checked";
				}
	
				var unit_email = '<div class="highlight btn"><a data-role="button" class="btn highlight mybtnpoint" onclick="inboxItemsPage('
					+ i
					+ ')"><span class="' + unread +' highlight">'
					+ from
					+ '</span></a>'
					+ '<a data-role="button" class="highlight btn mybtnpoint" onclick="inboxItemsPage('
					+ i
					+ ')"><span class="' + unread +' highlight">'
					+ '&nbsp' +subject
					+ '</span></a></div>'
					+'<input type="checkbox" onclick="saveCheckboxVal(' + i + ')"' + flag + ' >'
					+ '<a data-role="button" onclick="deleteEmailFromInboxItems('
					+ i
					+ ')"><span id="cross">'
					+ '&nbsp; &times; &nbsp;' 
					+'</span></a><br>';
				inboxItems.insertAdjacentHTML('beforeend', unit_email);
			}
		}
	}
	function errorCallback(err){
		console.log(err.responseText);
	}
}

/*
*This function links to viewInboxItems.html
*
*/
function inboxItemsPage(i) {
	localStorage.setItem("index", i);
	window.location.href="adminviewInbox.html";
	
}
/*
*This function links to viewSentItems.html
*/
function sentItemsPage(i) {

	localStorage.setItem("index", i);
        window.location.href="adminviewSentItems.html";
	
	
}

/*
*This function prints the contents of 
*email typed by the user in JSON format
*to the console.
*It makes sure to ask the user for confirmation first .
*It also sends contents to the sent items page and view 
*/
function send(){

		if ($("#from").val() !== ""){
		
			var answer = confirm('1) Is everything spelled correctly?\n\n2) Did you use full sentences?\n\n3) Is the email '
			   + "addressed to the correct person?\n\n4) Did you sign your name at the end of the email?");
				  if(answer == true){
	        
			var email = { 
			   to: ($("#to").val()),
			   from: ($("#from").val()),
			   cc: ($("#cc").val()),
			   subject: ($("#sb").val()),
			   emailText: ($("#myTextArea").val()),
                           checked:false,
			   read:true,
		
			};
			var toStore = {
				"name":"adminSent",
				"newEmail":email
			}
			var toStore1 = {
				"name":"studentInbox",
				"newEmail":email
			}
			$.post(SERVER_URL + '/addToSent',toStore, insertCallback).fail(errorCallback);	
            
             function insertCallback(data) {
			   console.log('function in /addToArray' + data);
			 }
             function errorCallback (err) {
				console.log(err.responseText);
			 }  
			 $.post(SERVER_URL + '/addToInbox',toStore1, insertCallback).fail(errorCallback);	
			 function insertCallback(data) {
				console.log('function in /addToArray' + data);
			  }
			  function errorCallback (err) {
				 console.log(err.responseText);
			  } 
			  window.location.href="adminsentitems.html";
           }
		}else{
	    //alert the admin if the from field is blank
		alert('\"From\" field is blank');
		}
	}

/*
*This function displays the Sent Items of Admin
*/
function displayAdminSentItems(){
	var sentItems=document.getElementById("sentItems");
	var JSONObject = {"name":"adminSent"};
	$.post(SERVER_URL + '/displayAllEmails',JSONObject, grabTheArray).fail(errorCallback);	
    function grabTheArray(foundArray){
		var adminSentEmails =foundArray.emails;
		if(adminSentEmails.length!= 0)
		{
			sentItems.innerHTML = "";
			for (i = 0; i < adminSentEmails.length; i++)
			{
				var to = adminSentEmails[i].to;
				var subject = adminSentEmails[i].subject;
				var unread ="";
				if(adminSentEmails[i].read){
				 unread = "unread";
				}
				
				var unit_email = '<div class="highlight btn"><a data-role="button" class="btn highlight mybtnpoint" onclick="sentItemsPage('
					+ i
					+ ')"><span class="' + unread +' highlight">'
					+ to
					+ '</span></a>'
					+ '<a data-role="button" class="highlight btn mybtnpoint" onclick="sentItemsPage('
					+ i
					+ ')"><span class="' + unread +' highlight">'
					+ '&nbsp' +subject
					+ '</span></a></div>'
					+ '<a data-role="button" onclick="deleteEmailFromSentItems('
					+ i
					+ ')"><span id="cross">'
					+ '&nbsp; &times; &nbsp;' 
					+'</span></a><br>';
				sentItems.insertAdjacentHTML('beforeend', unit_email);
			}
		}
	}
	function errorCallback(err){
		console.log(err.responseText);
	}
}	

/*
*This function allows the admin to view a selected Sent Item
*/
function viewSelectedSentItem()
{
var index = JSON.parse(localStorage.getItem("index"));
var JSONObject={"name":"adminSent","index":index};
	$.post(SERVER_URL + '/viewOne',JSONObject, grabTheArray).fail(errorCallback);	
    function grabTheArray(foundArray){
		var adminSentEmails =foundArray.email;
			
			var to = document.getElementById("to");
			var cc = document.getElementById("cc");
			var sb = document.getElementById("sb");
			var emailText = document.getElementById("myTextArea");
			
			to.value = adminSentEmails.to;
			to.readOnly = true;
			cc.value = adminSentEmails.cc;
			cc.readOnly = true;
			sb.value = adminSentEmails.subject;
			sb.readOnly = true;
			emailText.value = adminSentEmails.emailText;
			emailText.readOnly = true;
		}
		function errorCallback(err){
			console.log(err.responseText);
		}
	}
/*
*This function allows the admin to view a selected Inbox Item and reply
*/
function viewSelectedInboxItem(){
var index = JSON.parse(localStorage.getItem("index"));
var JSONObject={"name":"adminInbox","index":index};
	$.post(SERVER_URL + '/viewOne',JSONObject, grabTheArray).fail(errorCallback);	
    function grabTheArray(foundArray){
		var adminInboxEmails =foundArray.email;
			
			var from = document.getElementById("from");
			var cc = document.getElementById("cc");
			var sb = document.getElementById("sb");
			var emailText = document.getElementById("myTextArea");
			
			from.value = adminInboxEmails.to;
			to.readOnly = true;
			cc.value = adminInboxEmails.cc;
			cc.readOnly = true;
			sb.value = adminInboxEmails.subject;
			sb.readOnly = true;
			emailText.value = adminInboxEmails.emailText;
			emailText.readOnly = true;
		}
		function errorCallback(err){
			console.log(err.responseText);
		}

}
/*
*This function allows the Admin to delete sentItems
*/

function deleteEmailFromSentItems(index){
var answer = confirm("Are you sure you want to delete this email?");
if(answer == true){
	var constructJSON = {"name":"adminSent","index":index};
	$.post(SERVER_URL + '/doDeletion',constructJSON, insertCallback).fail(errorCallback);	
            
	function insertCallback(data) {
	  console.log('function in /doDeletion' + data);
	}
	function errorCallback (err) {
	   console.log(err.responseText);
	} 
        location.reload();
}
}
/*
*This function allows the user to delete InboxItems
*/
function deleteEmailFromInboxItems(index)
{
	var answer = confirm("Are you sure you want to delete this email?");
	if(answer == true){
		var constructJSON = {"name":"adminInbox","index":index};
		$.post(SERVER_URL + '/doDeletion',constructJSON, insertCallback).fail(errorCallback);	
				
		function insertCallback(data) {
		  console.log('function in /doDeletion' + data);
		}
		function errorCallback (err) {
		   console.log(err.responseText);
		} 
                location.reload();
	}

}

/*
*This function saves the changes when an email is marked urgent
*/
function saveCheckboxVal(index){
        var constructJSON = {"name":"adminInbox","index":index};
	$.post(SERVER_URL + '/markUrgency',constructJSON, insertCallback).fail(errorCallback);
 		function insertCallback(data) {
		  console.log('function in /markUrgency' + data);
		}
		function errorCallback (err) {
		   console.log(err.responseText);
		} 
  
}


/*
*These 4 functions takes care of the helps 
*
*/
function openToHelpWindow()
{
	var helpToWindow = window.open("./helpto.html", "", "width=400,height=200");
}
function openCcHelpWindow()
{
	var helpCcWindow = window.open("./helpcc.html", "", "width=400,height=200");
}
function openSbHelpWindow()
{
	var helpSbWindow = window.open("./helpsb.html", "", "width=400,height=200");
}
function openBodyHelpWindow()
{
	var helpBodyWindow = window.open("./helpbody.html", "", "width=400,height=200");
}