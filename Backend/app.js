require('dotenv').config()
require('./db/conn')
const express = require("express")
const app = express()
const PORT = 8009
const router = require('./routes/router')



app.use(router)


app.get("/", (req,res) =>{
    res.json("Hello from get page 123")
})

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})