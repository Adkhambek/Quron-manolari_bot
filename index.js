const { Telegraf, session } = require("telegraf");
const { TOKEN } = require("./config");
const bot = new Telegraf(TOKEN);
const stage = require("./stage");

//Middlewares:
bot.use(session());
bot.use(stage.middleware());

// Error Handling
bot.catch((err, ctx) => {
    console.log(err);
    return ctx.reply("something wrong");
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
