const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    //Read the token from the req cookies
    const { token } = req.cookies;
    if(!token){
        return res.status(401).send("Please login!!!")
    }
    //Validate token
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
    //Find the user
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user
    next();
  } catch (err) {
    res.status(400).send("Bad request" + err.message);
  }
};

module.exports = {
  userAuth,
};
