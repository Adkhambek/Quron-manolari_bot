const { Telegraf, Markup } = require("telegraf");
const { TOKEN } = require("./config");
const bot = new Telegraf(TOKEN);
const { start } = require("./constans");
// Error Handling
bot.catch((err, ctx) => {
    console.log(err);
    return ctx.reply(text.error);
});

// For getting photoId:
// bot.use((ctx, next) => {
//     console.log(ctx.message);
//     next();
// });

// Public
bot.start((ctx) => {
    ctx.replyWithPhoto(start.photoId, {
        parse_mode: "HTML",
        caption: start.firstTxt,
    });
});

bot.on("text", async (ctx) => {
    console.log(ctx);
});

module.exports = bot;
