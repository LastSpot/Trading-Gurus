require("dotenv").config();

const { currencySchema } = require('./schemas/currency')
const { adminSchema } = require('./schemas/admin')
const { userSchema } = require('./schemas/user')

const express = require('express');
const cors = require('cors');

const currencyRoutes = require('./routes/currency');
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')

const app = express();
const PORT = process.env.PORT || 3000;

// Schemas initialization
currencySchema()
adminSchema()
userSchema()

// middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// ROUTES
app.use('/currency', currencyRoutes)
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server listening on the port ${PORT}`);
})