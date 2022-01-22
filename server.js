const bot = require("./index");
const express = require("express");
const { PORT, baseUrl, secretPath } = require("./config");

if (process.env.NODE_ENV === "production") {
    bot.telegram.setWebhook(baseUrl + secretPath);
    const app = express();
    app.get("/", (req, res) => res.send("Test"));
    app.use(bot.webhookCallback(secretPath));
    app.listen(PORT, () => {
        console.log("Bot running in production mode ...");
    });
} else {
    bot.launch()
        .then(() => console.log("Bot is running..."))
        .catch((err) => console.log(err));
}
