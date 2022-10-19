require('dotenv').config()
require('./db/conn')
const express = require("express")
const app = express()
const PORT = 8009
const router = require('./routes/router')

const cors = require("cors")
app.use(express.json())
app.use(cors())

app.use(router)


// app.get("/", (req,res) =>{
//     res.json("Hello from get page 123")
// })

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})