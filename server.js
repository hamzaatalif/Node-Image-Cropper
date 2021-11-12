// installed dependencies
const express = require("express");

// local dependencies
const path = require("path");
const fs = require("fs");

// initialization
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.static('public'));

// routes

app.get("/",(req,res)=>{
    res.send(path(__dirname,"/index.html"))
})

// start
app.listen(PORT,console.log(`App is listening on http://localhost:${PORT}/`))