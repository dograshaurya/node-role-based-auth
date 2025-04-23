const mongoose = require('mongoose');
mongoose.set('debug', true);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
        });
        console.log(`
        🚀 Database connected successfully! The data party starts now! 🎉🎉
        ------------------------------
        |  Time to mingle with data! 🗂️  |
        ------------------------------
        |  Connection: MongoDB        |
        ------------------------------
        |  Let's rock the queries! 🤘 |
        ------------------------------
    `);

    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
