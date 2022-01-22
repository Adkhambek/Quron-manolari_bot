const { Markup } = require("telegraf");
const axios = require("axios");
const lodash = require("lodash");
const fs = require("fs");
const path = require("path");

exports.getSura = (currentPage) => {
    let btns = [];
    let text = "<b>Suralardan birini tanlang:</b>\n\n";
    let limit = currentPage * 15;
    let offset = (currentPage - 1) * 15;
    if (currentPage === 8) {
        limit = 114;
        offset = 105;
    }
    let data = fs.readFileSync(path.join(__dirname, "data", "surah.json"));
    data = JSON.parse(data);
    for (let i = offset; i < limit; i++) {
        btns.push(Markup.button.callback(`${data[i].title}`, data[i].index));
        const count = i + 1;
        text += `${count}. ${data[i].title} (${data[i].titleAr})\n`;
    }
    btns = lodash.chunk(btns, 3);
    const back = [
        Markup.button.callback("⬅️ Orqaga", "back"),
        Markup.button.callback("Oldinga ➡️", "forward"),
    ];
    btns.push(back);
    return { btns, text };
};

exports.getSuraInfo = (suraNumber) => {
    let data = fs.readFileSync(path.join(__dirname, "data", "surah.json"));
    data = JSON.parse(data);
    const sura = data.find((e) => e.index === suraNumber);
    return sura;
};

exports.numberZero = (num) => {
    if (num < 10) {
        return "00" + num;
    }
    if (num < 100) {
        return "0" + num;
    }
    return num;
};
