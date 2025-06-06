const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  // First send text
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  // 1. Construct absolute path to your image
  const publicFolder = path.join(__dirname, "public");
  const imagePath = path.join(publicFolder, "qr.jpg");

  // 2. Verify file exists first
  if (!fs.existsSync(imagePath)) {
    return bot.sendMessage(chatId, "❌ Welcome image not found!");
  }

  const welcomeMessage =
    `👋 Hello *${firstName}* \n\n` +
    `You can *donate* to promote the startups developing innovative products using AI technology that have the potential to transform industries and improve lives. By supporting these startups, you play a crucial role in fostering creativity and driving the future of technology.\n\n` +
    `You can donate using *BTC Address:* 19d3f9KnYKioyjqdWm97uWEeLDUs6w9iHh\n` +
    `Or Scan the *QR Code* below\n\n`;

  await bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });

  // Then send photo (local file or URL)
  await bot.sendPhoto(chatId, fs.createReadStream(imagePath), {
    caption: "Thank You for your support! 😊",
    parse_mode: "Markdown",
  });
});

// Start message
console.log("Bot is running...");
