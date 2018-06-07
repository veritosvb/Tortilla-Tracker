
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAh7vemESSPj1BUmLpF5HbSEudr2mnEf3s",
    authDomain: "homework-83ba8.firebaseapp.com",
    databaseURL: "https://homework-83ba8.firebaseio.com",
    projectId: "homework-83ba8",
    storageBucket: "homework-83ba8.appspot.com",
    messagingSenderId: "575910252489"
  };
  firebase.initializeApp(config);

var database = firebase.database();
  

//create account
function submitCreateAccount(){
    var displayName = document.querySelector("#inputName");
    var email = document.querySelector("#inputEmail");
    var cp = document.querySelector("#zipcode");
    var password = document.querySelector("#inputPassword");
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
.then(function(user){
        alert("Account registered successfully!");   
        $('#Registration').modal('hide');         
            $("#inputName").val("");
            $("#zipCode").val("");
            $("#inputEmail").val("");
            $("#inputPassword").val("");
            $("#inputPassword2").val(""); 
    user.updateProfile({
        postal: cp,
        displayName: displayName.value});   
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert (errorMessage);
      });        
   
}
 
//signout account
firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });


//sign in account
function signIn(){
    var email = $("#email").val();
    var password = $("#password").val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    
    });
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name = user.displayName;
    email = user.email;
    uid = user.uid;  
    $("#uid").text("Sign out");

  }
  else{
      //user not signed in
  }
});
/*
* Events 
*
*/

$("#cfsubmit").click(function(event){
    $("#error-message").text("Thank you for contacting us. We will gate in touch as soon as posible");
    $("#error").attr("data-toggle", "modal");

    event.preventDefault();

   var name = $("#input-name").val().trim();
   var email = $("#input-email").val().trim();
   var country = $('#select-country').find(":selected").text();
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

   $("#error-message").text("Thank you for contacting us. We will gate in touch as soon as posible");
   $("#error").modal('show');
   $("#input-name").val("");
   $("#input-email").val("");
   $("#select-country").val("");
   $("#form-subject").val("");
   $("#form-text").val("");

   });
   