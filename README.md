# QUR'ON Ma'nolari tarjimasi

Ushbu bot orqali siz Qur'on oyatlarining tarjimasi, izohi, arabcha matni va qiroatini topishingiz mumkin.

Ma'lumotlarning asosiy qismi [islom.uz](https://islom.uz/) saytidan olingan.

## Telegram bot

[@quron_manolari_bot](https://t.me/quron_manolari_bot)

## Manbaalar

| URL                                  | Description      |
| ------------------------------------ | ---------------- |
| https://quranenc.com/en/home         | Oyat tarjimalari |
| https://islom.uz                     | Oyat qiroati     |
| http://api.alquran.cloud             | Suralar jadvali  |
| https://alquran.cloud/download-media | Oyat rasmlari    |

## O'rnatish

```
$ git clone https://github.com/Adkhambek/Quron-manolari_bot.git
$ cd Quron-manolari_bot
$ npm install
```

📌 Oyat rasmlarini shu yerdan ko'chirib olishingiz mumkin: https://alquran.cloud/download-media . Ko'chirib olib uni `images` papka ichiga qo'shing

📌 data papkasi diyarli kerak emas. Keyinchalik apisiz to'liq json faylida qilish uchun olib qoyganman.

📌 agar JSON faylida qilishga qiziqsangiz: https://github.com/hablullah/data-quran

## Ishga tushirish

1. [@BotFather](https://t.me/BotFather) orqali bo't yasab undan TOKEN oling;
2. .env faylini yasab quyidagilarni kiriting:

-   TOKEN
-   PORT
-   BASE_URL
-   SECRET_PATH

( .env.example faylidan foydalansangiz bo'ladi )

3. npm run dev

## Ishlatilgan texnalogiyalar

-   Nodejs
-   Telegraf
-   Lodash
-   Express
-   Qo'shimcha: axios, dotenv and cross-env
