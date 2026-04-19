const express = require('express');
const requestRouter = express.Router();
const { ConnectionRequestModel } = require('../models/ConnectionRequest');
const { UserModel } = require('../models/user');
const logger = require("../middleware/log");
const { userToken } = require("../middleware/token");

// Sent a connection request
requestRouter.post('/request/send/:status/:receiverId', logger, async (req, res) => {
    try {
        const user = req.user; // Assuming you have user authentication middleware
        const senderId = user._id;
        const receiverId = req.params.receiverId;
        const status = req.params.status;

        // receiver user is exist or not
        const receiverUser = await UserModel.findById(receiverId);
        if (!receiverUser) {
            return res.status(404).json({
                message: 'Receiver user not found',
                success: false,
            });
        }

        // Status check
        const allowedStatuses = ["IGNORED", "INTERESTED"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status. Allowed values are: ' + allowedStatuses.join(', '),
                success: false,
            });
        }

        // Existing connection request check
        const existingRequest = await ConnectionRequestModel.findOne({
            sender: senderId,
            receiver: receiverId,
        });

        if (existingRequest) {
            throw new Error('Connection request already exists between sender and receiver.');
        }

        const connectionRequest = new ConnectionRequestModel({
            sender: senderId,
            receiver: receiverId,
            status: status
        });

        const savedRequest = await connectionRequest.save();
        res.status(200).json({
            message: user.firstName + ' is ' + status + ' in ',
            data: savedRequest,
            success: true,
        });
    } catch(error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
});

// Review a connection request (Accept or Reject)
requestRouter.post('/request/review/:status/:requestId', logger, async (req, res) => {
    try {
        const user = req.user; // Assuming you have user authentication middleware
        const { status, requestId } = req.params;

        // Validate Status
        const allowedStatuses = ["ACCEPTED", "REJECTED"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status. Allowed values are: ' + allowedStatuses.join(', '),
                success: false,
            });
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: user._id
        });

        if (!connectionRequest) {
            return res.status(404).json({
                message: 'Connection request not found',
                success: false,
            });
        }
        connectionRequest.status = status;
        const updatedRequest = await connectionRequest.save();

        res.status(200).json({
            message: 'Connection request status updated to ' + status,
            data: updatedRequest,
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
        });
    }
});

module.exports = requestRouter;