const TelegramBot = require("node-telegram-bot-api");
const qr = require("qrcode");
require("dotenv").config();
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Store generated QR codes (in a real app, you might want to use a database)
const qrCodes = {};

// // Handle the /start command
// bot.onText(/\/start/, async (msg) => {
//   const chatId = msg.chat.id;

//   try {
//     // Generate a unique identifier for this QR code
//     const qrId = `qr-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
//     const dataToEncode = `https://example.com/verify?user=${msg.from.id}&qr=${qrId}`;

//     // Generate QR code as a data URL
//     const qrCodeUrl = await new Promise((resolve, reject) => {
//       qr.toDataURL(dataToEncode, { errorCorrectionLevel: "H" }, (err, url) => {
//         if (err) reject(err);
//         else resolve(url);
//       });
//     });

//     // Store the QR code data (in memory - for demonstration only)
//     qrCodes[qrId] = {
//       userId: msg.from.id,
//       createdAt: new Date(),
//       data: dataToEncode,
//     };

//     // Send the QR code as an image
//     await bot.sendPhoto(chatId, qrCodeUrl, {
//       caption: "Here is your QR code! Scan it to verify your identity.",
//       parse_mode: "Markdown",
//     });

//     // Alternatively, send as a link to the QR code image
//     // await bot.sendMessage(chatId, `Here is your QR code: ${qrCodeUrl}`);
//   } catch (error) {
//     console.error("Error generating QR code:", error);
//     bot.sendMessage(
//       chatId,
//       "Sorry, there was an error generating your QR code. Please try again."
//     );
//   }
// });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "there";

  const welcomeMessage =
    `👋 Hello *${firstName}*! Welcome to our bot!\n\n` +
    `Here's what you can do:\n` +
    `• /start - Get your unique QR code\n` +
    `• /help - See all available commands\n` +
    `• /info - Learn about this bot\n\n` +
    `We're glad to have you here! 😊`;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });
});

// // Handle the /start command
// bot.onText(/\/donate/, async (msg) => {
//   const chatId = msg.chat.id;

//   try {
//     // Generate a unique identifier for this QR code
//     const qrId = `qr-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
//     const dataToEncode = `https://example.com/verify?user=${msg.from.id}&qr=${qrId}`;

//     // Generate QR code as a data URL
//     const qrCodeUrl = await new Promise((resolve, reject) => {
//       qr.toDataURL(dataToEncode, { errorCorrectionLevel: "H" }, (err, url) => {
//         if (err) reject(err);
//         else resolve(url);
//       });
//     });

//     // Store the QR code data (in memory - for demonstration only)
//     qrCodes[qrId] = {
//       userId: msg.from.id,
//       createdAt: new Date(),
//       data: dataToEncode,
//     };

//     // Send the QR code as an image
//     await bot.sendPhoto(chatId, qrCodeUrl, {
//       caption: "Here is your QR code! Scan it to verify your identity.",
//       parse_mode: "Markdown",
//     });

//     // Alternatively, send as a link to the QR code image
//     // await bot.sendMessage(chatId, `Here is your QR code: ${qrCodeUrl}`);
//   } catch (error) {
//     console.error("Error generating QR code:", error);
//     bot.sendMessage(
//       chatId,
//       "Sorry, there was an error generating your QR code. Please try again."
//     );
//   }
// });

// Start message
console.log("Bot is running...");
