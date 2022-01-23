const { Markup, Scenes } = require("telegraf");
const constant = require("./constants");
const helper = require("./helper");
const { audio } = require("./config");
const steps = new Scenes.WizardScene(
    "STEPS",
    async (ctx) => {
        await ctx.reply(constant.START_TEXT, {
            parse_mode: "HTML",
            ...Markup.inlineKeyboard([
                Markup.button.callback("Boshlash", "start"),
            ]),
        });
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update.callback_query.data === "start") {
            const page = (ctx.wizard.state.page = 1);
            const sura = helper.getSura(page);

            await ctx.editMessageText(sura.text, {
                parse_mode: "HTML",
                ...Markup.inlineKeyboard(sura.btns),
            });

            return ctx.wizard.next();
        }
    },
    async (ctx) => {
        const btnValue = ctx.update.callback_query.data;
        if (btnValue === "forward") {
            const page = (ctx.wizard.state.page += 1);
            if (page >= 9) {
                ctx.wizard.state.page = 8;
                ctx.answerCbQuery("Siz oxirgi sahifadasiz", {
                    show_alert: true,
                });
                return;
            }
            let { text, btns } = helper.getSura(page);
            ctx.editMessageText(text, {
                parse_mode: "HTML",
                ...Markup.inlineKeyboard(btns),
            });
            return;
        }
        if (btnValue === "back") {
            const page = (ctx.wizard.state.page -= 1);
            if (page <= 0) {
                ctx.wizard.state.page = 1;
                ctx.answerCbQuery("Siz oxirgi sahifadasiz", {
                    show_alert: true,
                });
                return;
            }
            let { text, btns } = helper.getSura(page);
            ctx.editMessageText(text, {
                parse_mode: "HTML",
                ...Markup.inlineKeyboard(btns),
            });
            return;
        }
        const suraNumber = (ctx.wizard.state.sura = btnValue);
        const sura = helper.getSuraInfo(suraNumber);
        await ctx.editMessageText(
            constant.suraInfoText(
                sura.title,
                sura.titleAr,
                sura.count,
                sura.place
            ),
            {
                parse_mode: "HTML",
                ...Markup.inlineKeyboard([
                    Markup.button.callback("Orqaga qaytish", "back"),
                ]),
            }
        );
        return ctx.wizard.next();
    },
    async (ctx) => {
        const btnValue = ctx.update.callback_query.data;
        if (btnValue === "back") {
            const page = ctx.wizard.state.page;
            const sura = helper.getSura(page);
            await ctx.editMessageText(sura.text, {
                parse_mode: "HTML",
                ...Markup.inlineKeyboard(sura.btns),
            });
            return ctx.wizard.back();
        }
    }
);

module.exports = new Scenes.Stage([steps]);
