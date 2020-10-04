


/* START OF STARRED AREA NO. 1 **** See note (5) in the file header ******************************************** */
/* START OF STARRED AREA NO. 1 **** See note (5) in the file header ******************************************** */
/* START OF STARRED AREA NO. 1 **** See note (5) in the file header ******************************************** */

var express = require('express');   // Import the Express framework (This is not a library, and not an API.)


var mongodb = require('mongodb');   // Import the MongoDB API (This is not a library, not a framework.)
                                    // This is an API that enables you to use functions from the
                                    // mongoDB library.

var username = 'nf_oozeer';             // username
var password = 'A00439194'; // password (yours should be your A number)
var localHost = '127.0.0.1';        // Just like 140.184.230.209 is the same as ugdev.cs.smu.ca
                                    // 127.0.0.1 is also a host. It is the address of the local host.
                                    // mongoDB must use the local host.
var localPort = '27017';            // port number of the local port
var database = 'nf_oozeer';             // name of database (yours should be the same as your username)

// create the credentials string used for database connection: mongodb://terry:tgoldsmith20!8pwd@127.0.0.1:27017/terry
var credentialsString = 'mongodb://' + username + ':' + password + '@' + localHost + ':' + localPort + '/' + database;

// Access the express framework via the variable server
var server = express();

// set port variable
var port = 3007;



// ALWAYS HAVE THIS SECTION --- server.use()
//
// enable recognition of incoming data as JSON
server.use(express.json());
// incoming values in name:value pairs can be any type (true below)
server.use(express.urlencoded({ extended: true }));



// ALWAYS HAVE THIS SECTION --- server.use()
//
// static assets like javascript and css are served from these folders
server.use('/scripts', express.static(__dirname + '/scripts'));
server.use('/css', express.static(__dirname + '/css'));
// root
server.use(express.static(__dirname));



// ALWAYS HAVE THIS SECTION --- server.use()
//
// set up allowance characteristics for cross-origin resource sharing (CORS)
// req - not used here
// res - response to HTTP request: allow requesting code from any origin;
//                                 allowed HTTP request methods;
//                                 name of supported request header.
// next - calls the next Express Framework function set to be executed
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
server.use(allowCrossDomain);
//this function checks capacity
server.post('/checkCapacity',checkCapacity);
function checkCapacity(req,res){
    var inbox = req.body.inbox;
    var sent = req.body.sent;
    globalDB.collection(inbox).findOne({}, checkInboxCapacity);
    function checkInboxCapacity(err,foundArray){
        if(err)stop(err,"in checking inbox capacity");
        console.log(foundArray.emails);
        var inboxSpace = foundArray.emails.length < 10;
        globalDB.collection(sent).findOne({}, checkSentCapacity);
        function checkSentCapacity(err,foundArray1){
            if(err)stop(err,"in checking sent capacity");
            var sentSpace = foundArray1.emails.length < 10;
            var constructJSON = {"inboxSpace":inboxSpace,
            "sentSpace":sentSpace};
            return res.status(200).send(constructJSON);
        }
    }
}
//this function saves urgency of an email
server.post('/markUrgency',markUrgency);
function markUrgency(req,res){
console.log("inside save urgency");
var name = req.body.name;
var index = req.body.index;
console.log("got the name and index");
globalDB.collection(name).findOne({}, saveUrgentEmail);
function saveUrgentEmail(err,foundArray){
console.log("has managed to search data" + foundArray);
if(err)stop(err,"in saving urgency of an email from" + name);
foundArray.emails[index].checked = !foundArray.emails[index].checked;
console.log("modified the array");
dropAndInsert(name,foundArray,"marking the email as urgent",res);
}
}


//this deletes a clicked email
server.post('/doDeletion',doDeletion);
function doDeletion(req,res){
var name = req.body.name;
var index = req.body.index;
globalDB.collection(name).findOne({}, deleteOne);
function deleteOne(err,foundArray){
if(err)stop(err,"in deleting an email from" + name);
console.log("emails before delete" + foundArray.emails);
foundArray.emails.splice(index,1);
console.log("emails after deletion" +foundArray.emails);
dropAndInsert(name,foundArray,"deleting the email",res);
}
}
//this views an email
server.post('/viewOne',viewOne);
function viewOne(req,res){
    var name = req.body.name;
    var index = req.body.index;
    globalDB.collection(name).findOne({}, viewEmail);
    function viewEmail(err,foundArray){
    if(err)stop(err,"in viewing an email");
    var email = getTheEmail(foundArray);
    readEmail(foundArray);
    var constructJSON = {"email" :email};
    return res.status(200).send(constructJSON);
    }
    function getTheEmail(foundArray){
        var email = foundArray.emails[index];
        return email;
    }
    function readEmail(foundArray){
        console.log(foundArray.emails[index].read);
        foundArray.emails[index].read = false;
        dropAndInsertFunction(name,foundArray,"reading an email");
    }
}


