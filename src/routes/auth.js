const express = require("express")
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailID, password } = req.body;
    //encryption of password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //creating a new intance of user
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: hashedPassword,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    // Extract email and pass from req
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("Invalid email ID");
    }
    // Check if email and pass is correct
    const isPasswordValid = await user.validatePassword(password)

    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT()
      console.log("token", token);
      // Add the token to the cookie and send the response back to the server
      res.cookie("token", token,{
        expires: new Date(Date.now() + 8 * 3600000)
      });
      res.send(user);
    } else {
      throw new Error("Incorrect password");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

authRouter.post("/logout", async(req,res) => {
    res.cookie("token",null,{
        expires : new Date(Date.now())
    })
    res.send("User logged out successfully")
})


module.exports = authRouter