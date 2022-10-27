import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [20, "First name must be less than 20 character"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [20, "Last name must be less than 20 character"],
    },
    dob: {
      type: Date,
      default: null,
    },
    email: {
      unique: true,
      index: 1,
      type: String,
      required: true,
      trim: true,
    },
    emailValidaitonCode: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: [15, "Phone number must be less than 15 characters"],
      minlength: [10, "Phone number must be at least 10 characters"],
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "N/A",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", UserSchema);
