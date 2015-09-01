---
layout: post
title:  "A stupidly simple Node.js API"
date:   2015-07-30 19:59:17
image: "/images/nodejs.png"
---

In recent years, node.js has gained huge popularity with front-end developers looking to build dynamic server-side applications. The familiarity of Javascript and speed of development makes it a perfect introduction for front-end engineers who are looking to enter the world of back-end development. In this tutorial, I will introduce a simple API mechanism for your projects.

## Dependencies

To build our API, we'll be using two Node packages to save us some code. If you haven't already installed Node, <a href="https://nodejs.org/download/">now would be a good time to do so</a>.

Create a new directory called `app` and paste the following into a new file called `package.json`:
	
	{
	    "name": "my-restaurant-api",
	    "description": "Fetches local restuarants & ratings",
	    "main": "main.js",
	    "dependencies": {
	        "express": "~4.0.0",
	        "body-parser": "~1.0.1"
	    }
	}

A `package.json` file contains meta data about your app. Most importantly, it lets Node know which packages your app needs:

- **Express** is a node framework which will save us from writing our own web server code.
- **bodyParser** will allow us to examine the parameters of incoming http requests.

Now Node's Package Manager (npm) knows which packages to install. Open your terminal, navigate to your `app` directory and enter:

	>> npm install

## The API

Your `app` folder should now contain the `package.json` file and a `node_modules` directory that was created by npm in the last step. Create a new file called `main.js`:

``` javascript
//==================================================
// main.js
// -------------------------------------------------
//  This script will handle our API requests: 
//  GET, POST and DELETE
//==================================================

// first, import (or 'require') our packages
var express    = require('express');
var bodyParser = require('body-parser');

// our restaurant database
var restaurants = {
    "Thai Tanic":"★★★★",
    "Seoul Train":"★★★★★",
    "A Pizza my Mind":"★★★",
    };

// create a new express server
var app = express();

// define the port which we will listen for requests
var port = 1337;

// tell app we want to receive the body of requests 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// if a GET request to the "/" homepage is received, 
// respond with the restaurants array
app.get("/",function(req, res) {
    res.json(restaurants);
});

// start listening for requests
app.listen(port);
console.log('Waiting for requests on port ' + port);
```

If you've made it this far, congratulations! You (technically) have an API. Sure, you can't add or delete or change anything, but it's a pretty good start. Open your terminal and start the server!

```
>> node main.js
```

You can now see your API in action by visiting <a href="http://localhost:1337">http://localhost:1337</a>. Your browser should display your static list of restaurants. Easy, right? Let's make it a little more dynamic...

## Handling POST Requests

``` javascript
// main.js

// ...

// if a POST request to the "/" homepage is received,
// take the rName and rRating from the request and
// add it to our restuarant list.
app.post("/",function(req, res) {
	restaurants[req.body.rName] = req.body.rRating
    res.json({req.body.rName : req.body.rRating});
});

// start listening for requests
app.listen(port);
console.log('Waiting for requests on port ' + port);
```

Now users can GET and POST items to and from our 'database'. The <a href="https://www.getpostman.com/">Postman</a> browser extension is a great way to send different HTTP requests to your API. By sending `rName` and `rRating` values in your requests you will be able to add different restaurants to your list.

> Try and build a request handler for the DELETE requests by using the `app.delete()` handler.

## Building a server-side model

Our API allows us to look up restaurant ratings, but doesn't provide a whole lot more. As we increase the complexity of our model, we will want to follow a more object-oriented approach to our code. In a new directory called `model`, create a new file `Restaurant.js`:

``` javascript
//==================================================
// Restaurant.js
// -------------------------------------------------
//  Model for Restaurant objects
//==================================================

// define a constructor for a new Restaurant()
function Restaurant(name, rating, food) {
	this.name = name;
	this.rating = rating;
	this.food = food;
}

// export the constructor to files that import this
// script so they can construct a new Restaurant()
module.exports = Restaurant;
```

Now your `main.js` server can populate the restaurant list with `new Restaurant()` objects, instead of simple key/value pairs.

Remember to import your new model constructor into main.js by calling: `var Restaurant = require('./models/Restaurant');`


## Taking it further

This article provides you with enough information to build a simple Node API. However it doesn't provide you with any file persistence for your database. <a href="http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/">Christopher Buecheler</a> has written an excellent article describing how to set up a mongoDb database with your Node app.  