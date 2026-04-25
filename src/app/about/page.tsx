import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, DollarSign, Users, Target, Eye, Heart, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "کیفیت",
      description: "ارائه محصولات با بالاترین کیفیت و استانداردهای بهداشتی",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "منصفانه",
      description: "قیمت‌گذاری منصفانه و شفاف برای تمام محصولات",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "مشتری‌مداری",
      description: "رضایت مشتری اولویت اصلی ما در تمام مراحل",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
  ];

  const team = [
    {
      name: "علی محمدی",
      role: "مدیرعامل",
      image: "/images/team-1.jpg",
      description: "با بیش از ۱۵ سال تجربه در صنعت غذایی",
      initials: "ع.م",
    },
    {
      name: "مریم احمدی",
      role: "مدیر کیفیت",
      image: "/images/team-2.jpg",
      description: "متخصص کنترل کیفیت با مدرک دکتری صنایع غذایی",
      initials: "م.ا",
    },
    {
      name: "رضا کریمی",
      role: "مدیر فروش",
      image: "/images/team-3.jpg",
      description: "با سابقه درخشان در مدیریت فروش و بازاریابی",
      initials: "ر.ک",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-teal-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Badge className="mb-4 bg-green-500 text-white hover:bg-green-600" variant="default">
            درباره ما
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            داستان ما
          </h1>
          <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            ما با افتخار از سال ۱۳۹۵ در زمینه عرضه محصولات غذایی با کیفیت فعالیت می‌کنیم
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-green-950/30">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-t-lg">
              <CardTitle className="text-3xl text-center mb-4 text-green-700 dark:text-green-400">داستان ما</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                ما با افتخار از سال ۱۳۹۵ در زمینه عرضه محصولات غذایی با کیفیت فعالیت می‌کنیم. 
                هدف ما ارائه بهترین محصولات با قیمت مناسب و خدمات پس از فروش عالی به مشتریان عزیزمان است.
                با تکیه بر تجربه و تخصص خود، همواره در تلاش هستیم تا رضایت مشتریان را جلب کنیم.
              </p>
              <Separator />
              <p className="text-muted-foreground text-lg leading-relaxed">
                داستان ما با یک زوج جوان گیلانی آغاز شد که با عشق به سرزمین مادری و محصولات اصیل آن، 
                تصمیم گرفتند پلی باشند میان تولیدکنندگان محلی و مصرف‌کنندگان. امروز، پس از سال‌ها تلاش و 
                پشتکار، توانسته‌ایم اعتماد هزاران مشتری را جلب کنیم. مشتریانی که می‌دانند محصولات ما 
                مستقیماً از باغ‌ها و مزارع گیلان به دستشان می‌رسد، بدون هیچ واسطه‌ای. این اعتماد، 
                بزرگترین سرمایه ماست و ما هر روز برای حفظ و تقویت آن تلاش می‌کنیم. سفارشات شما در 
                کمترین زمان ممکن آماده و ارسال می‌شود، چون معتقدیم مشتریان ما ارزش بهترین خدمات را دارند.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ماموریت و چشم‌انداز
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-900">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg text-white shadow-lg">
                    <Target className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">ماموریت ما</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  ارائه محصولات غذایی با کیفیت و سالم به مشتریان، با رعایت استانداردهای بهداشتی و 
                  قیمت‌گذاری منصفانه، در کنار خدمات پس از فروش مطلوب.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-900">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white shadow-lg">
                    <Eye className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">چشم‌انداز ما</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  تبدیل شدن به برند پیشرو در زمینه عرضه محصولات غذایی با کیفیت در سطح کشور و 
                  توسعه فعالیت‌های خود در بازارهای بین‌المللی.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-yellow-950/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Heart className="w-3 h-3 ml-2" />
              ارزش‌های ما
            </Badge>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ارزش‌های ما
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-muted/30 dark:from-gray-900 dark:to-muted/20"
              >
                <CardContent className="pt-6">
                  <div className={`${value.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${value.color} shadow-lg`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-indigo-50/50 via-violet-50/30 to-fuchsia-50/50 dark:from-indigo-950/20 dark:via-violet-950/10 dark:to-fuchsia-950/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-0">
              <Users className="w-3 h-3 ml-2" />
              تیم ما
            </Badge>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              تیم ما
            </h2>
            <p className="text-muted-foreground mt-2">افراد متخصص و با تجربه ما</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => {
              const colors = [
                { bg: "from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-900", badge: "bg-blue-500" },
                { bg: "from-purple-50 to-white dark:from-purple-950/30 dark:to-gray-900", badge: "bg-purple-500" },
                { bg: "from-pink-50 to-white dark:from-pink-950/30 dark:to-gray-900", badge: "bg-pink-500" },
              ];
              const color = colors[index % colors.length];
              return (
                <Card 
                  key={index} 
                  className={`overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br ${color.bg}`}
                >
                  <div className="relative h-64 bg-muted overflow-hidden">
                    <Image
                      src={member.image || '/images/placeholder.svg'}
                      alt={member.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <Badge className={`mb-3 ${color.badge} text-white border-0`}>
                      {member.role}
                    </Badge>
                    <p className="text-muted-foreground text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-green-500/20 via-emerald-500/15 to-teal-500/20 border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
            <CardContent className="p-12 text-center relative z-10">
              <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                با ما در ارتباط باشید
              </h2>
              <p className="text-foreground mb-8 max-w-md mx-auto font-medium">
                برای هرگونه سوال، پیشنهاد یا همکاری با ما در تماس باشید
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
                <Link href="/contact">
                  تماس با ما
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
