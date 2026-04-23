// models/Product.js
import mongoose from 'mongoose';

// اسکیما برای کامنت‌های هر محصول
const commentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    default: () => Date.now(), // از زمان فعلی به عنوان ID استفاده می‌شود
  },
  userId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdAtJalali: {
    type: String,
    required: true,
  },
}, {
  _id: false, // از شناسه خودمان استفاده می‌کنیم و _id اضافی ایجاد نمی‌شود
});

// اسکیما اصلی محصول
const productSchema = new mongoose.Schema({
  // از id خودمان استفاده می‌کنیم، MongoDB هم _id مجزا دارد
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true, // برای جستجوی سریع
  },
  title: {
    type: String,
    required: [true, 'عنوان محصول الزامی است'],
    trim: true,
  },
  body: {
    type: String,
    required: [true, 'توضیحات محصول الزامی است'],
  },
  price: {
    type: Number,
    required: [true, 'قیمت محصول الزامی است'],
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    required: [true, 'دسته‌بندی محصول الزامی است'],
    enum: ['rice', 'beans', 'oil', 'pasta', 'other'], // دسته‌بندی‌های مجاز
  },
  img: {
    type: String,
    required: true,
  },
  comments: [commentSchema], // آرایه‌ای از کامنت‌ها
}, {
  timestamps: true, // createdAt و updatedAt اضافه می‌شود
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// فیلد محاسباتی: قیمت با تخفیف
productSchema.virtual('finalPrice').get(function() {
  if (this.discount > 0) {
    return this.price * (1 - this.discount / 100);
  }
  return this.price;
});

// متد میانگین امتیاز کامنت‌ها
productSchema.methods.getAverageRating = function() {
  if (this.comments.length === 0) return 0;
  const sum = this.comments.reduce((acc, comment) => acc + comment.rating, 0);
  return (sum / this.comments.length).toFixed(1);
};

// جلوگیری از OverwriteModelError
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;