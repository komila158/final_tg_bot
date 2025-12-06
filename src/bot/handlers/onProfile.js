import { bot } from "../bot.js";

function onProfile(msg) {
  bot.sendMessage(
    chatId,
    `
  SHAXSIY PROFIL:

- CHAT-ID: ???
- ISMI: ????
- USERNAME: ????
- ACTIVE: ???
- BALANCE: ???  
`
  );
}
export default onProfile;