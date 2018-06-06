var liquor = "";
var drinkObjectArr =[];


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
            console.log(drinkObjectArr);
            
            //Goes through the object array and looks for the name and image, then appends them to a div
            for(let j=0; j<drinkArr.length;j++){
                //Let created inside the for so the append is not overwritten
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
                $(".drink-images").append(drinkImg);
                $(".drink-images").append(drinkName);
            }
        });
    });

    //Listens for a drink element press
    $(document).on('click','.drink-element',function(event){
        console.log(event);
        console.log(event.target);
        
        console.log($(event.target).attr("drink-id"));
        //Saves the id of the clicked item on a variable
        let id = $(event.target).attr("drink-id")
        //Saves the query to a variable
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id; ;
        //Calling the ajax for the drink ID
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            //empties the div where the images are stored
            $('.drink-images').empty();
            console.log(queryURL);
            console.log(response);
            //Saves the relevant data from the pull to a variable
            let drink = response.drinks[0];
            console.log(drink);
            //Adds the container class to structure the div
            $('.drink-images').addClass("container");
            //Creates the first row's bootstrap structure
            let newRow1 = $("<div class='row'>");
            let newCol1 = $("<div class='col'>");
            let newCol2 = $("<div class='col'>");
            newRow1.append(newCol1);
            newRow1.append(newCol2);
            
            //Creates the second row's bootstrap structure
            let newRow2 = $("<div class='row'>");
            let newCol3 = $("<div class='col'>");
            newRow2.append(newCol3);
            
            //Creates the div where the ingredients list will be saved
            let ingredientsDiv = $("<div>");
            newCol1.append(ingredientsDiv);
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
                    //Gets the instructions and appends it to the corresponding div
                    $(newCol3).append(drink["strInstructions"]);
                }
            }
            console.log(ingredientList);
            //Appends the list to the ingredients div
            ingredientsDiv.append(ingredientList);
            //Appends the rows to the containers
            $('.drink-images').append(newRow1);
            $('.drink-images').append(newRow2);
        });
    });
});