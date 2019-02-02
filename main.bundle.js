/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	$(document).ready(function () {
	  $("#btn-post-submit").on('click', function () {
	    var food = $("#field-post-food").val();
	    var calories = $("#field-post-calories").val();
	    $.ajax({
	      type: 'POST',
	      url: "https://damp-garden-70659.herokuapp.com/api/v1/foods",
	      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	      data: { "name": food, "calories": calories },
	      success: function success(result) {
	        getAllFoods();
	        alert("Your " + food + " has been added");
	      }
	    });
	  });

	  $(".get-all-foods").change(function () {
	    var selectedFood = $("#foods-list option:selected").val();
	    allFoods.list.forEach(function (food) {
	      if (food.name == selectedFood.split(":")[0]) {
	        allFoods.foodId = food.id;
	      }
	    });
	  });

	  $("#btn-patch").on('click', function () {
	    $("#inputs-patch-food").show();
	  });

	  $("#btn-patch-submit").on('click', function () {
	    var food = $("#field-patch-food").val();
	    var calories = $("#field-patch-calories").val();
	    $.ajax({
	      type: 'PATCH',
	      url: "https://damp-garden-70659.herokuapp.com/api/v1/foods/" + allFoods.foodId,
	      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	      data: { "name": food, "calories": calories },
	      success: function success(result) {
	        alert("Your " + food + " has been updated");
	        getAllFoods();
	        $("#inputs-patch-food").hide();
	      },
	      error: function error(response) {
	        alert(response.responseJSON.error);
	      }
	    });
	  });
	});

	function getAllFoods() {
	  $.ajax({
	    type: 'GET',
	    url: "https://damp-garden-70659.herokuapp.com/api/v1/foods",
	    success: function success(result) {
	      allFoods.list = result;
	      var contents = "<option>Select Food</option>";
	      for (var i = 0; i < result.length; i++) {
	        contents += "<option>" + result[i].name + ":  " + result[i].calories + " calories</option>";
	      };
	      $(".get-all-foods").html("<select class='field' id='foods-list'> " + contents + "</select>");
	    }
	  });
	};

	window.onload = getAllFoods();

	var allFoods = {
	  list: [],
	  foodId: 0
	};

/***/ })
/******/ ]);