require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN,
    PORT: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    secretPath: process.env.SECRET_PATH,
    quranAPI: {
        quranenc: "https://quranenc.com/api/v1/translation",
        sutanlab: "https://api.quran.sutanlab.id/surah",
    },
};
