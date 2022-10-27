import "dotenv/config";
import express, { application } from "express";

const app = express();

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const PORT = process.env.PORT || 8000;

//Middlewares
app.use(express.json()); //express req res
app.use(cors()); // import environment of the apps
app.use(helmet()); // prevent serverside attack
app.use(morgan("dev"));

// mongoDB connect
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

//ROUTES
import userRouter from "./src/routes/userRouter.js";

app.use("/api/v1/user", userRouter);

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "You have reached the server API",
  });
});

//Error handling
app.use((error, req, res, next) => {
  res.status(error.status || 400);

  res.json({
    status: "error",
    message: error.message,
  });
});

// bound the app with the port to server the internet
app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`Server is running  on http://localhost:${PORT}`);
});
