const express = require("express");

const connectToDatabase = require("./src/config/database");
const authRouter = require("./src/routes/auth");
const usersRouter = require("./src/routes/users");
const requestRouter = require("./src/routes/request");
const profileRouter = require("./src/routes/profile");
const userRouter = require("./src/routes/user");

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
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
