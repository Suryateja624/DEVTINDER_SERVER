const express = require("express");

const connectToDatabase = require("./src/config/database");
const messageRouter = require("./src/routes/messageRoutes");
const testRouter = require("./src/routes/testRoutes");
const authRouter = require("./src/routes/auth");
const app = express();

app.use(express.json());

app.use("/", messageRouter);
app.use("/", testRouter);
app.use("/", authRouter);

connectToDatabase()
  .then(async () => {
    console.log("Mongo db connected succesfully");
    app.listen(3000, () => {
      console.log("Sever is started.");
    });
  })
  .catch(() => {
    console.log("database connection failed");
  });
