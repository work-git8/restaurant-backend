const express = require('express');
const cors = require('cors');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './BD4_Assignment_1/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Endpoint 1 : Objective: Fetch all restaurants from the database.Query Parameters: None.Tasks: Implement a function to fetch all restaurants.
const fetchAllRestaurants = async () => {
  let query = 'select * from restaurants';
  let response = await db.all(query, []);
  return response;
};
app.get('/restaurants', async (req, res) => {
  try {
    let result = await fetchAllRestaurants();
    if (result.length === 0) {
      res.status(404).json({
        message: 'no restaurants found',
      });
    }
    res.status(200).json({ restaurants: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Endpoint 2 : Objective: Fetch a specific restaurant by its ID.Query Parameters:id (integer).Tasks: Implement a function to fetch a restaurant by its ID.
const fetchRestaurantById = async (id) => {
  let query = 'select * from restaurants where id = ?';
  let response = await db.all(query, [id]);
  return response;
};
app.get('/restaurants/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await fetchRestaurantById(id);
    if (result.length === 0) {
      res.status(404).json({
        message: 'no restaurants found',
      });
    }
    res.status(200).json({ restaurants: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Endpoint 3 : Objective: Fetch restaurants based on their cuisine.Query Parameters:cuisine (string).Tasks: Implement a function to fetch restaurants by cuisine.
const fetchRestaurantsByCuisine = async (cuisine) => {
  let query = 'select * from restaurants where cuisine = ?';
  let response = await db.all(query, [cuisine]);
  return response;
};
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let result = await fetchRestaurantsByCuisine(cuisine);
    if (result.length === 0) {
      res.status(404).json({
        message: 'no restaurants found serving cuisine ' + cuisine,
      });
    }
    res.status(200).json({ restaurants: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Endpoint 4 : Objective: Fetch restaurants based on filters such as veg/non-veg, outdoor seating, luxury, etc.Query Parameters:isVeg (string), hasOutdoorSeating (string), isLuxury (string).Tasks: Implement a function to fetch restaurants by these filters.
const filterRestaurants = async (isVeg, hasOutdoorSeating, isLuxury) => {
  let query =
    'select * from restaurants where isVeg = ? and hasOutdoorSeating = ? and isLuxury = ?';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return response;
};
app.get('/restaurants/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let result = await filterRestaurants(isVeg, hasOutdoorSeating, isLuxury);
    if (result.length === 0) {
      res.status(404).json({
        message: 'no restaurants found',
      });
    }
    res.status(200).json({ restaurants: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Endpoint 5 : Objective: Fetch restaurants sorted by their rating ( highest to lowest ).Query Parameters: None.Tasks: Implement a function to fetch restaurants sorted by rating.
const fetchAllRestaurantsOrderedRating = async () => {
  let query = 'select * from restaurants order by rating desc';
  let response = await db.all(query, []);
  return response;
};
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchAllRestaurantsOrderedRating();
    if (result.length === 0) {
      res.status(404).json({
        message: 'no restaurants found',
      });
    }
    res.status(200).json({ restaurants: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Endpoint 6 : Objective: Fetch all dishes from the database.Query Parameters: None.Tasks: Implement a function to fetch all dishes.
const fetchAllDishes = async () => {
  let query = 'select * from dishes';
  let response = await db.all(query, []);
  return response;
};
app.get('/dishes', async (req, res) => {
  try {
    let result = await fetchAllDishes();
    if (result.length === 0) {
      res.status(404).json({
        message: 'no dishes found',
      });
    }
    res.status(200).json({ dishes: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Endpoint 7 : Objective: Fetch a specific dish by its ID.Query Parameters:id (integer)Tasks: Implement a function to fetch a dish by its ID.
const fetchDishById = async (id) => {
  let query = 'select * from dishes where id = ?';
  let response = await db.all(query, [id]);
  return response;
};
app.get('/dishes/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await fetchDishById(id);
    if (result.length === 0) {
      res.status(404).json({
        message: 'no dishes found',
      });
    }
    res.status(200).json({ dishes: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Endpoint 8 : Objective: Fetch dishes based on filters such as veg/non-veg.Query Parameters:isVeg (boolean).Tasks: Implement a function to fetch dishes by these filters.
const filterDishes = async (isVeg) => {
  let query = 'select * from dishes where isVeg = ?';
  let response = await db.all(query, [isVeg]);
  return response;
};
app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
    let result = await filterDishes(isVeg);
    if (result.length === 0) {
      res.status(404).json({
        message: 'no dishes found',
      });
    }
    res.status(200).json({ dishes: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Endpoint 9 : Objective: Fetch dishes sorted by their price ( lowest to highest ).Query Parameters: None.Tasks: Implement a function to fetch dishes sorted by price.
const fetchAllDishesSortedPrice = async () => {
  let query = 'select * from dishes order by price';
  let response = await db.all(query, []);
  return response;
};
app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let result = await fetchAllDishesSortedPrice();
    if (result.length === 0) {
      res.status(404).json({
        message: 'no dishes found',
      });
    }
    res.status(200).json({ dishes: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
