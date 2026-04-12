const express = require("express");

const connectToDatabase = require("./src/config/database");
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/users");
const app = express();

app.use(express.json());

app.use("/", authRouter);
app.use("/", userRouter);


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
