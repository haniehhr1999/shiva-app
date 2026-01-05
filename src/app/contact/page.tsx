"use client";

import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      // TODO: Implement form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("خطا در ارسال پیام. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30 py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg">
            تماس با ما
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            تماس با ما
          </h1>
          <p className="text-foreground text-lg max-w-2xl mx-auto font-medium">
            ما آماده پاسخگویی به سوالات و پیشنهادات شما هستیم
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Physical Address */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">آدرس دفتر مرکزی</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground leading-relaxed font-medium">
                گیلان، رشت، خیابان امام خمینی، خیابان شهید بهشتی، پلاک ۱۲۳
              </p>
              <Separator className="bg-blue-200 dark:bg-blue-800" />
              <p className="text-foreground">
                <span className="font-bold text-blue-600 dark:text-blue-400">ساعت کاری:</span>{" "}
                <span className="font-medium">شنبه تا چهارشنبه ۹ صبح تا ۶ عصر</span>
              </p>
            </CardContent>
          </Card>

          {/* Contact Numbers */}
          <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">شماره‌های تماس</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-foreground">
                  <span className="font-bold text-purple-600 dark:text-purple-400">مدیرعامل:</span>{" "}
                  <a href="tel:09123456789" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium underline">
                    ۰۹۱۲۳۴۵۶۷۸۹
                  </a>
                </p>
                <p className="text-foreground">
                  <span className="font-bold text-purple-600 dark:text-purple-400">مدیر فروش:</span>{" "}
                  <a href="tel:09123456788" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium underline">
                    ۰۹۱۲۳۴۵۶۷۸۸
                  </a>
                </p>
                <p className="text-foreground">
                  <span className="font-bold text-purple-600 dark:text-purple-400">پشتیبانی:</span>{" "}
                  <a href="tel:01312345678" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium underline">
                    ۰۱۳۱۲۳۴۵۶۷۸
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media */}
        <Card className="mb-12 border-0 shadow-xl bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 dark:from-indigo-950/40 dark:via-violet-950/40 dark:to-fuchsia-950/40">
          <CardHeader className="bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-t-lg">
            <CardTitle className="text-2xl text-center bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              شبکه‌های اجتماعی
            </CardTitle>
            <CardDescription className="text-center text-foreground font-medium">
              ما را در شبکه‌های اجتماعی دنبال کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                asChild
                variant="outline"
                className="h-auto py-8 flex-col gap-3 border-0 shadow-lg bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-pink-950/30 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <a
                  href="https://instagram.com/your_instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-3xl" />
                  <span className="font-semibold">اینستاگرام</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto py-8 flex-col gap-3 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-950/30 hover:bg-blue-500 hover:text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <a
                  href="https://t.me/your_telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegram className="text-3xl" />
                  <span className="font-semibold">تلگرام</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto py-8 flex-col gap-3 border-0 shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-950/30 hover:bg-green-500 hover:text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <a
                  href="https://wa.me/989123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-3xl" />
                  <span className="font-semibold">واتساپ</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-900 dark:to-amber-950/30">
          <CardHeader className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 rounded-t-lg">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg shadow-lg text-white">
                <Mail className="w-5 h-5" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ارسال پیام
              </CardTitle>
            </div>
            <CardDescription className="text-center text-foreground font-medium">
              پیام خود را برای ما ارسال کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {success && (
                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    پیام شما با موفقیت ارسال شد!
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="نام و نام خانوادگی"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="border-gray-300 dark:border-gray-600 focus-visible:border-orange-400 focus-visible:ring-orange-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="border-gray-300 dark:border-gray-600 focus-visible:border-orange-400 focus-visible:ring-orange-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">موضوع</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="موضوع پیام"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={loading}
                  className="border-gray-300 dark:border-gray-600 focus-visible:border-orange-400 focus-visible:ring-orange-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">پیام</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="پیام خود را بنویسید..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                  className="border-gray-300 dark:border-gray-600 focus-visible:border-orange-400 focus-visible:ring-orange-300"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                {loading ? (
                  <>
                    <Send className="ml-2 w-4 h-4 animate-pulse" />
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    <Send className="ml-2 w-4 h-4" />
                    ارسال پیام
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
