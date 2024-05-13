/*Note : 
- Backend handles actions requested from front end 
- Backend provide higher processing power that the browser cannot provide it 
- 
-using "npm init" to initialize a .Json file inside the folder and "-y" is used to skip the questions and fill data automatically 
-when we start the json file the value inside the "main" is by default taken as "index.js" if no js file were found. 
-we will be working on Node.js "Open source" for backend .js considered as an run-time environment (meaning it runs outside the browser "on the terminal")
-"npm" is mainly used to access cloud libraries from Node.Js cloud servers and calls it to my computer.
-i can use npm to install different libraries all in one line just by putting a "Space" in between
-in .Json file "dependencies" add any installed files that i download from Node.Js
-framework is  a set of libraries (a compiler that utilise the use of libraries inside it )
-in the back-end the "console.log" logs on the terminal not the browser
-express library has most used method-request (GET(Read Only) , POST(ADD) , PUT(Update) , DELETE(delete) , REQUIRE , LISTEN)
JSON : java script data notation : one of the ways to save data - it works as a small database 
-res.send(json) // sends whats inside the brakkets on the server frontend
-res.send can be also be res.json // and the difference is that .send (sends it as a string) but .json sends it as (value for key) which means in quotation
Steps : 
1- 
const express = require("express");
const app = express();

2-

*/
'use  strict'
const data = require("./Movie-Data/data.json");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const newMovie = new Movie (data.title,data.poster_path,data.overview)
    res.json(newMovie);
})
    app.get("/favourite", (req, res) => {
        console.log("welcome to Favourite Page");
        res.send("welcome to Favourite Page");
    })


    app.use(handleError404);
    app.use(handleError500);

    function handleError404 (req, res) {
        res.status(404).json({
            "status" : 404,
            "responseText" : "Sorry, Page not found"
        })
    }
    function handleError500 (req, res) {
        res.status(500).json({
            "status" : 500,
            "responseText" : "Sorry, something went wrong"
        })
    }

    

let port = 9000;
app.listen(port, () => {
    console.log(`The server run in the port ${port}`)})

    function Movie (title,poster_path,overview) {
        this.title = title;
        this.poster_path = poster_path;
        this.overview = overview; 
    }

