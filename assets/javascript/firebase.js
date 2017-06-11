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
// ?????DOES IT ALSO NEED TO ADD NEW TABLE ROW
// ?????OR CAN THAT BE A SEPARATE FUNCTION??
$("#add-new-trainline").on("click", function(){
  // Prevents form from refreshing/submitting
  event.preventDefault();

  // Gets input values
  trainName = $("#train-name").val().trim();
  trainDestination = $("#train-destination").val().trim();
  trainArrival = $("#initial-arrival").val().trim();
  trainFrequency = $("#frequency").val().trim();

  console.log(trainName);
  console.log(trainDestination, trainArrival, trainFrequency);

  // Push values to firebase
  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainArrival: trainArrival,
    trainFrequency: trainFrequency 
  });
  
  // **********TODO: place trainCounter increment here

});


