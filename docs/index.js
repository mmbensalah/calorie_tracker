$( document ).ready(function() {

  $(".foods").hide();
  $(".diary-all").hide();
  $(".all-meals").hide();
  $(".calendar").hide();


  $("#btn-show-foods").on('click', function(){
    $(".foods").show();
    $(".diary-all").hide();
    $(".calendar").hide();
    $("#inputs-patch-food").hide();
    $("#btn-patch").show();
    $("#btn-delete").show();
    getAllFoods();
  });

  $("#btn-go-back").on('click', function() {
    $("#inputs-patch-food").hide();
    $("#btn-patch").show();
    $("#btn-delete").show();
  })

  $("#btn-show-diary").on('click', function(){
    $(".diary-all").show();
    $(".foods").hide();
    $(".calendar").hide();
    getAllDates();
  });

  $("#btn-show-calendar").on('click', function(){
    $(".diary-all").hide();
    $(".foods").hide();
    $(".calendar").show();
    getAllMealsByDate();
  });

  $("#btn-post-submit").on('click', function(){
    var food = $("#field-post-food").val()
    var calories = $("#field-post-calories").val()
    $.ajax({
      type: 'POST',
      url: "https://damp-garden-70659.herokuapp.com/api/v1/foods",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: { "name": food, "calories": calories },
      success: function(result) {
        getAllFoods();
        clearInputs();
        $("#flash-container").html(`Your ${food} has been added`)
        clearFlash();
      }
    });
  });

  $( ".get-all-foods" ).change(function() {
    var selectedFood = $( "#foods-list option:selected" ).val();
    allFoods.list.forEach(function(food) {
      if(food.name == selectedFood.split(":")[0]) {
        allFoods.foodId = food.id
      }
    });
  });

  $("#btn-patch").on('click', function(){
    $("#inputs-patch-food").show();
    $("#btn-patch").hide();
    $("#btn-delete").hide();
  });

  $("#btn-patch-submit-food").on('click', function(){
    var food = $("#field-patch-food").val()
    var calories = $("#field-patch-calories").val()
    var foodId = $("#foods-list.field :selected").val();
    $.ajax({
      type: 'PATCH',
      url: `https://damp-garden-70659.herokuapp.com/api/v1/foods/${foodId}`,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: { "name": food, "calories": calories },
      success: function(result) {
        $("#flash-container").html(`Your ${food} has been updated`)
        clearFlash();
        getAllFoods();
        $("#inputs-patch-food").hide();
        $("#btn-patch").show();
        $("#btn-delete").show();
      },
      error: function(response) {
        alert(response.responseJSON.error);
      }
    });
  });

  $("#btn-delete").on('click', function() {
    var foodId = $("#foods-list.field :selected").val();
    $.ajax({
      type: 'DELETE',
      url: `https://damp-garden-70659.herokuapp.com/api/v1/foods/${foodId}`,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function(result) {
        getAllFoods();
      },
      error: function(response) {
        alert(response.responseJSON.error);
      }
    });
  });

  $("#btn-post-submit-date").on('click', function() {
    var day = $("#field-post-date").val();
    $.ajax({
      type: 'POST',
      url: 'https://damp-garden-70659.herokuapp.com/api/v1/dates',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: { "day": day },
      success: function(result) {
        $("#flash-container-date").html(`Date has been added`)
        clearFlash();
        // alert("Date has been added");
        getAllDates();
      },
      error: function(response) {
        alert(response.responseJSON.error);
      }
    })
  })

  $("#btn-get-date").on('click', function() {
    $(".all-meals").show();
    getAllFoods();
    var day = $("#dates-list option:selected").html();
    getAllMealFoods(day);
  })

  $("#btn-post-submit-meal-food").on('click', function() {
    var date  = $("#dates-list :selected").val();
    var food  = $("#foods-list-2.field :selected").val();
    var meal  = $("#drop-down-meals :selected").val();
    var day = $("#dates-list option:selected").html();
    var foodName = $("#foods-list-2 option:selected").html();
    var mealName = $("#drop-down-meals option:selected").html();
    $.ajax({
      type: 'POST',
      url: `https://damp-garden-70659.herokuapp.com/api/v1/meals/${meal}/foods/${food}?date=${date}`,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {'food_id': food, 'meal_id': meal, 'date_id': date },
      success: function(result) {
        getAllMealFoods(day);
      },
      error: function(response) {
        alert(response.responseJSON["error"]["detail"]);
      }
    });
  })
})

  $("#btn-delete-submit-meal-food").on('click', function() {
    var date  = $("#dates-list :selected").val();
    var food  = $("#foods-list-2.field :selected").val();
    var meal  = $("#drop-down-meals :selected").val();
    var day = $("#dates-list option:selected").html();
    var foodName = $("#foods-list-2 option:selected").html();
    var mealName = $("#drop-down-meals option:selected").html();
    $.ajax({
      type: 'DELETE',
      url: `https://damp-garden-70659.herokuapp.com/api/v1/meals/${meal}/foods/${food}?date=${date}`,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function(result) {
        getAllMealFoods(day);
      },
      error: function(response) {
        alert(response.responseJSON["error"]["detail"]);
      }
    });
  })

  function clearFlash() {
    setTimeout(function(){
      $('#flash-container').html("");
    }, 3000);
    setTimeout(function(){
      $('#flash-container-date').html("");
    }, 3000);
  }

  function getAllFoods() {
    $.ajax({
      type: 'GET',
      url: "https://damp-garden-70659.herokuapp.com/api/v1/foods",
      success: function(result) {
        allFoods.list = result
        var sortedResult = toAlphabetize(result)
        var contents = "<option>Select Food</option>";
        for (var i = 0; i < sortedResult.length; i++){
          contents += `<option value=${sortedResult[i]["id"]}>${sortedResult[i]["name"]}:  ${sortedResult[i].calories} calories</option>`
        };
          $( "#foods-list" ).html(contents)
          $( "#foods-list-2" ).html(contents)
      }
    });
  };

  function clearInputs() {
    $( "#field-post-food" ).val("")
    $( "#field-post-calories" ).val("")
  }

  function getAllDates() {
    $.ajax({
      type: 'GET',
      url: "https://damp-garden-70659.herokuapp.com/api/v1/dates",
      success: function(result) {
        const results = result["dates"]
        allDates.list = results
        var sortedResults = dateSort(results)
        var contents = "<option>Select Date</option>";
        for (var i = 0; i < sortedResults.length; i++){
          contents += `<option value=${sortedResults[i].id}>${formatDate(sortedResults[i].day)}</option>`
        };

        $( ".get-all-dates" ).html(
          `<select class='field' id='dates-list'> ${contents}</select>`)
      }
    });
  }

  function calorieCount(arr) {
    var total = 0;
    for (var i = 0; i < arr.length; i++){
      total += arr[i]["calories"]
    }
    return total
  };

  function calculateGoal(num) {
    return 500 - num;
  }

  function getAllMealFoods(day) {
    $.ajax({
      type: 'GET',
      url: `https://damp-garden-70659.herokuapp.com/api/v1/dates/${day}/meals`,
      success: function(result) {
        if (result == "No saved meals") {
          result = [{id: 1, name: "Breakfast", foods:[]}, {id: 2, name: "Lunch", foods: []}, {id: 3, name: "Dinner", foods: []}, {id: 4, name: "Snack", foods: []}]
        }
          var breakfast = "<h1>Breakfast</h1>";
          var breakCalories = calorieCount(result[0]["foods"]);

          for (var i = 0; i < result[0]["foods"].length; i++){
            breakfast += `<p>${result[0]["foods"][i].name}:  ${result[0]["foods"][i].calories} calories</p>`
          };

          $( "#breakfast" ).html(
          `<p class='container' id='container-breakfast'> ${breakfast} Total Calories: ${breakCalories} <br> Calories Left: ${calculateGoal(breakCalories)}</p>`)


          var lunch = "<h1>Lunch</h1>";
          var lunchCalories = calorieCount(result[1]["foods"]);
          for (var i = 0; i < result[1]["foods"].length; i++){
            lunch += `<p>${result[1]["foods"][i].name}:  ${result[1]["foods"][i].calories} calories</p>`
          };
          $( "#lunch" ).html(
          `<p class='container' id='container-lunch'> ${lunch} Total Calories: ${lunchCalories} <br> Calories Left: ${calculateGoal(lunchCalories)}</p>`)

          var dinner = "<h1>Dinner</h1>";
          var dinnerCalories = calorieCount(result[2]["foods"]);
          for (var i = 0; i < result[2]["foods"].length; i++){
            dinner += `<p>${result[2]["foods"][i].name}:  ${result[2]["foods"][i].calories} calories</p>`
          };
          $( "#dinner" ).html(
          `<p class='container' id='container-dinner'> ${dinner} Total Calories: ${dinnerCalories} <br> Calories Left: ${calculateGoal(dinnerCalories)}</p>`)

          var snack = "<h1>Snack</h1>";
          var snackCalories = calorieCount(result[3]["foods"]);
          for (var i = 0; i < result[3]["foods"].length; i++){
            snack += `<p>${result[3]["foods"][i].name}:  ${result[3]["foods"][i].calories} calories</p>`
          };
          $( "#snack" ).html(
          `<p class='container' id='container-snack'> ${snack} Total Calories: ${snackCalories} <br> Calories Left: ${calculateGoal(snackCalories)}</p>`)
      },
      error: function(response) {
        alert(response.responseJSON.error);
      }
    })
  };

  function getAllMealsByDate() {
    $.ajax({
      type: 'GET',
      url: "https://damp-garden-70659.herokuapp.com/api/v1/dates/meals",
      success: function(results) {
        results.forEach(function(day) {
          $( ".calendar" ).append(
          `<p class='container' id='container-date'> ${formatDate(day.date)}</p>`)
          var mealName = '';
          day.meals.forEach(function(meal) {
            mealName += `<p>${meal.name}: ${meal.foods[0].name} -  ${meal.foods[0].calories} calories</p>`
          });
          $( ".calendar" ).append(`<div class='date-cards'>${mealName}</div>`)
        })
      },
        error: function(response) {
          alert(response.responseJSON.error);
        }
    });
}

  var allFoods = {
    list: [],
    foodId: 0,
  }

  var allDates = {
    list: [],
    dateId: 0,
  }

  function formatDate(date) {
    return date.slice(0, 10);
  }

  function dateSort(arr) {
    arr.sort(function(a, b){
    var dayA = formatDate(a.day), dayB = formatDate(b.day)
    if (dayA < dayB)
        return -1
    if (dayA > dayB)
        return 1
    return 0
    })
    return arr
  }

  function toAlphabetize(arr) {
    arr.sort(function(a, b){
    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
    if (nameA < nameB)
        return -1
    if (nameA > nameB)
        return 1
    return 0
    })
    return arr
  }
var allFoods = {
  list: [],
  foodId: 0,
}

var allDates = {
  list: [],
  dateId: 0,
}

function formatDate(date) {
  return date.slice(0, 10);
}

function toAlphabetize(arr) {
  arr.sort(function(a, b){
  var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
  if (nameA < nameB)
      return -1
  if (nameA > nameB)
      return 1
  return 0
  })
  return arr
}
