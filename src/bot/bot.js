import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onStart from "./handlers/onStart.js";
import onProfile from "./handlers/onProfile.js";
import onError from "./handlers/onError.js";
import { onCourses } from "./handlers/onCourses.js";

config();

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });


const CHANNEL_ID = "@academy_100x_uz";
// check if user is subscribed to channel
const checkIfUserSubscribed = async (chatId) => {
  try {
    const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);
    console.log(chatMember.status);

    if (chatMember.status == "left" || chatMember.status == "kicked") {
      return false;
    } else {
      return true;
    }
  } catch {
    console.log("error: chatMember checking");
  }
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  // status
  // creator - yaratuvchi
  // member - a'zo
  // admin - adminstrator
  // left - tark etgan
  // kicked - chiqarib yuborilgan

  const user_subscribed = await checkIfUserSubscribed(chatId);

  console.log(user_subscribed);

  if (user_subscribed == false) {
    return bot.sendMessage(
      chatId,
      `Hurmatli ${firstname}, \nSiz botimizdan foydalanishingiz uchun oldin quyidagi kanalga obuna bo'lishing garak... 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `100x Academy Xiva`,
                url: "https://t.me/academy_100x_uz",
              },
            ],
            [
              {
                text: `Obunani tekshirish ✅`,
                callback_data: "confirm_subscribtion",
              },
            ],
          ],
        },
      }
    );
  }

  if (text == "/start") {
    return onStart(msg);
  } else if (text == "📚 Kurslar") {
    return onCourses(msg);
  }
  else {
    return onError(msg);
  }

});

bot.on("callback_query", async (query) => {
  const msg = query.message;
  const data = query.data;
  const queryId = query.id;

  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;

  if (data == "confirm_subscribtion") {
    console.log("TUGMA BOSILDIII");
    const user_subscribed = await checkIfUserSubscribed(chatId);

    if (user_subscribed == false) {
      return bot.answerCallbackQuery(queryId, {
        text: "Siz hali obuna bo'lmadingiz... ❌",
      });
    } else {
      bot.deleteMessage(chatId, msg.message_id);
      return onStart(msg);
    }
  }
  if (data == "course_english") {
    bot.sendMessage(
      chatId,
      `
     🇬🇧 Ingliz tili kursi haqida:

📆 Davomiyligi: 3 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 350 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing.
 `,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register:english" }],
          ],

        }
      },
      

    );
  } else if (data == "course_russian") {
    bot.sendMessage(
      chatId,
      `
        🇷🇺 Rus tili kursi haqida:

📆 Davomiyligi: 4 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 350 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing.

        `,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register:english" }],
          ],

        }
      },

    );
  } else if (data == "course_math") {
    bot.sendMessage(
      chatId,
      `
        🧮 Matematika kursi haqida:

📆 Davomiyligi: 3 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 300 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing.

        `,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register:english" }],
          ],

        }
      },

    );
  } else if (data == "course_programming") {
    bot.sendMessage(
      chatId,
      `
        💻 Dasturlash kursi haqida:

📆 Davomiyligi: 5 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 250 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing.

        `,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register:english" }],
          ],

        }
      },

    );
  } else if (data == "course_design") {
    bot.sendMessage(
      chatId,
      `
        🎨 Grafik dizayn kursi haqida:

📆 Davomiyligi: 4 oy  
⏰ Darslar: Haftasiga 3 marta (1,5 soatdan)  
👨‍🏫 O‘qituvchi: Tajribali filologlar  
💰 Narxi: 350 000 so‘m / oy

✍️ Agar sizni bu kurs qiziqtirsa, “Ro‘yxatdan o‘tish” tugmasini bosing.

        `,
       {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register:english" }],
          ],

        }
      },

    );
  }

});

console.log("Bot ishga tushdi...");

