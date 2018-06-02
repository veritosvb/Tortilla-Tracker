<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Drinks</title>
  
</head>

<body>

  <h1>Fix yourself a drink!</h1>

  <div>
      <form name="form" method="post" id="newDrink">
        <p id="userInput">
          <label>What kind of licor do you have at home?</label>
          <input type="text" name="liquorKind" id="liquor-input" value="" required />
           <input id="submit" type="submit" value="find my drink!" />
        </p>
      </form>
    </div>

    <div id="drinks-display"></div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    
    <script type="text/javascript">

      var liquor = "";
      var drinkArr =[];


      $(document).ready(function() {
        
       $("#newDrink").submit(function(event) {
        
           event.preventDefault();
           liquor = $('#liquor-input').val();
           console.log(liquor);   

            var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor ;
            
            $.ajax({
            url: queryURL,
            method: "GET"
          })
          .done(function(response) {
            console.log(queryURL);
            console.log(response);
            drinkArr.push(response.drinks["0"].idDrink);
            drinkArr.push(response.drinks["0"].strDrink);
            drinkArr.push(response.drinks["0"].strDrinkThumb);
            console.log(drinkArr);

          
  
            
          });



          });

          });
                
      

        
      
        
      


      
    </script>
  </div>
</body>

</html>
