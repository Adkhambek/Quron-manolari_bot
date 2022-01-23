const { Markup, Scenes } = require("telegraf");
const constant = require("./constants");
const helper = require("./helper");
const { islomUz } = require("./config");
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
        const btnValue = ctx.update.callback_query.data;
        if (btnValue === "start") {
            const page = (ctx.wizard.state.page = 1);
            const sura = await helper.getSura(page);
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
            let { text, btns } = await helper.getSura(page);
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
            let { text, btns } = await helper.getSura(page);
            ctx.editMessageText(text, {
                parse_mode: "HTML",
                ...Markup.inlineKeyboard(btns),
            });
            return;
        }
        if (btnValue === "backward") {
            return;
        }
        const suraNumber = (ctx.wizard.state.sura = btnValue);
        const sura = await helper.getSuraInfo(+suraNumber);
        await ctx.editMessageText(
            constant.suraInfoText(
                sura.englishName,
                sura.name,
                sura.numberOfAyahs,
                sura.revelationType
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
        if (ctx.update.callback_query) {
            const page = ctx.wizard.state.page;
            const sura = await helper.getSura(page);
            await ctx.editMessageText(sura.text, {
                parse_mode: "HTML",
                ...Markup.inlineKeyboard(sura.btns),
            });
            return ctx.wizard.back();
        }
        const aya = (ctx.wizard.state.aya = ctx.message.text);
        const sura = ctx.wizard.state.sura;
        const { result } = await helper.getAyaTranslation(sura, aya);
        const image = helper.getAyaImage(sura, aya);
        await ctx.replyWithPhoto({ source: image });
        await ctx.replyWithAudio(`${islomUz}/quran/${sura}/${aya}.mp3`);
        await ctx.reply(`<b>Oyat tarjimasi:</b>\n\n${result.translation}`, {
            parse_mode: "HTML",
        });
        if (result.footnotes.length) {
            await ctx.reply(
                `<b>Oyat izohi:</b>\n\n<i>${result.footnotes}</i>`,
                {
                    parse_mode: "HTML",
                }
            );
        }
        await ctx.reply(
            "Orqaga qaytish uchun tugmani bosing 👇",
            Markup.inlineKeyboard([
                Markup.button.callback("Orqaga qaytish", "backward"),
            ])
        );

        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update.callback_query) {
            const page = (ctx.wizard.state.page = 1);
            const sura = await helper.getSura(page);
            await ctx.editMessageText(sura.text, {
                parse_mode: "HTML",
                ...Markup.inlineKeyboard(sura.btns),
            });
            return ctx.wizard.selectStep(ctx.wizard.cursor - 2);
        }
    }
);

module.exports = new Scenes.Stage([steps]);
