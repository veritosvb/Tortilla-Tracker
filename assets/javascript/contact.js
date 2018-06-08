// Initialize Firebase

var config = {
    apiKey: "AIzaSyCGzaBhkg8aDwNVYlj1oUROZNW0EFGVuOg",
    authDomain: "mr-project-1b19c.firebaseapp.com",
    databaseURL: "https://mr-project-1b19c.firebaseio.com",
    projectId: "mr-project-1b19c",
    storageBucket: "mr-project-1b19c.appspot.com",
    messagingSenderId: "231087247385"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$(document).ready(function(){

    $("#form-id").on("submit", function(event){
    
     event.preventDefault();
    
    var name = $("#input-name").val().trim();
    var email = $("#input-email").val().trim();
    var country = $("#select-country").val().trim();
    var subject = $("#form-subject").val().trim();
    var message = $("#form-text").val().trim();
    
    console.log(name);
    console.log(email);
    console.log(country);
    console.log(subject);
    console.log(message);
    
    database.ref("/contact").push({

        name:name,
        email:email,
        country:country,
        subject:subject,
        message:message,

    });

    $("#input-name").val("");
    $("#input-email").val("");
    $("#select-country").val("");
    $("#form-subject").val("");
    $("#form-text").val("");

    });
    



});