const express = require('express');
const app = express();
const connectDb = require("./models/db")
const cors = require("cors");
const Authrouter = require("./routes/authRouter");
const productrouter = require("./routes/productRouter")

require('dotenv').config();
connectDb();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

app.get('/ping' , (req , res)=>{
    res.send('PONG');

})

app.use('/auth' , Authrouter)
app.use('/products' , productrouter)


app.listen(PORT , ()=>{
    console.log(`Server is running on PORT : ${PORT}`);
})

