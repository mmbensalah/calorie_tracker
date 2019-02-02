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
      if(food.name == selectedFood) {
        allFoods.foodId = food.id
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
      var contents = "";
      for (var i = 0; i < result.length; i++){
        contents += `<option>${result[i].name}</option>`
      };
        $( ".get-all-foods" ).html(
        `<span>Food List: <select class='field' id='foods-list'> ${contents}</select></span>`)
    }
  });
};

window.onload = getAllFoods();

var allFoods = {
  list: [],
  foodId: 1
}
