require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');

const app = express();

const PORT = process.env.PORT || 9000;

//Here you can add your routes
//Here's an example
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.listen(PORT, () => {
    console.log(`Server listening on the port  ${PORT}`);
})