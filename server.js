// installed dependencies
const express = require("express");

// initialization
const server = express();
const PORT = process.env.PORT || 5000;

// start
server.listen(PORT,console.log(`Server is listening on port: ${PORT}...`))