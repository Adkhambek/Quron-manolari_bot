require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN,
    PORT: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    secretPath: process.env.SECRET_PATH,
    quranenc: "https://quranenc.com/api/v1/translation",
    audio: "https://islom.uz/mp3/surah/mishariy_alafasiy",
};
