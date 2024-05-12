require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (signature) => {
    try {
        const decode = jwt.verify(process.env.JWT_SECRET);
        return {'verify': true};
    } catch (error) {
        return {'verify': false};
    }
};