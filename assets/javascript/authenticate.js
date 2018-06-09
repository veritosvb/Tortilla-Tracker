
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
function submitCreateAccount(displayName,email,cp,password){

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user){
            
            var user = firebase.auth().currentUser;
            clearRegistration();
            $("#RegistrationModal").modal("hide");

            user.updateProfile({
                displayName: "Jane Q. User",
                zipcode: cp
            }).then(function() {
                modalAlert("Account registered successfully!");   
            }).catch(function(error) {
                modalAlert(error.message);   
            });

        }).catch(function(error) {
            modalAlert(error.message);
        }); 
            
             
}

function clearRegistration(){
    $('#Registration').modal('hide');         
    $("#inputName").val("");
    $("#zipCode").val("");
    $("#inputEmail").val("");
    $("#inputPassword").val("");
    $("#inputPassword2").val(""); 
}

function checkRegistrationModal(name,email,cp,pass){
    if (name != "" ||  email != "" || cp != "" || pass!= "") {
        if (pass == ($("#inputPassword2").val())) {
            return true;
        }else{
            modalAlert("Password does not match");
            return false;
        }
    }else{
        modalAlert("Please fill the required info");
        return false;
    }
}

//Function to validate contact form
function checkContactForm(name,email,subject,message){
    if (name != "" && email != "" && subject != "" && message != "") {
    return true;
    }
    else {
    modalAlert("Some required fields are missing!");
    }
    }
//Function to submit contact form after validation and reset fields to its original status after submission
function sentContactForm(name,email,country,subject,message) {
    modalAlert("We appreciate you contacting us. One of our colleagues will get back to you shortly. Cheers!");
    firebase.database().ref("/contact").push({
    name:name,
    email:email,
    country:country,
    subject:subject,
    message:message,
    });
    $("#error").modal('show');
    $("#nameC").val("");
    $("#emailC").val("");
    //$("#select-country").val("");
    $("#form-subject").val("");
    $("#messageC").val(""); 
}
    
//signout account
function signOut(){
    $("#navSignIn").text("Sign In");
    $("#navSignIn").attr("newName", "out");
    $("#signInSection").css({display:"block"});
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        
        modalAlert("You have successfully signed out");
      }).catch(function(error) {
        // An error happened.
        modalAlert(error.message);
      });
}

//sign in account
function signIn(){
    var email = $("#emailSI").val().trim();
    var password = $("#passwordSI").val().trim();

    if(email == "" || password == ""){
        modalAlert("Please enter email address and password");
    }else{

        firebase.auth().signInWithEmailAndPassword(email, password).then(function(confirmationResult) {
            modalAlert("You have successfully sign in!");
            $("#emailSI").val("");
            $("#passwordSI").val("");
            $("#navSignIn").text("Sign Out");
            $("#navSignIn").attr("newName", "in");
            $("#signInSection").css({display:"none"});
            
          })
        .catch(function(error) {
            modalAlert(error.message);
        });
    }
}



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name = user.displayName;
    email = user.email;
    uid = user.displayName;  
    $("#uid").text(uid);
    $("#uid").append('<i class="fas fa-user"></i>');

  }

});
/*
* Events 
*
*/
$("#signIn").click(function(event){
    event.preventDefault();
    console.log("sign in")
    signIn();
});

$("#navSignIn").click(function(event){
    event.preventDefault();
    console.log($("#navSignIn").attr("newName"));
    if ($("#navSignIn").attr("newName")!="out") {
        signOut();
    }
});

//Function to recover password
$("#forgotPassBtn").click(function(event){
    console.log("forgot password");
    //Validation if field is empty
    if ($("#inputEmailFP").val()=="") {
        modalAlert("Please provide an email address");
    }
    else {
        firebase.auth().sendPasswordResetEmail($("#inputEmailFP").val().trim()).then(function(confirmationResult) {
            modalAlert("Reset password link sent!");
            $("#forgotPasswordModal").modal("hide");
            $("#inputEmailFP").val("");
          })
        .catch(function(error) {
            modalAlert(error.message);
        });
    }
});

//To clear content of field if users clicks on Cancel Button from Forgot Password Section
$("#cancelFP").on("click", function(){
    $("#inputEmailFP").val(""); //From recover password section
});

//To clear content of fields if user clicks on Cancel button
$("#cancel").on("click", function(){
    $("#inputName").val("");
    $("#zipCode").val("");
    $("#inputEmail").val("");
    $("#inputPassword").val("");
    $("#inputPassword2").val("");
});

//Validation if user does not enter the same password at user registration
$("#modalRegistration").on("click", function(){
    event.preventDefault();
    $("#RegistrationModal").attr("data-toggle", "modal");
    $("#RegistrationModal").modal('show');

});

//Register user when user fill out the required fields.
$("#register").on("click", function(){
    event.preventDefault();
    var displayName = $("#inputName").val().trim();
    var email = $("#inputEmail").val().trim();
    var cp = $("#zipCode").val().trim();
    var password = $("#inputPassword").val();

    console.log("registering User");
    console.log(displayName);
    console.log(email);
    console.log(cp);
    console.log(password);
   
    if(checkRegistrationModal(displayName,email,cp,password)){
        submitCreateAccount(displayName,email,cp,password)
    }
});



//Contact form when user provides all required fields
$("#cfsubmit").click(function(event){
    var name = $("#nameC").val().trim();
    var email = $("#emailC").val().trim();
    var country = $('#select-country').find(":selected").text();
    var subject = $("#form-subject").val().trim();
    var message = $("#messageC").val().trim();
    if(checkContactForm(name,email,subject,message)){
    sentContactForm(name,email,country,subject,message);
    }
    });    
   

function modalAlert(message){
    $("#error-message").text(message);
    $("#error").attr("data-toggle", "modal");
    $("#error").modal('show');
}

