//adding express to the app.js file and returns an object that is an instacne of the package express
const express = require('express');
//require firebase
const firebase = require("firebase");
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

//initialize firebase
firebase.initializeApp(firebaseConfig);

//initializing firestore database
const db = firebase.firestore();

//collection
const blogposts = db.collection("blogposts");

//array to put the posts in
let blogpostsArray = [];

//getting all blog posts
const allBlogposts = blogposts.get()
//this is a promise
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
			//pushing the data to the blogpost array
			//for each piece of data in the database, it is pushed to the array
			//push document into array each time the query loops over existing articles
			//this is done w/ the forEach function
			blogpostsArray.push(doc.data());
		});
	})
	.catch(function (error) {
		console.log("Error:", error)
	});

//getting single blog post
//the id that you are going to get 
const documentToGet = "sample-post";
const singleBlogPost = blogposts.doc(documentToGet)
	.get()
	.then(function(doc){
		//.exsists is a firestore thing
		if(doc.exists){
		console.log("document data:", doc.data());
		} else{
		//doc data will be undefined
		console.log("no such document");
		}
	})
	.catch(function (error) {
		console.log("Error:", error)
	});

const indexRoute = require("./routes/index.js");
const postRoute = require("./routes/post.js");
const createRoute = require("./routes/createArticle.js");

const app = express();
//we need to change the port to be a variable so that heroku can set it for us
//if there is a port val then do that or (if that isnt there) use port 4000
let port = process.env.PORT || 4000;

//the function recieves two arguements, the path and the arrow function
//req = request res = response
//sending the array that we get from firestore to the server and displaying it on the browser 
app.get('/', (req, res) => res.send(blogpostsArray));

//function is express object 
//the two arguements are the port you have and a console log
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
