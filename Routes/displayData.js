const express = require("express");
const router =  express.Router();
const Food = require("../models/Food_items");
const Category = require("../models/FoodCategory");

router.get('/foodlist',async(req,res)=>{
    const food = await Food.find({})
        res.send(food);
})

// router.get("/list",async(req,res)=>{
//     const category = await Category.findById();
//     res.send(category);
// })

module.exports = router;