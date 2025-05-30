const fs = require('fs');
const path = require('path');
const jalaali = require('jalaali-js');

// مسیر فایل
const dbPath = path.join(__dirname, 'db.json');
const outputPath = path.join(__dirname, 'db-jalali.json');

// محتوای فایل رو بخون
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// تابع تبدیل تاریخ
const toJalali = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const { jy, jm, jd } = jalaali.toJalaali(date);
  return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
};

// مثال: تبدیل purchaseDate و createdAt
dbData.users.forEach((user) => {
  user.purchases.forEach((purchase) => {
    purchase.purchaseDateJalali = toJalali(purchase.purchaseDate);
  });
});

dbData.products.forEach((product) => {
  product.comments.forEach((comment) => {
    comment.createdAtJalali = toJalali(comment.createdAt);
  });
});

// خروجی رو ذخیره کن
fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf-8');

console.log('✅ تاریخ‌ها به شمسی تبدیل شدن و در db-jalali.json ذخیره شدن!');
