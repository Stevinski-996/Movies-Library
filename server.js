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


- Express is a framework for managing servers 
- AXIOS(can help express to fetch data) is a library that provides methods of (adding,editing,updating,deleting) for data fetching (usually using Api)
- dotenv library is sensitive data storing file type 
*/
'use  strict'
const data = require("./Movie-Data/data.json");
const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config()
const api_key = process.env.API_KEY
const { Client } = require("pg");
const pg_key = process.env.PG_URL
const client = new Client(pg_key);
app.use(express.json());
// DB 
app.post("/addMovie",handleAddMovie);
app.get("/getMovie",handleGetMovie);

function handleGetMovie (req, res) {
    let sql = `Select * From Movie;`
    client.query(sql).then(result => {
        res.status(200).json(result.rows);
    }).catch(error => {
        handleError500(error, req, res);
    })}

// destructuring (saving time)
function handleAddMovie(req, res) {
    const {title,poster_path,release_date,overview, comment} = req.body;
    const sql =`INSERT INTO Movie (title, poster_path, release_date, overview, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
    let values = [title,poster_path,release_date,overview, comment];
    client.query(sql, values).then(result => {
        res.status(201).json(result.rows);
    }).catch(error => {
        handleError500(error, req, res);
    })}

// creating the Home page
app.get("/", (req, res) => {
    const newMovie = new Movie (data.title,data.poster_path,data.overview)
    res.json(newMovie);
})

// creating Favourite page
app.get("/favourite", (req, res) => {
        console.log("welcome to Favourite Page");
        res.send("welcome to Favourite Page");
})

// creating trending page
app.get("/trending", (req, res) => {
const url="https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US"
axios.get(url)
.then(fadi => {
const filter = fadi.data.results.map(data =>{
    return new Movie(data.id,data.title || data.original_title || data.original_name,data.poster_path,data.release_date || data.first_air_date,data.overview)
})
res.json(filter)})

})

app.get("/search", (req, res) => {
    const  nameMovie = req.query.name_movie;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${nameMovie}&page=2`
    axios.get(url)
    .then(result => {
        const search = result.data.results.map(data =>{
             return new Movie(data.id,data.title || data.original_title || data.original_name,data.poster_path,data.release_date || data.first_air_date,data.overview)
        })
        res.status(200).json(search);
    })
    .catch(error => {
        handleError500(error, req, res)
    })})
    
    app.get("/popular", (req, res) => {
        const url = `https://api.themoviedb.org/3/person/popular?api_key=${api_key}`
        axios.get(url)
        .then(result => {
            const search = result.data.results.map(data =>{
                 return new Movie(data.id,data.title || data.original_title || data.original_name,data.poster_path,data.release_date || data.first_air_date,data.overview)
            })
            res.status(200).json(search);
        })
        .catch(error => {
            handleError500(error, req, res)
        })})

        app.get("/top", (req, res) => {
            const  nameMovie = req.query.name_movie;
            const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`
            axios.get(url)
            .then(result => {
                const search = result.data.results.map(data =>{
                     return new Movie(data.id,data.title || data.original_title || data.original_name,data.poster_path,data.release_date || data.first_air_date,data.overview)
                })
                res.status(200).json(search);
            })
            .catch(error => {
                handleError500(error, req, res)
            })})
    
    

    app.use(handleError404);
    app.use(handleError500);

    function handleError404 (req, res) {
        res.status(404).json({
            "status" : 404,
            "responseText" : "Sorry, Page not found"
        })
    }
    function handleError500 (error, req, res) {
        res.status(500).json({
            "status" : 500,
            "responseText" : error
        })
    }

    
client.connect().then(() => {
let port = 9000;
app.listen(port, () => {
    console.log(`The server run in the port ${port}`)})
})


    function Movie (id,title,poster_path,release_date,overview) {
        this.id = id;
        this.title = title;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.overview = overview; 
    }

