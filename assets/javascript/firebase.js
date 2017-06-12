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
    trainFrequency: trainFrequency, 
    trainArrival: trainArrival
  });
  
  // Clears the form
  $("#train-name").val("");
  $("#train-destination").val("");
  $("#initial-arrival").val("");
  $("#frequency").val("");

  // **********TODO: place trainCounter increment here
  //  ************possibly use limitToLast(10) method
});


// When a child is added to firebase, update the train departure board
database.ref().on("child_added", function(childSnapshot){

  // Gets the newly added child (trainline) values
  var newTrainline = childSnapshot.val();
  var newTrainArrival = childSnapshot.val().trainArrival;
  
  // Time until next train arrives calculations
  var currentTime = moment();
  console.log(currentTime);

  //  Subtracts
  var convertedArrival = moment(newTrainArrival, "hh:mm").subtract(1, "years");
  console.log("trainArrival "+ newTrainArrival);
  console.log("convertedArrival: "+convertedArrival);

  // Difference between current time and initial arrival
  var diffTime = moment().diff(moment(convertedArrival), "minutes");
  console.log("diffTime: "+ diffTime);

  // Modulo calculation to determine how much time remains 
  // until the next train arrives.
  var tRemainder = diffTime % newTrainline.trainFrequency;
  console.log("Remainder: "+ tRemainder);

  var tMinutesToArrival = newTrainline.trainFrequency - tRemainder;
  console.log("tMinutesToArrival: "+ tMinutesToArrival);

  var tNextArrival = moment().add(tMinutesToArrival, "minutes").format("hh:mm");
  console.log("NextArrival "+ tNextArrival);
  // ----- Ends time until next train arrives calculations 

  // Creates new row in the depature table for the new trainline
  $("#train-departure-board > tbody").append("<tr>" +
      "<td>" + newTrainline.trainName + "</td>" +
      "<td>" + newTrainline.trainDestination + "</td>" + 
      "<td>" + newTrainline.trainFrequency + "</td>" +
      "<td>" + tNextArrival + "</td>" +
      "<td>" + tMinutesToArrival + "</td></tr>");

}, function(errorObjects) {
  console.log("Teh read failed: " + errorObject.code);
});