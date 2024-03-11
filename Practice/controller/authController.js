const { PrismaClient } = require('@prisma/client');
const prisma = require('../prisma/prisma');
const AuthService = require('../services/authService');

const authService = new AuthService(prisma);

// Controller method for user login
const login = async (req, res) => {
    try {
        const { username, password , email} = req.body;
        const token = await authService.loginUser(username, email,password); // Corrected method name to loginUser
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller method for user signup
const signup = async (req, res) => {
    try {
        const {username, email, password,name } = req.body;
        const user = await authService.registerUser(username,email, password, name); 
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message, message: 'Failed to register user'});
    }
};

module.exports = {
    login,
    signup,
};
