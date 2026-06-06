const express = require('express')
const route = express.Router()
const {addExpense , fetchAllExpense, deleteExpense} = require('../controllers/ExpenseController')
route.get('/' , fetchAllExpense)
route.post('/' , addExpense)
route.delete('/:expenseId',deleteExpense)
module.exports = route