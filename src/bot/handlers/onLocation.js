import { bot } from '../bot.js';

function onLocation(msg) {
    console.log('OnLocation...!');

    const chatId = msg.chat.id;

    const latitude = 41.311081;
    const longitude = 69.240562;

    bot.sendMessage(chatId, "📍 Bizning o‘quv markaz joylashuvi:");
    bot.sendLocation(chatId, latitude, longitude);
}

export { onLocation };