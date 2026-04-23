// models/User.js
import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  purchaseDate: { type: String, required: true },
  purchaseDateJalali: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled', 'refunded'],
    default: 'completed',
  },
  trackingCode: { type: String, default: null },
}, { timestamps: true, _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'نام کاربری الزامی است'],
    unique: true,
    trim: true,
    minlength: [3, 'نام کاربری باید حداقل 3 کاراکتر باشد'],
  },
  email: {
    type: String,
    required: [true, 'ایمیل الزامی است'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: [true, 'شماره موبایل الزامی است'],
    unique: true,
    trim: true,
  },
  selectedProvince: {
    type: String,
    required: [true, 'استان الزامی است'],
    trim: true,
  },
  selectedCity: {
    type: String,
    required: [true, 'شهر الزامی است'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'رمز عبور الزامی است'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { 
  timestamps: true 
});

// ❌ موقتاً این middleware رو حذف می‌کنیم
// userSchema.pre('save', async function(next) { ... })

// متد ساده مقایسه رمز (موقت)
userSchema.methods.comparePassword = function(candidatePassword) {
  return this.password === candidatePassword;  // موقتاً مستقیم مقایسه کن
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;