const express = require('express')

const router = new express.Router();


router.post("/register", async ( req, res) => {

})

router.post("/login", async ( req, res) => {
    // console.log(req.body)
    res.status(201).json("login api")
})


module.exports = router