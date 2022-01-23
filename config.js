require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN,
    PORT: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    secretPath: process.env.SECRET_PATH,
    quranenc: "https://quranenc.com/api/v1/translation",
    islomUz: "https://islom.uz/mp3",
    alquran: "http://api.alquran.cloud/v1/surah",
};
