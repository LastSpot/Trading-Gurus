require("dotenv").config();

const verifyToken = (token) => {
    if (process.env.JWT_SECRET == token) {
        return res.status(200).json({verify: true});
    }
    res.status(400).json({Error: 'Mismatch token'});
};