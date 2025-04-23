const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use('/auth',authRoutes)
router.use('/users',userRoutes)
router.get('/hello',(req,res)=>{
    res.status(200).send({message:"api Runngin fine"})
})



module.exports = router;