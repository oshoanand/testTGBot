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
    `👋 Hello *${firstName}* , Thank You for your support!\n\n` +
    `You can donate *BTC* using the address below\n` +
    `*BTC Address:* AFDGFsdgdg\n` +
    `Or Scan the *QR Code* below\n\n` +
    `We're glad to have you here! 😊`;

  await bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });

  // Then send photo (local file or URL)
  await bot.sendPhoto(chatId, fs.createReadStream(imagePath), {
    caption: "🖼 Welcome to our bot!",
    parse_mode: "Markdown",
  });
});

// Start message
console.log("Bot is running...");
