# Calorie Tracker

## Basic Overview

Calorie Tracker allows a user to quickly and easily track their caloric intake each day and track their progress over time.  The app is broken up into three sections:  Foods, Diary, and Calendar. (see images below).  Within the Foods section, a user can view all available foods in the system and update/delete a specific food.  Once the user has access to all of the foods they have eaten that day, they can hop over to the Diary section.  Within the Diary section, the user can add or select a Date they would like to track (the app does allow for back-dating).  Once the Date is selected, the user can select different foods and apply them to different meals throughout that specified Date.  As the user adds foods to a specific Meal, they can see the remaining calories left for that meal.  The user can also delete a food from a meal.  In the Calendar section, the user can view a historical record of their foods consumed based on meal and date.  

Calorie Tracker consumes a backend API created in Express.  
* Github Repo to Backend:  <https://github.com/bdiveley/quantified_self>.
* Backend Deployed Site (sample endpoint):  <https://damp-garden-70659.herokuapp.com/api/v1/foods>.

### Initial Setup

1. Clone this repository locally

  ```shell
  git clone git@github.com:mmbensalah/calorie_tracker.git
  ```

2. Install the dependencies

  ```shell
  npm install
  ```

### Running the Server Locally

To see your code in action locally, you need to fire up a development server. Use the command:

```shell
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:8080/` to run your application.

### Running the Server in Production

This site is served from GitHub Pages in production.

 <https://mmbensalah.github.io/calorie_tracker/>.

### Built With

* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://chaijs.com/)

### Developers

* Miriam Bensalah - <https://github.com/mmbensalah>
* Bailey Diveley - <https://github.com/bdiveley>

### Project Board

 <https://github.com/bdiveley/quantified_self/projects/1>.

### Images of the application

# Landing Page
![alt text](/assets/landing_page.png)

# Foods Section (with basic CRUD functionality)
![alt text](/assets/foods.png)
![alt text](/assets/foods_index.png)

# Diary Section
![alt text](/assets/diary.png)
![alt text](/assets/date_selection.png)
![alt text](/assets/meals.png)
![alt text](/assets/add_meal.png)

# Calendar Section
![alt text](/assets/calendar.png)
