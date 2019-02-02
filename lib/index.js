$( document ).ready(function() {
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

  $("#btn-patch-submit").on('click', function(){
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
});

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

window.onload = getAllFoods();

var allFoods = {
  list: [],
  foodId: 0,
}
