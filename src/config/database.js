const mongoose = require("mongoose")


const connectDB = async() => {
    await mongoose.connect('mongodb+srv://Chrysler:chryal_008@namestenode.vs3y0pi.mongodb.net/devTinder')
}

module.exports = connectDB