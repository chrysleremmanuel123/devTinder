const express = require("express")
const app = express()

app.use("/test", (req, res) => {
    res.send("Hello from test url")
})

app.use("/", (req, res) => {
    res.send("Hello from server")
})

app.listen(8000, () => {
    console.log("Server listening to port 8000")
})
