const mongoose = require('mongoose')

const connectDb= async()=>{
    try {
        const connectionString = await mongoose.connect(process.env.mongoUrl,()=>{
            console.log("connected to mongo db");
        });
        console.log(`MongoDb connected : ${connectionString.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDb;