// الگوی Regex برای شماره موبایل ایران
const iranMobileRegex =
  /^09(1[0-9]|3[1-9]|2[1-9]|9[0-9]|0[1-9]|41|42)[0-9]{7}$/;

// تابع بررسی شماره موبایل
export function validateIranMobileNumber(phoneNumber) {
  if (iranMobileRegex.test(phoneNumber)) {
    console.log(`✅ OK: شماره ${phoneNumber} معتبر است.`);
    return true;
  } else {
    console.error(`❌ ERROR: شماره ${phoneNumber} نامعتبر است!`);
    return false;
  }
}
