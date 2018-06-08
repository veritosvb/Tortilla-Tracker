// global variables
var liquor = "";
var drinkObjectArr =[];
var favoritesArr = [];
var ingredientArray=[""];


$(document).ready(function() {

    $(".call-drink").click(function(event) {
        event.preventDefault();
        console.log("what is this");
        

        liquor = $('#drink-option').find(":selected").text();

        if(liquor == "Pick something to drink!")
        {
            modalAlert("No liquor selection made - Default tequila");
            liquor = "Tequila";
        }
    
        console.log(liquor);   

        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor ;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            $('.drink-images').empty();
            //Saves the drinks matrix on a new variable to go down one level
            let drinkArr = response.drinks;
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
            
            //Goes through the object array and looks for the name and image, then appends them to a div
            for(let j=0; j<drinkArr.length;j++){
                //Let created inside the for so the append is not overwritten
                let drinkDiv = $('<div class="col-lg-3 col-md-4 col-sm-5 col-xm-6">');
                let drinkName = $("<p>");
                let drinkImg = $("<img>");
                //Adding attribute and class to the image
                drinkImg.attr("src",drinkObjectArr[j].image);
                drinkImg.addClass("drink-image");
                drinkImg.addClass("drink-element");
                drinkImg.attr("drink-id", drinkObjectArr[j].id);
                //Adding attribute and class to the name
                drinkName.text(drinkObjectArr[j].name);
                drinkName.addClass("drink-name");
                drinkName.addClass("drink-element");
                drinkName.attr("drink-id", drinkObjectArr[j].id);
                //Appends to the div
                drinkDiv.append(drinkImg);
                drinkDiv.append(drinkName);
                $(".drink-images").append(drinkDiv);

            }
        });
    });

    //Listens for a drink element press
    $(document).on('click','.drink-element',function(event){

        console.log($(event.target).attr("drink-id"));
        //Saves the id of the clicked item on a variable
        let id = $(event.target).attr("drink-id");
        $('.favorite.btn').attr("id",id);
        //Saves the img

        //Saves the query to a variable
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id; ;
        //Calling the ajax for the drink ID
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            //empties the div where the images are stored
            $('.drink-images').hide();
            console.log(queryURL);
            console.log(response);
            //Saves the relevant data from the pull to a variable
            let drink = response.drinks[0];
            console.log(drink);

            //Creates the div where the ingredients list will be saved
            let ingredientsDiv = $(".ingredient-list");
            //Creates the list where the ingredients will be saved
            let ingredientList = $("<ul>");
            //Goes through all the ingredients
            for(let i=1;i<16;i++){
                //Gets the i'th ingredient name
                let ingredient = "strIngredient"+i.toString();
                let measure = "strMeasure"+i.toString();
                console.log(drink[ingredient]);
                //New list element to save the ingredient
                let newli = $("<li>");
                //If the ingredient is blank it is skipped
                if(drink[ingredient] !== ""){
                    //Gets the measure and the ingredient and concatenates them, then adds them to the list element
                    newli.text(drink[measure] + ": "+drink[ingredient]);
                    ingredientList.append(newli);

                    //array that stores the ingredients list
                    ingredientArray[i]=drink[ingredient];
                }
            }
            //Gets the instructions and appends it to the corresponding div
            $('.instructions-div').append(drink["strInstructions"]);
            //Adds image
            $('.drink-info-image').attr("src", drink["strDrinkThumb"]);
            //Saves image link in the favorite button as an attribute
            $('.favorite.btn').attr("source", drink["strDrinkThumb"]);
            console.log(ingredientList);
            //Appends the list to the ingredients div
            ingredientsDiv.append(ingredientList);

            console.log(ingredientArray);
            ingredients(ingredientArray);
            
            
            $('.drink-information').show();
        });
    });

    $('.return').click(function(){
        $('.drink-information').hide();
        $('.drink-info-image').empty();
        $('.instructions-div').empty();
        $('.ingredient-list').empty();
        $('.drink-images').show();
        $('.walmart-list').empty();
    });

    $('.favorite.btn').click(function(){
        let exists = 0;
        let id = $(event.target).attr("id");
        let source = $(event.target).attr("source");
        for(let i = 0; i < favoritesArr.length;i++){
            if(favoritesArr[i] === id){
                exists = 1;
                $('.favorite-icon').removeClass("fas");
                $('.favorite-icon').addClass("far");
                favoritesArr.splice(i, 1);
            }
        }
        if(exists === 0){
            $('.favorite-icon').removeClass("far");
            $('.favorite-icon').addClass("fas");
            favoritesArr.push(id, source);
        }
        console.log("favorites");
        console.log(favoritesArr);
        
        
    });
}); 

function updateFavorites(id, source){
    $('.favorite-images').empty();
    for(let i = 0; i < favoritesArr; i++){
        let favoriteImageDiv = $("<div>");
        let favoriteImageImg = $("<img>");
    }

}


//function that fetches ingrediets cost information from walmart api 

function ingredients(ingArray){
    key = "vqe373k5m24yguknhm2mqb6z";
    for (i=1; i<ingArray.length;i++){
    console.log(ingArray[i]);
    var queryURL = "http://api.walmartlabs.com/v1/search?query=" + ingArray[i] +"&format=json&apiKey=" + key;
    console.log(queryURL);

    $.ajax({
    url: queryURL,
    method: "GET"
    })

    .done(function(response){
    console.log(queryURL);
    console.log(response);
    console.log(response.items["0"].name);
    console.log(response.items["0"].salePrice);

    var itemName = response.items["0"].name;
    var itemPrice = response.items["0"].salePrice;

    console.log("name: " + itemName + " USD");
    console.log("price: "+ itemPrice + " USD");
    
    $(".walmart-list").append(itemName);
    $(".walmart-list").append(itemPrice);

    

    });

    }

    }
