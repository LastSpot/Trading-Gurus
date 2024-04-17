const express = require('express');
const cors = require('cors')
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json())

// ROUTES


app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
})