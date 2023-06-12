const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`${process.env.MONGO_URL}/mosquito-finder-db`);
    const db = mongoose.connection;
}

module.exports = mongoose;