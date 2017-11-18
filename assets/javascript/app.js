// A $( document ).ready() block.
$(document).ready(function() {
    console.log( "ready!" );


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBHQQc7nzieAy-wUbcq7GV27YS4KSqVcAY",
    authDomain: "trainschedule-d856f.firebaseapp.com",
    databaseURL: "https://trainschedule-d856f.firebaseio.com",
    projectId: "trainschedule-d856f",
    storageBucket: "trainschedule-d856f.appspot.com",
    messagingSenderId: "843236274597"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName ="";
  var destination ="";
  var trainTime = "";
  var frequency = 0;
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  
// Capture Button Click
  $("#addTrain").on("click",function() {
      // Don't refresh the page!	
  	  event.preventDefault();

         
  	 // need to provide initial data to your Firebase database.
	   trainName = $("#train_name_input").val().trim();
	   destination = $("#destination-input").val().trim();
	   trainTime = $("#time").val().trim();
	   frequency = $("#frequency").val().trim();

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  
  	 database.ref().push	({
  		trainName: trainName,
  		destination: destination,
      frequency:  frequency,
      trainTime: trainTime

            });


    
    });


//database watcher
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().trainTime);


// First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(snapshot.val().trainTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % (snapshot.val().frequency);
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = (snapshot.val().frequency) - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    
      //appends a row to the table in the html

  $("#tableTrainSchedule").append("<tr><td>" + (snapshot.val().trainName) 
    + "<td>" + (snapshot.val().destination) 
    + "<td>" + (snapshot.val().frequency) 
    + "<td>" + moment(nextTrain).format("hh:mm") 
    + "<td>" + tMinutesTillTrain);
  

  },

  function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });




// misssing time calculation




});