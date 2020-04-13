//adding express to the app.js file and returns an object that is an instacne of the package express
const express = require('express');

//require firebase
const firebase = require("firebase");

const app = express();

//firebase config object
//this is pretty insecure since API key is in the code base 
const firebaseConfig = {
  apiKey: "AIzaSyD5LYwEAkwKVTXpa5A2KZTAmOoMSV6LE7A",
  authDomain: "exercise-four-635e8.firebaseapp.com",
  databaseURL: "https://exercise-four-635e8.firebaseio.com",
  projectId: "exercise-four-635e8",
  storageBucket: "exercise-four-635e8.appspot.com",
  messagingSenderId: "230618305046",
  appId: "1:230618305046:web:052c01d35773fc40bd9b37"
};
//initialize firebase. not scoped, its just running
firebase.initializeApp(firebaseConfig);

//import routes
const indexRoute = require("./routes/index.js");
const postRoute = require("./routes/posts.js");
const createRoute = require("./routes/createArticle.js");

//create base route 
app.use("/", indexRoute);
app.use("/post", postRoute);
app.use("/create", createRoute);


//we need to change the port to be a variable so that heroku can set it for us
//if there is a port val then do that or (if that isnt there) use port 4000
let port = process.env.PORT || 4000;


//function is express object 
//the two arguements are the port you have and a console log
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
