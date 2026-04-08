const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function connectDB() {
    try {
        await mongoose.connect("");
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Connection error:", err);
    }
}

connectDB();

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String
})

const todoSchema = new mongoose.Schema({
    description: String,
    userId: mongoose.Types.ObjectId
})

const userModel = mongoose.model("users", userSchema);
const todoModel = mongoose.model("todos", todoSchema);

module.exports = {
    userModel: userModel,
    todoModel: todoModel
}