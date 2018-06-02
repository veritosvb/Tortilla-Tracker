var liquor = "";
var drinkArr =[];


$(document).ready(function() {

    $(".call-drink").click(function(event) {
        event.preventDefault();
        console.log($(event.target).is('i'));
        
        if($(event.target).is("i")){
            liquor = $('#drink-option').find(":selected").text();
        } else {
            liquor = $(this.val().trim());
        }
        console.log(liquor);   

        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor ;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            $('.drink-images').empty();
            console.log(queryURL);
            console.log(response);
            //Saves the drinks matrix on a new variable to go down one level
            drinkArr = response.drinks;
            console.log(drinkArr);
            //Variable where the objects will be stored
            drinkObjectArr = [];
            //Goes through the array and creates an object for every drink pulled from the API
            for(let i = 0; i<drinkArr.length;i++){
                let bebida = {
                    //drink id
                    id: drinkArr[i].idDrink,
                    //drink name
                    name: drinkArr[i].strDrink,
                    //drink img source
                    image: drinkArr[i].strDrinkThumb
                }
                //pushed the object to the object array
                drinkObjectArr.push(bebida);
            }
            console.log(drinkObjectArr);
            
            //Goes through the object array and looks for the name and image, then appends them to a div
            for(let j=0; j<drinkArr.length;j++){
                //Let created inside the for so the append is not overwritten
                let drinkName = $("<h1>");
                let drinkImg = $("<img>");
                //Adding attribute and class to the image
                drinkImg.attr("src",drinkObjectArr[j].image);
                drinkImg.addClass("drink-image");
                //Adding attribute and class to the name
                drinkName.text(drinkObjectArr[j].name);
                drinkName.addClass("drink-name");
                //Appends to the div
                $(".drink-images").append(drinkImg);
                $(".drink-images").append(drinkName);
            }
        });
    });
});