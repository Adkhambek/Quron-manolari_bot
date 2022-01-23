exports.START_TEXT =
    "<b>Bismillahir Rohmanir Rohiym.</b>\n\n<i>Alloh taologa bitmas-tuganmas hamdu sanolar bo'lsin. Payg'ambarimizga mukammal va batamom salavotu durudlar bo'lsin.</i>\n\n<b>Assalomu alaykum va rohmatullohi va barokatuh</b>\n\nSizni botimizda ko'rishdan juda hursandmiz 😊\n\n🤖 Ushbu bot orqali siz Qur'on oyatlarining tarjimasi, izohi, arabcha matni va qiroatini topishingiz mumkin.\n\n<b>Boshlash uchun quyidagi tugmani bosing 👇</b>";

exports.SURA_TEXT = "<b>Quyidagi suralardan birini tanlang</b> 👇";

exports.suraInfoText = (title, titleAr, count, place) =>
    `<b>Nomi:</b> ${title} (${titleAr})\n<b>Oyatlar soni:</b> ${count}\n<b>Nozil bo'lgan yeri:</b> ${place}\n\n<b>Qidirayotgan oyatingizni raqamini kiriting:</b>`;

exports.errorMessage =
    "<b>❌ Noma'lum buyruq!</b>\n\n<i>Siz to'g'ridan-to'g'ri bot chatiga xabar yubordingiz, yoki bot tuzilishi yaratuvchisi tomonidan o'zgartirilgan bo'lishi mumkin.</i>\n\nℹ️ Xabarlarni to'g'ridan-to'g'ri botga yubormang.\n\n<b>/start tugmasini bosib boshidan boshlang</b>";
