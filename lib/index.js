$( document ).ready(function() {

  $("#btn-show-foods").on('click', function(){
    $(".foods").show();
    $(".diary-all").hide();
    $(".calendar").hide();
    getAllFoods();
  });

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
        alert(`Your ${food} has been added`);
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
  });

  $("#btn-patch-submit-food").on('click', function(){
    var food = $("#field-patch-food").val()
    var calories = $("#field-patch-calories").val()
    $.ajax({
      type: 'PATCH',
      url: `https://damp-garden-70659.herokuapp.com/api/v1/foods/${allFoods.foodId}`,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: { "name": food, "calories": calories },
      success: function(result) {
        alert(`Your ${food} has been updated`);
        getAllFoods();
        $("#inputs-patch-food").hide();
      },
      error: function(response) {
        alert(response.responseJSON.error);
      }
    });
  });

  $("#btn-delete").on('click', function() {
    $.ajax({
      type: 'DELETE',
      url: `https://damp-garden-70659.herokuapp.com/api/v1/foods/${allFoods.foodId}`,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function(result) {
        alert("Your food has been deleted");
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
        alert("Date has been added");
        getAllDates();
      },
      error: function(response) {
        alert(response.responseJSON.error);
      }
    })
  })

  $("#btn-get-date").on('click', function() {
    $(".all-meals").show();

    var day = $("#dates-list :selected").val();
    $('#dropDownId :selected').text();
    $.ajax({
      type: 'GET',
      url: `https://damp-garden-70659.herokuapp.com/api/v1/dates/${day}/meals`,
      success: function(result) {
          var breakfast = "<h1>Breakfast</h1>";
          for (var i = 0; i < result[0]["foods"].length; i++){
            breakfast += `<p>${result[0]["foods"][i].name}:  ${result[0]["foods"][i].calories} calories</p>`
          };
          $( "#breakfast" ).html(
          `<p class='container' id='container-breakfast'> ${breakfast}</p>`)

          var lunch = "<h1>Lunch</h1>";
          for (var i = 0; i < result[1]["foods"].length; i++){
            lunch += `<p>${result[1]["foods"][i].name}:  ${result[1]["foods"][i].calories} calories</p>`
          };
          $( "#lunch" ).html(
          `<p class='container' id='container-lunch'> ${lunch}</p>`)

          var dinner = "<h1>Dinner</h1>";
          for (var i = 0; i < result[2]["foods"].length; i++){
            dinner += `<p>${result[2]["foods"][i].name}:  ${result[2]["foods"][i].calories} calories</p>`
          };
          $( "#dinner" ).html(
          `<p class='container' id='container-dinner'> ${dinner}</p>`)

          var snack = "<h1>Snack</h1>";
          for (var i = 0; i < result[3]["foods"].length; i++){
            snack += `<p>${result[3]["foods"][i].name}:  ${result[3]["foods"][i].calories} calories</p>`
          };
          $( "#snack" ).html(
          `<p class='container' id='container-snack'> ${snack}</p>`)
      },
      error: function(response) {
        alert(response.responseJSON.error);
      }
    })
  })

  function getAllFoods() {
    $.ajax({
      type: 'GET',
      url: "https://damp-garden-70659.herokuapp.com/api/v1/foods",
      success: function(result) {
        allFoods.list = result
        var contents = "<option>Select Food</option>";
        for (var i = 0; i < result.length; i++){
          contents += `<option>${result[i].name}:  ${result[i].calories} calories</option>`
        };
          $( ".get-all-foods" ).html(
          `<select class='field' id='foods-list'> ${contents}</select>`)
      }
    });
  };

  function getAllDates() {
    $.ajax({
      type: 'GET',
      url: "https://damp-garden-70659.herokuapp.com/api/v1/dates",
      success: function(result) {
        const results = result["dates"]
        allDates.list = results
        var contents = "<option>Select Date</option>";
        for (var i = 0; i < results.length; i++){
          contents += `<option>${formatDate(results[i].day)}</option>`
        };
          $( ".get-all-dates" ).html(
          `<select class='field' id='dates-list'> ${contents}</select>`)
      }
    });
  }

  function getAllMealsByDate() {
    $.ajax({
      type: 'GET',
      url: "https://damp-garden-70659.herokuapp.com/api/v1/dates/meals",
      success: function(results) {
        results.forEach(function(day) {
          $( ".date-meal" ).append(
          `<div class="field" id="date"><p class='container' id='container-date'> ${formatDate(day.date)}</p></div>`)

          day.meals.forEach(function(meal) {
            var mealName = `<h1>${meal.name}</h1>
            <div class='calendar-card' id=${meal.name}><p>${meal.foods[0].name}:  ${meal.foods[0].calories} calories</p></div>`
            });
            $( ".all-dates-meals" ).append(mealName)
          })
        },
        error: function(response) {
          alert(response.responseJSON.error);
        }
      });
}

  window.onload = $(".foods").hide();
  window.onload = $(".diary-all").hide();
  window.onload = $(".all-meals").hide();
  window.onload = $(".calendar").hide();


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

});
