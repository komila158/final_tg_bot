import "./src/bot/bot.js";
import mongoose from "mongoose";
import "./src/bot/bot.js"
import { config } from "dotenv";


mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log(`Db is connect....`);
})
.catch(() => {
    console.log(`Error: db is not connected!`);
});
console.log("Dastur boshlanmoqda....");
