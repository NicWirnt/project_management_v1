import express from "express";
import { encryptPassword } from "../helpers/bcrypthelper.js";
import { newUserValidation } from "../middlewares/joi_validation/userValidation.js";
import { getUser, insertUser } from "../models/user/user.model.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = await getUser();

    if (user?._id) {
      res.json({
        status: "success",
        message: "User have been successful fetch",
        user,
      });
    } else
      res.json({
        status: "error",
        message: "Error getting user, please try again later",
      });
  } catch (error) {
    next(error);
  }
});

router.post("/", newUserValidation, async (req, res, next) => {
  try {
    const hashpassword = encryptPassword(req.body.password);

    req.body.password = hashpassword;

    const result = await insertUser(req.body);
    console.log(result);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "You have successfully created a new user, please login now",
      });
    }

    res.json({
      status: "error",
      message: "Error creating a new user, please contact administrator",
    });
  } catch (error) {
    error.status = 500;
    if (error.message.includes("E11000 duplicate key")) {
      error.message = "Email already exists, please use different email";
      error.status = 200;
    }

    next(error);
  }
});

router.delete("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "you have reached the user DELETE end point",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
