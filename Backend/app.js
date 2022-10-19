require('dotenv').config()
require('./db/conn')
const express = require("express")
const app = express()
const PORT = 8009
const router = require('./routes/router')
const cors = require("cors")
const cookieParser = require("cookie-parser")

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};


app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser(""))
app.use(router)


// app.get("/", (req,res) =>{
//     res.json("Hello from get page 123")
// })

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})