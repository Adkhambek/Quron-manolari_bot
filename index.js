const { Telegraf, session } = require("telegraf");
const { TOKEN } = require("./config");
const bot = new Telegraf(TOKEN);
const stage = require("./stage");
const { errorMessage } = require("./constants");

//Middlewares:
bot.use(session());
bot.use(stage.middleware());

// Error Handling
bot.catch((err, ctx) => {
    if (ctx.message.text === "/start") {
        ctx.scene.enter("STEPS");
    } else {
        ctx.reply(errorMessage, { parse_mode: "HTML" });
        return;
    }
});

// For getting photoId:
// bot.use((ctx, next) => {
//     console.log(ctx.message);
//     next();
// });

// Public
bot.start((ctx) => {
    ctx.scene.enter("STEPS");
});

bot.on("text", async (ctx) => {
    console.log(ctx);
});

module.exports = bot;
