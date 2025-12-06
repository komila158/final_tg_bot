import "./src/bot/bot.js";
import mongoose from "mongoose";

import { config } from "dotenv";
config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`Db is connected....`);
    })
    .catch(() => {
        console.log(`Error: db is not connected!`);
    });
console.log("Dastur boshlanmoqda....");
 