//this displays all emails
server.post('/displayAllEmails',displayAllEmails);
function displayAllEmails(req,res){
    var name = req.body.name;
    globalDB.collection(name).findOne({},theSentArray);
    function theSentArray(err,foundArray){
        if(err)stop(err,"in sending the array from" + name);
        console.log(foundArray);
        return res.status(200).send(foundArray);
    }
}


//This adds adds an email to sent items
server.post('/addToSent', addToSent);
function addToSent(req,res){
    var name = req.body.name;
    var newEmail =req.body.newEmail;
    globalDB.collection(name).findOne({},store);
    function store(err,foundArray){
        if(err)stop(err,"storing");
        foundArray.emails.unshift(newEmail);
        dropAndInsert(name,foundArray,"storing",res);
    }
}
server.post('/addToInbox', addToInbox);
function addToInbox(req,res){
    var name = req.body.name;
    var newEmail =req.body.newEmail;
    globalDB.collection(name).findOne({},store);
    function store(err,foundArray){
        if(err)stop(err,"storing");
        foundArray.emails.unshift(newEmail);
        dropAndInsert(name,foundArray,"storing",res);
    }
}



// The callback function that is executed when server.post completes its tasks.
// Note that programmer defined error handling is not required here.
//
// First Parameter : req is the request object.
//                   This object contains another object called body which identifies
//                   the JSON object, in much the same way a JavaScript variable would.
//                   see the variable "weatherData" in OnlineMongoClient2.js
//
// Second Parameter: res is the result object.
//
function dropAndInsert(name, newJSON,reason,res) {

    globalDB.collection(name).drop(insertNew);
        function insertNew(dropError, dropSuccess) { 
        console.log("Before success in dropping collection" + name);

        if (dropSuccess) {
        globalDB.collection(name).insertOne(newJSON, afterInsertion);
        }
        function afterInsertion(err){
            console.log("Inside insertion function");

            if(err)stop(err,"in drop and insert" + name + reason);
        
            return res.status(200).send("Insertion successful, reason is" + reason);
        
        }
        if (dropError) stop(dropError,"in dropping");  
    }
      console.log("completion");

    };

   //drop and insert without a message
   function dropAndInsertFunction(name, newJSON,reason) {

    globalDB.collection(name).drop(insertNew);
        function insertNew(dropError, dropSuccess) { 
        if (dropSuccess) {
        globalDB.collection(name).insertOne(newJSON, afterInsertion);
        }
        function afterInsertion(err){
            if(err)stop(err,"in drop and insert" + name + reason);
            console.log("sucessful drop and insert")
        }
        if (dropError) stop(dropError,"in dropping");

    }
    };
    //This function is executed when there is an error
    function stop(err,message){
        console.log(message);
        return;
    }



// Create a connection to your mongoDB database
//
// Parameter 1: database credentials required for logging into and using your mongo database
//              Note: It is a string containing many pieces of information formatted in a specific way.
// Parameter 2: Callback function that returns a reference to the mongo database
//              [Note For The Callback Function: Once mongodb.connect() finishes its tasks, execute getDBReference]
//              (please read the header for this function, to understand the return mechanism)
mongodb.connect(credentialsString, getDBReference);



//
// This function is a callback function executed after a connection to your mongo database
// has been made.
//
// if an error occured while trying to establish a connection to the database, err will reference an error object,
// otherwise err will be null.
// if no error occured, ref will contain a valid reference to your mongo database
//
// This function uses the global system variable "process" which contains info about this Node.js process.
//

// global variable contains reference to the database
var globalDB;

function getDBReference(err, ref) {
    if (err == null) {

        // When a SIGTERM event occurs: log info; close DB; and close server (via the anonymous function).
        // An anonymous function is a function without a name. See the second argument to "process.on"
        // just below. It is "function () {...}"
        // SIGTERM is a signal intentionally generated by another process (not by the operating system).
        // It represents a controlled and deliberate administrative decision, to terminate the process.
        process.on('SIGTERM', function () {

            console.log("Shutting server down.");
            ref.close();
            server.close();
        });
    
        // initialize reference to the database
        globalDB = ref.db("nf_oozeer");

        // Start server listening on the port, and log the info (via the anonymous function)
        // An anonymous function is a function without a name. See the second argument to "server.listen"
        // just below. It is "function () {...}"
        server.listen(port, function () {
            console.log('Listening on port ' + port);
        });
    } else {
        // Throw the object err containing detailed error info
        throw err;
    }
}

/* END OF STARRED AREA NO. 2 **** See note (5) in the file header ********************************************** */
/* END OF STARRED AREA NO. 2 **** See note (5) in the file header ********************************************** */
/* END OF STARRED AREA NO. 2 **** See note (5) in the file header ********************************************** */