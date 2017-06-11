//  Train Scheduler BackEnd JS

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBl-nZyi1y61jQgfAacHMTUNsiX4TVdXtE",
  authDomain: "train-scheduler-d33bf.firebaseapp.com",
  databaseURL: "https://train-scheduler-d33bf.firebaseio.com",
  projectId: "train-scheduler-d33bf",
  storageBucket: "train-scheduler-d33bf.appspot.com",
  messagingSenderId: "239847596199"
};
firebase.initializeApp(config);

// -----VARIABLES------

// Gets firebase reference
var database = firebase.database();

// Sets initial variables
// var trainlineCounter = 0;
// var maxTrainlines = 10;   // Sets max number of train lines displayed
var trainName = "";
var trainDestination = "";
var trainArrival = "";
var trainFrequency = "";

// -----FUNCTIONS------

// Pushes form values to firebase
$("#add-new-trainline").on("click", function(){
  // Prevents form from refreshing/submitting
  event.preventDefault();

  // Gets input values
  trainName = $("#train-name").val().trim();
  trainDestination = $("#train-destination").val().trim();
  trainArrival = $("#initial-arrival").val().trim();
  trainFrequency = $("#frequency").val().trim();

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainArrival);
  console.log(trainFrequency);

  // Push values to firebase
  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainArrival: trainArrival,
    trainFrequency: trainFrequency 
  });
  
  // Clears the form
  $("#train-name").val("");
  $("#train-destination").val("");
  $("#initial-arrival").val("");
  $("#frequency").val("");
  
  // **********TODO: place trainCounter increment here
});


// When a child is added to firebase, update the train departure board
database.ref().on("child_added", function(childSnapshot){

  // Gets the newly added child (trainline) value
  var newTrainline = childSnapshot.val();

  // Creates new row in the depature table for the new trainline
  $("#train-depature-board" > tbody).append("<tr><tb>")

}, function(errorObjects) {
  console.log("Teh read failed: " + errorObject.code);
});