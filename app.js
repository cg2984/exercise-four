//adding express to the app.js file and returns an object that is an instacne of the package express
const express = require('express');

const app = express();
//we need to change the port to be a variable so that heroku can set it for us
//if there is a port val then do that or (if that isnt there) use port 4000
let port = process.env.PORT || 4000;

//the function recieves two arguements, the path and the arrow function
//req = request res = response
app.get('/', (req, res) => res.send('Hello Clara, I am Sentient!'))

//function is express object 
//the two arguements are the port you have and a console log
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
