
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Importing ShoppingList model from another module - from the perspective of server.js, ShoppingList is just an interface we can use to retrieve the current state of our application's shopping list.
const {ShoppingList} = require('./models');
const {Recipes} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at
// When the server first starts, we manually add three items to the shopping list, so there will be something to retrieve
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

Recipes.create('chocolate milk', ['cocoa', 'milk', 'sugar']);

// This sets up a GET endpoint for the route /shopping-list
// when the root of this router is called with GET, return
// all current ShoppingList items
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
  // when a request is made to /shopping-list, the app responds by serializing (transform to JSON) the data returned by ShoppingList.get(), which will be a list of the current shopping list items
});

app.get('/recipes', (req, res) => {
  res.json(Recipes.get());
})

app.listen(process.env.PORT || 8090, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8090}`);
});
