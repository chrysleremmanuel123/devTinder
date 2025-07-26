const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 50 },
    lastName: String,
    emailID: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (
          !validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0, // or reduce this to 0 to allow passwords without special chars
          })
        ) {
          throw new Error("Enter a strong password");
        }
      },
    },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      enum:{
        values:["male","female","others"],
        message:`{VALUE} is invalid type`
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Invalid gender data");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fuxwing.com%2Fdefault-profile-picture-male-icon%2F&psig=AOvVaw2oQAVv9f5D9b_7dbsAXqxK&ust=1751893695624000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiG-OCmqI4DFQAAAAAdAAAAABAU",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL");
        }
      },
    },
    about: { type: String, default: "This is default about of the user" },
    skills: { type: [String] },
  },
  { timestamps: true }
);

UserSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

UserSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isValidPassword;
};

module.exports = mongoose.model("User", UserSchema);
