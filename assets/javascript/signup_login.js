//To clear content of fields if user clicks on Cancel button
$("#cancel").on("click", function(){
    $("#inputName").val("");
    $("#zipCode").val("");
    $("#inputEmail").val("");
    $("#inputPassword").val("");
    $("#inputPassword2").val("");
});

//Validation if user does not enter the same password at user registration
$("#register").on("click", function(){
    if (($("#inputName").val())!= "" && ($("#zipCode").val()) != "" && ($("#inputEmail").val()) != "") {
        if (($("#inputPassword").val().trim()) != ($("#inputPassword2").val().trim())) {
            alert ("Password does not match");
        }
        else {
            submitCreateAccount();
        }
    }
});

