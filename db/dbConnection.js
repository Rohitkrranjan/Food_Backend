const mongoose = require("mongoose");
const URL = 'mongodb://localhost:27017/MERN_Food';

mongoose.connect(URL, {
    // useUnifiedTopology:true,
    // useNewUrlParser:true
  });

let db = mongoose.connection;

db.on("connected", async() => {
  console.log(`Mongo DB connection successfully`);
})

db.on("error", () => {
  console.log(`Mongo DB connection failed`);
});


module.exports = mongoose;
