const userModel = require("../models/user");

const addExpense = async (req , res)=>{
    

   
    try {
    const body = req.body;
    const { id } = req.user
   
    const userData = await userModel.findByIdAndUpdate(id , { $push : {expenses : body} }, {new : true})
    return res.status(200).json({
        message : "Expenses added successfully .",
        success : true,
        data : userData?.expenses

    })
        
    } catch (err) {
        return res.status(500).json({
            message : "Something went wrong",
            error : err,
            success : false
        })
        
    }
   

}
const fetchAllExpense = async (req ,res)=>{
    
   
    try {
    const body = req.body;
    const { id } = req.user
   
    const userData = await userModel.findById(id).select('expenses')
    return res.status(200).json({
        message : "Expenses added successfully .",
        success : true,
        data : userData?.expenses

    })

        
    } catch (err) {
        return res.status(500).json({
            message : "Something went wrong",
            error : err,
            success : false
        })
        
    }
}
const deleteExpense = async (req , res)=>{
    try {
    const body = req.body;
    const { id } = req.user;
    const { expenseId } = req.params;
   
    const userData = await userModel.findByIdAndUpdate(id , { $pull : {expenses : {_id : expenseId }} }, {new : true})
    return res.status(200).json({
        message : "Expenses deleted successfully .",
        success : true,
        data : userData?.expenses

    })
        
    } catch (err) {
        return res.status(500).json({
            message : "Something went wrong",
            error : err,
            success : false
        })
        
    }
}

module.exports = {
    addExpense,
    fetchAllExpense,
    deleteExpense
}