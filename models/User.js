// models/User.js
import mongoose from 'mongoose';

// اسکیما برای خریدهای کاربر
const purchaseSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: [true, 'شناسه محصول الزامی است'],
  },
  title: {
    type: String,
    required: [true, 'عنوان محصول الزامی است'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'قیمت محصول الزامی است'],
    min: 0,
  },
  quantity: {
    type: Number,
    required: [true, 'تعداد محصول الزامی است'],
    min: 1,
    default: 1,
  },
  purchaseDate: {
    type: String,
    required: true,
  },
  purchaseDateJalali: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled', 'refunded'],
    default: 'completed',
  },
  trackingCode: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
  _id: false,
});

// اسکیما اصلی کاربر (با اضافه شدن موبایل)
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  username: {
    type: String,
    required: [true, 'نام کاربری الزامی است'],
    unique: true,
    trim: true,
    minlength: [3, 'نام کاربری باید حداقل 3 کاراکتر باشد'],
    maxlength: [30, 'نام کاربری باید حداکثر 30 کاراکتر باشد'],
    match: [/^[a-zA-Z0-9_]+$/, 'نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و زیرخط باشد'],
  },
  email: {
    type: String,
    required: [true, 'ایمیل الزامی است'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'ایمیل نامعتبر است'],
  },
  
  // 📱 اضافه کردن موبایل
  mobile: {
    type: String,
    required: [true, 'شماره موبایل الزامی است'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Validation برای شماره‌های ایران (شروع با 09 و 11 رقم)
        return /^09[0-9]{9}$/.test(v);
      },
      message: props => `${props.value} شماره موبایل معتبر نیست! شماره باید با 09 شروع شود و 11 رقم باشد`
    },
  },
  
  // فیلدهای اضافی برای مدیریت موبایل
  mobileVerified: {
    type: Boolean,
    default: false,
  },
  mobileVerificationCode: {
    type: String,
    default: null,
  },
  mobileVerificationExpires: {
    type: Date,
    default: null,
  },
  
  role: {
    type: String,
    required: [true, 'نقش کاربر الزامی است'],
    enum: ['admin', 'user', 'moderator', 'writer'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'رمز عبور الزامی است'],
    minlength: [6, 'رمز عبور باید حداقل 6 کاراکتر باشد'],
  },
  purchases: [purchaseSchema],
  
  // فیلدهای اضافی برای پروفایل کاربر
  profile: {
    firstName: {
      type: String,
      trim: true,
      default: '',
    },
    lastName: {
      type: String,
      trim: true,
      default: '',
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: '',
      // phoneNumber رو می‌تونیم به عنوان تلفن ثابت استفاده کنیم
    },
    avatar: {
      type: String,
      default: '/images/default-avatar.png',
    },
    bio: {
      type: String,
      maxlength: [500, 'بیوگرافی نمی‌تواند بیشتر از 500 کاراکتر باشد'],
      default: '',
    },
  },
  
  // آدرس‌های ذخیره شده کاربر
  addresses: [{
    id: { type: Number, default: () => Date.now() },
    title: { type: String, required: true },
    fullAddress: { type: String, required: true },
    postalCode: { type: String },
    phone: { type: String },
    isDefault: { type: Boolean, default: false },
  }],
  
  // وضعیت حساب کاربری
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  
  // فیلدهای مرتبط با امنیت
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  emailVerificationToken: String,
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// فیلد مجازی: نام کامل کاربر
userSchema.virtual('fullName').get(function() {
  if (this.profile.firstName && this.profile.lastName) {
    return `${this.profile.firstName} ${this.profile.lastName}`;
  }
  return this.username;
});

// فیلد مجازی: تعداد کل خریدها
userSchema.virtual('totalPurchases').get(function() {
  return this.purchases.length;
});

// فیلد مجازی: مجموع مبلغ خریدها
userSchema.virtual('totalSpent').get(function() {
  return this.purchases.reduce((total, purchase) => {
    return total + (purchase.price * purchase.quantity);
  }, 0);
});

// متد: بررسی نقش ادمین بودن
userSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

// متد: بررسی نقش نویسنده بودن
userSchema.methods.isWriter = function() {
  return this.role === 'writer' || this.role === 'admin';
};

// متد: افزودن خرید جدید
userSchema.methods.addPurchase = async function(purchaseData) {
  this.purchases.push({
    ...purchaseData,
    purchaseDate: new Date().toISOString().split('T')[0],
    purchaseDateJalali: new Date().toLocaleDateString('fa-IR'),
  });
  await this.save();
  return this.purchases[this.purchases.length - 1];
};

// متد: دریافت خریدهای یک محصول خاص
userSchema.methods.getPurchasesByProduct = function(productId) {
  return this.purchases.filter(p => p.productId === productId);
};

// 📱 متدهای مربوط به موبایل
// ارسال کد تایید موبایل (شبیه‌سازی شده - برای اتصال به سرویس SMS واقعی)
userSchema.methods.generateMobileVerificationCode = function() {
  // تولید کد 6 رقمی تصادفی
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  this.mobileVerificationCode = code;
  this.mobileVerificationExpires = Date.now() + 5 * 60 * 1000; // 5 دقیقه اعتبار
  return code;
};

// تایید کد موبایل
userSchema.methods.verifyMobileCode = function(code) {
  if (!this.mobileVerificationCode || !this.mobileVerificationExpires) {
    return false;
  }
  
  if (Date.now() > this.mobileVerificationExpires) {
    return false; // کد منقضی شده
  }
  
  if (this.mobileVerificationCode !== code) {
    return false; // کد اشتباه
  }
  
  // تایید موفق
  this.mobileVerified = true;
  this.mobileVerificationCode = null;
  this.mobileVerificationExpires = null;
  return true;
};

// متد برای مخفی کردن بخشی از شماره موبایل
userSchema.methods.getMaskedMobile = function() {
  if (!this.mobile) return '';
  return this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

// استاتیک متد: پیدا کردن کاربر با موبایل
userSchema.statics.findByMobile = function(mobile) {
  return this.findOne({ mobile });
};

// استاتیک متد: پیدا کردن کاربر با ایمیل
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// استاتیک متد: پیدا کردن کاربر با username
userSchema.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

// استاتیک متد: پیدا کردن کاربر با ایمیل یا موبایل
userSchema.statics.findByIdentifier = function(identifier) {
  return this.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { mobile: identifier }
    ]
  });
};

// Middleware: قبل از save، ایمیل را به lowercase تبدیل کن
userSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// جلوگیری از OverwriteModelError در هات ریلود
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;