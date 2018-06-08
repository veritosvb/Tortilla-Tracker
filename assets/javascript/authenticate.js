
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

//signout account
firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });


//sign in account
function signIn(){
    var email = $("#emailSI").val().trim();
    var password = $("#passwordSI").val().trim();

    if(email == "" || password == ""){
        modalAlert("Please fill Email address and password");
    }else{

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            modalAlert(error.message);
        });
    }
}



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name = user.displayName;
    email = user.email;
    uid = user.displayName;  
    $("#navSignIn").text("Sign out");
    $("#uid").text(uid);
    modalAlert("User sign In");
  }
  else{
      //user not signed in
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

//Function to recover password
$("#forgotPassBtn").click(function(event){
    console.log("forgot password");
    


});

//To clear content of fields if user clicks on Cancel button
$("#cancel").on("click", function(){
    $("#inputName").val("");
    $("#zipCode").val("");
    $("#inputEmail").val("");
    $("#inputPassword").val("");
    $("#inputPassword2").val("");
    $("#inputEmailFP").val(""); //From recover password section
});

//Validation if user does not enter the same password at user registration
$("#modalRegistration").on("click", function(){
    event.preventDefault();
    $("#RegistrationModal").attr("data-toggle", "modal");
    $("#RegistrationModal").modal('show');

});


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



$("#cfsubmit").click(function(event){
  modalAlert("Thank you for contacting us. We will gate in touch as soon as posible");

   var name = $("#nameC").val().trim();
   var email = $("#emailC").val().trim();
   var country = $('#select-country').find(":selected").text();
   var subject = $("#form-subject").val().trim();
   var message = $("#messageC").val().trim();
   
   console.log(name);
   console.log(email);
   console.log(country);
   console.log(subject);
   console.log(message);
   
   firebase.database().ref("/contact").push({
       name:name,
       email:email,
       country:country,
       subject:subject,
       message:message,
   });

   $("#error").modal('show');
   $("#input-name").val("");
   $("#input-email").val("");
   $("#select-country").val("");
   $("#form-subject").val("");
   $("#form-text").val("");

   });
   

function modalAlert(message){
    $("#error-message").text(message);
    $("#error").attr("data-toggle", "modal");
    $("#error").modal('show');
}