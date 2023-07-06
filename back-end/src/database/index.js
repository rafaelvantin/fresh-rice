const mongoose = require("mongoose");


const connectDB= async() => {
    try{    

        await mongoose.connect(`${process.env.MONGO_URL}`, {
            dbName: `fresh-rice`,
        } );

    }catch(error){
        console.log(error);
    }
}
module.exports = connectDB;