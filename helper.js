const { Markup } = require("telegraf");
const axios = require("axios");
const lodash = require("lodash");
const { quranenc, alquran } = require("./config");
// const fs = require("fs");
const path = require("path");

exports.getSura = async (currentPage) => {
    let btns = [];
    let text = "<b>Suralardan birini tanlang:</b>\n\n";
    let limit = currentPage * 15;
    let offset = (currentPage - 1) * 15;
    if (currentPage === 8) {
        limit = 114;
        offset = 105;
    }
    // let data = fs.readFileSync(path.join(__dirname, "data", "surah.json"));
    // data = JSON.parse(data);
    const request = await axios.get(alquran);
    const {
        data: { data },
    } = await request;
    for (let i = offset; i < limit; i++) {
        btns.push(
            Markup.button.callback(data[i].englishName, `${data[i].number}`)
        );
        const count = i + 1;
        text += `${count}. ${data[i].englishName} (${data[i].name})\n`;
    }
    btns = lodash.chunk(btns, 3);
    const back = [
        Markup.button.callback("⬅️ Orqaga", "back"),
        Markup.button.callback("Oldinga ➡️", "forward"),
    ];
    btns.push(back);
    return { btns, text };
};

exports.getSuraInfo = async (suraNumber) => {
    const request = await axios.get(alquran);
    const {
        data: { data },
    } = await request;
    const sura = await data.find((e) => e.number === suraNumber);
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

exports.getAyaTranslation = async (sura, aya) => {
    const request = await axios.get(
        `${quranenc}/aya/uzbek_sadiq/${sura}/${aya}`
    );
    return request.data;
};

exports.getAyaImage = (sura, aya) => {
    return path.join(__dirname, "images", `${sura}_${aya}.png`);
};
