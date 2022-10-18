const express = require("express")
const app = express()
const PORT = 8009

app.get("/", (req,res) =>{
    res.json("Hello from get page 123")
})

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})