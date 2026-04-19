const express = require('express');
const userRouter = express.Router();
const { userToken } = require("../middleware/token");
const { ConnectionRequestModel } = require('../models/ConnectionRequest');

// API to fetch all the connection requests received by the logged-in user with status "INTERESTED"
userRouter.get('/user/requests/recieved', userToken, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequestModel.find({ receiverUserId: loggedInUser._id, status: "INTERESTED" })
            .populate('senderUserId', 'firstName lastName email about age gender skills'); // Populate sender user details

        if (connectionRequests) {
            return res.status(200).json({
                connectionRequests,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
});

// API to fetch all the connections of the logged-in user (both sent and received) with status "ACCEPTED"
userRouter.get('/user/connections', userToken, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { senderUserId: loggedInUser._id, status: "ACCEPTED" },
                { receiverUserId: loggedInUser._id, status: "ACCEPTED" }
            ]
        })
        .populate('senderUserId', 'firstName lastName email about age gender skills');

        const data = connectionRequests.map(request => {
            if (request.senderUserId._id.toString() === loggedInUser._id.toString()) {
                return request.receiverUserId;
            }

            return request.senderUserId;
        });

        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
});

// API to fetch all the users who are not connected to the logged-in user and do not have any pending connection requests with the logged-in user
userRouter.get('/user/feed', userToken, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                { senderUserId: loggedInUser._id },
                { receiverUserId: loggedInUser._id }
            ]
        }).select('senderUserId receiverUserId');
        

        // Fetch users who are not connected to the logged-in user and do not have any pending connection requests with the logged-in user
        const users = await UserModel.find({
            $and: [
                { _id: { $nin: connectionRequest.map(req => req.senderUserId).concat(connectionRequest.map(req => req.receiverUserId)) } },
                { _id: { $ne: loggedInUser._id } }
            ],
        }).select('firstName lastName email about age gender skills');

        res.send(users);
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
});

module.exports = userRouter;