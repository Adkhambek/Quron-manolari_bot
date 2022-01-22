const { Telegraf, Markup } = require("telegraf");
const { TOKEN } = require("./config");
const bot = new Telegraf(TOKEN);

// Error Handling
bot.catch((err, ctx) => {
    console.log(err);
    return ctx.reply(text.error);
});

// bot.use((ctx, next) => {
//     console.log(ctx);
//     next();
// });

// Public
bot.start((ctx) => {
    ctx.reply("OK");
});

bot.on("text", async (ctx) => {
    console.log(ctx);
});

module.exports = bot;
