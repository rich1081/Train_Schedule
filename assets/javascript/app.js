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
  var trainTime = 0;
  var frequency = 0;



      


// Capture Button Click
  $("#addTrain").on("click",function() {
      // Don't refresh the page!	
  	  event.preventDefault();

  	 // need to provide initial data to your Firebase database.
	   trainName = $("#train_name_input").val().trim();
	   destination = $("#destination-input").val().trim();
	   trainTime = $("#time").val().trim();
	   frequency = $("#frequency").val().trim();
     


  	 database.ref().push	({
  		trainName: trainName,
  		destination: destination,
  		trainTime: trainTime,
      frequency:  frequency,
 
            });


      //appends a row to the table in the html
        $("#tableTrainSchedule").append("<tr><td>" + trainName +"<td>" + destination + "<td>" + frequency + "<td>" + trainTime);

  
    
    });


//database watcher
  database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().frequency);


  },

  function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


// misssing time calculation




});