const express = require('express');
const {
    login,
    signup
} = require('../controller/authController');
const router = express.Router();

// Login route
router.post("/signup", signup);

router.post("/login", login);

module.exports = router;