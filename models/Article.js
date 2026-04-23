// models/Article.js
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  slug: {
    type: String,
    required: [true, 'اسلاگ مقاله الزامی است'],
    unique: true,
    trim: true,
    lowercase: true,
    // مثال: "rice-cooking-guide" -> فقط حروف انگلیسی، اعداد و خط تیره
  },
  title: {
    type: String,
    required: [true, 'عنوان مقاله الزامی است'],
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: [true, 'محتوای مقاله الزامی است'],
  },
  readingTime: {
    type: String,
    required: true,
    default: '۵ دقیقه',
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, 'دسته‌بندی مقاله الزامی است'],
    enum: ['آشپزی', 'تغذیه', 'فرهنگ', 'گردشگری'],
  },
  // فیلدهای اضافی برای امکانات بهتر
  views: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  isPublished: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// متد افزایش تعداد بازدید
articleSchema.methods.incrementViews = async function() {
  this.views += 1;
  await this.save();
  return this.views;
};

// استاتیک متد برای پیدا کردن مقاله با اسلاگ
articleSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, isPublished: true });
};

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);

export default Article;