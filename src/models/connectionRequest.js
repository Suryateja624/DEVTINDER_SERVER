const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  senderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["INTERESTED", "REJECTED", "ACCEPTED", "IGNORED"],
      message: "Status must be one of: INTERESTED, REJECTED, ACCEPTED, IGNORED",
    }
  },
},
{
  timestamps: true,
});

// Index to ensure that a user cannot send multiple connection requests to the same user.
// Index to optimize queries that filter by senderUserId and receiverUserId.
connectionRequestSchema.index({ senderUserId: 1, receiverUserId: 1 });

// pre means to run the function before an operation to the database. 
// Args: What Operation? How to do the operation?
// Middleware
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if (connectionRequest.senderUserId.equals(connectionRequest.receiverUserId)) {
    throw new Error("Sender and receiver cannot be the same user.");
  }

  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);