const express = require('express');
const profileRouter = express.Router();
const { userToken } = require('../middleware/token');
const { logger } = require('../middleware/log');

// Profile API returns the profile details of logged in user
profileRouter.get('/profile/view', userToken, logger, async (req, res) => {
    const user = req.user; // Assuming you have user authentication middleware
    res.send(user);
});


profileRouter.post('/profile/edit', userToken, logger, async (req, res) => {
    try {
        const loggedInUser = req.user; // Assuming you have user authentication middleware
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });

        await loggedInUser.save();
        res.json({
            message: "Profile updated successfully",
            data: loggedInUser,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
});

module.exports = profileRouter;