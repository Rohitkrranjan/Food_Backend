const express = require("express");
const cors = require("cors");
require('./db/dbConnection')

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello this is another project on MERN stack...");
})

app.use('/api',require("./Routes/createUser"));

app.use('/api',require("./Routes/displayData"));

app.use('/api',require("./Routes/OrderData"));

app.listen(PORT,()=>{
    console.log(`server is running at the port number ${PORT}...`);
})

