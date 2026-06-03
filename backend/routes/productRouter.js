const express = require("express")
const ensureAuthenticated = require("../middlewares/Auth")


const router = express.Router();
router.get('/' , ensureAuthenticated , (req , res)=>{
    console.log("--------Logged In User Details-----------" , req.user);
    res.status(200).json([
        {
            name : "TV",
            price : 20000
        },
        {
            name : "Fridge",
            price : 50000
        }
    ])
});


module.exports = router;