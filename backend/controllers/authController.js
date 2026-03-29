const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// REGISTER
const registerUser = async (req, res) => {
    const { userID, nickname, email, password, confirmPassword, type } = req.body;

    try {
        // Check missing fields
        if (!userID || !nickname || !email || !password || !confirmPassword || !type) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check password match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check email exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create user
        const user = await User.create({
            userID,
            nickname,
            email,
            password,
            type
        });

        res.status(201).json({
            id: user.id,
            userID: user.userID,
            nickname: user.nickname,
            email: user.email,
            type: user.type,
            token: generateToken(user.id)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check missing fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({
            id: user.id,
            userID: user.userID,
            nickname: user.nickname,
            email: user.email,
            type: user.type,
            token: generateToken(user.id)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
