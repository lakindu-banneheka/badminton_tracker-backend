const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Sign up endpoint
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user with the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Sign up error:', error);
        res.status(500).json({ message: 'Sign up failed' });
    }
});
  
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        } 
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error('Sign in error:', error);
        res.status(500).json({ message: 'Sign in failed' });
    }
});

module.exports = router;
