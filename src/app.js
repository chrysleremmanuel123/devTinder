const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cors = require("cors")
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(express.json());
// const User = require("./models/user");
require("./config/database");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// //Get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailID;
//   try {
//     const user = await User.findOne({ emailID: userEmail });
//     if (!user) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.status(404).send("Something went wrong");
//   }
// });

// //Feed API Get all the users from the databse
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //Delete user by ID
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   console.log(userId);
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("User deleted successfully");
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// //Update data of User
// app.patch("/user/:userId", async (req, res) => {
//   const userID = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "age", "gender", "about", "skills"];

//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }
//     const user = await User.findByIdAndUpdate({ _id: userID }, data, {
//       runValidators: true,
//     });
//     console.log(user);
//     res.send("User updated successfully");
//   } catch (error) {
//     res.status(400).send("something went wrong");
//   }
// });


const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/requests')
const userRouter = require('./routes/users');

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter);





connectDB()
  .then(() => {
    console.log("connection established");
    app.listen(8000, () => {
      console.log("Server listening to port 8000");
    });
  })
  .catch((err) => {
    console.log("failed to connect", err);
  });
