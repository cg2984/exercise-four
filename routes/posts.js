const express = require("express");
//require firebase
const firebase = require("firebase");
const router = express.Router();
const db = firebase.firestore();
const blogposts = db.collection("blogposts");

module.exports = router;

//this has to be one slash because relative to the route which we already defined in the base route in app.js
//router.get("/:id", (req,res) => res.send("Include an id in the url"));
router.get("/:id", (req,res) => {
	//the id that you are going to get. the id part has to be the same in the "/:part"
	//allows us to use routing to get different without hard coding anything
	const queryId = req.params.id; 
	blogposts.doc(queryId).get()
		.then(function(doc){
			//.exsists is a firestore thing
			if(doc.exists){
				return res.send(doc.data());
			} else{
				return res.send("No Such Document");
			}
		})
		.catch(function (error) {
			return res.send("No Such Document");
		});
});
module.exports = router;


