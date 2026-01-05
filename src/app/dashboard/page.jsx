"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
  TableFooter
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SimpleLineChart from "../../components/SimpleLineChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  // Tooltip,
  // Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { CiUser } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiRead } from "react-icons/ci";
import { Star } from "lucide-react";


import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

// ثبت کامپوننت‌های مورد نیاز Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [roleChangeDialogVisible, setRoleChangeDialogVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newUseremail, setNewUseremail] = useState("");
  const [newUserpass, setNewUserpass] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [comments, setComments] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [deleteCommentDialogVisible, setDeleteCommentDialogVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('daily');
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPage, setCommentsPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [commentsRowsPerPage, setCommentsRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const durations = [
    { name: "روزانه", code: "day" },
    { name: "هفتگی", code: "weekly" },
    { name: "ماهانه", code: "monthly" },
    { name: "سالانه", code: "LDN" },
  ];

  // داده‌های جنسیت کاربران
  const genderData = {
    labels: ['آقایان', 'خانم‌ها', 'نامشخص'],
    datasets: [
      {
        data: [45, 40, 15],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(201, 203, 207, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // داده‌های توزیع جغرافیایی
  const locationData = {
    labels: [
      'تهران',
      'گیلان',
      'اصفهان',
      'خراسان رضوی',
      'فارس',
      'سایر استان‌ها',
    ],
    datasets: [
      {
        data: [30, 25, 15, 10, 8, 12],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // تنظیمات نمودار
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Vazirmatn',
          },
        },
      },
      title: {
        display: true,
        text: 'توزیع کاربران',
        font: {
          family: 'Vazirmatn',
          size: 16,
        },
      },
    },
  };

  // تنظیمات نمودار میله‌ای
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
        labels: {
          font: {
            family: 'Vazirmatn',
          },
        },
      },
      title: {
        display: true,
        text: 'آمار فروش محصولات',
        font: {
          family: 'Vazirmatn',
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'تعداد فروش',
          font: {
            family: 'Vazirmatn',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'محصولات',
          font: {
            family: 'Vazirmatn',
          },
        },
      },
    },
  };

   // داده‌های فروش محصولات بر اساس بازه زمانی
   const salesDataByPeriod = {
    daily: {
      labels: ['برنج هاشمی', 'برنج صدری', 'برنج دودی', 'زیتون ماری', 'زیتون شکسته', 'چای کرک'],
      data: [12, 19, 3, 5, 2, 3],
      label: 'فروش روزانه'
    },
    weekly: {
      labels: ['برنج هاشمی', 'برنج صدری', 'برنج دودی', 'زیتون ماری', 'زیتون شکسته', 'چای کرک'],
      data: [65, 59, 80, 81, 56, 55],
      label: 'فروش هفتگی'
    },
    monthly: {
      labels: ['برنج هاشمی', 'برنج صدری', 'برنج دودی', 'زیتون ماری', 'زیتون شکسته', 'چای کرک'],
      data: [280, 250, 300, 290, 200, 220],
      label: 'فروش ماهانه'
    },
    yearly: {
      labels: ['برنج هاشمی', 'برنج صدری', 'برنج دودی', 'زیتون ماری', 'زیتون شکسته', 'چای کرک'],
      data: [3200, 2800, 3500, 3300, 2400, 2600],
      label: 'فروش سالانه'
    },
    twoYearly: {
      labels: ['برنج هاشمی', 'برنج صدری', 'برنج دودی', 'زیتون ماری', 'زیتون شکسته', 'چای کرک'],
      data: [6500, 5800, 7200, 6800, 4800, 5200],
      label: 'فروش دو سال اخیر'
    }
  };

  // گزینه‌های دراپ‌داون
  const timePeriodOptions = [
    { name: 'روزانه', value: 'daily' },
    { name: 'هفتگی', value: 'weekly' },
    { name: 'ماهانه', value: 'monthly' },
    { name: 'سالانه', value: 'yearly' },
    { name: 'دو سال اخیر', value: 'twoYearly' }
  ];

  // داده‌های نمودار بر اساس بازه زمانی انتخاب شده
  const currentSalesData = {
    labels: salesDataByPeriod[selectedTimePeriod].labels,
    datasets: [
      {
        label: salesDataByPeriod[selectedTimePeriod].label,
        data: salesDataByPeriod[selectedTimePeriod].data,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      }
    ]
  };

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/userinfo", { credentials: "include" });
        if (!res.ok) {
          router.replace("/login");
          return;
        }
        const data = await res.json();
        setUserRole(data.role);
        
        // چک کردن نقش admin
        if (data.role !== "admin") {
          router.replace("/");
          return;
        }
        
        fetchUsers();
        setLoading(false);
      } catch (error) {
        console.error("Error checking user:", error);
        router.replace("/login");
      }
    }

    checkUser();
  }, [router]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/products");
        const products = await response.json();

        // جمع‌آوری تمام نظرات از محصولات
        const allComments = products.reduce((acc, product) => {
          const productComments = product.comments.map(comment => ({
            ...comment,
            productTitle: product.title,
            productId: product.id
          }));
          return [...acc, ...productComments];
        }, []);

        setComments(allComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  // دریافت لیست کاربران
  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        console.log("data------", data);
        setUsers(data);
        setFilteredUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // فیلتر و مرتب‌سازی کاربران
  useEffect(() => {
    let filtered = [...users];
    
    // مرتب‌سازی
    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }
    
    setFilteredUsers(filtered);
  }, [users, sortField, sortOrder]);

  // فیلتر نظرات
  useEffect(() => {
    let filtered = [...comments];
    
    if (globalFilterValue) {
      filtered = filtered.filter(comment => 
        comment.username?.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
        comment.productTitle?.toLowerCase().includes(globalFilterValue.toLowerCase()) ||
        comment.text?.toLowerCase().includes(globalFilterValue.toLowerCase())
      );
    }
    
    setFilteredComments(filtered);
  }, [comments, globalFilterValue]);

  const roleBodyTemplate = (role) => {
    return (
      <Badge 
        variant={role === "admin" ? "default" : "secondary"}
        className={role === "admin" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 hover:bg-gray-500"}
      >
        {role}
      </Badge>
    );
  };


  const handleRoleChange = (user) => {
    setSelectedUser(user);
    setRoleChangeDialogVisible(true);
  };

  const confirmRoleChange = async () => {
    try {
      const newRole = selectedUser.role === "admin" ? "user" : "admin";
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setRoleChangeDialogVisible(false);
        fetchUsers(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedUser),
      });

      if (response.ok) {
        setEditDialogVisible(false);
        fetchUsers(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteDialogVisible(false);
        fetchUsers(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleViewEdit = async () => {
    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedUser),
      });

      if (response.ok) {
        setViewDialogVisible(false);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const [visible, setVisible] = useState(false);

  // 1️⃣ تمام خریدها رو به یک آرایه‌ی واحد جمع می‌کنیم
  const allPurchases = users.flatMap((user) => user.purchases);

  // 2️⃣ گروه‌بندی بر اساس purchaseDate
  const groupedByDate = {};

  allPurchases.forEach((purchase) => {
    // اطمینان از وجود تاریخ
    if (!purchase.purchaseDateJalali) return;

    const date = purchase.purchaseDateJalali;
    const productKey = `product${purchase.productId}`;

    // اگر برای تاریخ فعلی آبجکت وجود نداشت، بساز
    if (!groupedByDate[date]) {
      groupedByDate[date] = { date };
    }

    // مقدار قبلی یا ۰
    groupedByDate[date][productKey] =
      (groupedByDate[date][productKey] || 0) + purchase.quantity;
  });

  // 3️⃣ تبدیل به آرایه و مرتب‌سازی بر اساس تاریخ
  const result = Object.values(groupedByDate)
    .filter(item => item.date) // حذف مواردی که تاریخ ندارند
    .sort((a, b) => {
      try {
        // تبدیل تاریخ شمسی به آرایه برای مقایسه
        const [aYear, aMonth, aDay] = a.date.split('/').map(Number);
        const [bYear, bMonth, bDay] = b.date.split('/').map(Number);

        // مقایسه سال
        if (aYear !== bYear) return aYear - bYear;
        // مقایسه ماه
        if (aMonth !== bMonth) return aMonth - bMonth;
        // مقایسه روز
        return aDay - bDay;
      } catch (error) {
        console.error('Error sorting dates:', error);
        return 0;
      }
    });

  // نمایش نتیجه
  console.log('Sorted data:', result);


  const ratingBodyTemplate = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };



  const handleDeleteComment = async () => {
    try {
      // حذف نظر از محصول مربوطه
      const response = await fetch(`/api/products/${selectedComment.id}/comments/${selectedComment.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // به‌روزرسانی لیست نظرات
        const updatedComments = comments.filter(comment => comment.id !== selectedComment.id);
        setComments(updatedComments);
        setDeleteCommentDialogVisible(false);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };



  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B090A] py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-20">
        <h1 className="text-4xl font-bold text-[#38b000] text-center mb-12">
          داشبورد
        </h1>

        {/* نمودار فروش محصولات */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#38b000]">
              آمار فروش محصولات
            </h2>
            <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="انتخاب بازه زمانی" />
              </SelectTrigger>
              <SelectContent>
                {timePeriodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="h-[500px]">
            <Bar data={currentSalesData} options={barOptions} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* نمودار جنسیت */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#38b000] mb-6 text-center">
              توزیع جنسیت کاربران
            </h2>
            <div className="h-[400px] flex items-center justify-center">
              <Pie data={genderData} options={options} />
            </div>
          </div>

          {/* نمودار توزیع جغرافیایی */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#38b000] mb-6 text-center">
              توزیع جغرافیایی کاربران
            </h2>
            <div className="h-[400px] flex items-center justify-center">
              <Pie data={locationData} options={options} />
            </div>
          </div>
        </div>

        {/* توضیحات */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#38b000] mb-4">
            توضیحات
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              • نمودار فروش محصولات نشان می‌دهد که برنج هاشمی و صدری بیشترین فروش را در تمام بازه‌های زمانی دارند.
            </p>
            <p>
              • نمودار جنسیت نشان می‌دهد که ۴۵٪ از کاربران آقا، ۴۰٪ خانم و ۱۵٪ نامشخص هستند.
            </p>
            <p>
              • نمودار توزیع جغرافیایی نشان می‌دهد که بیشترین کاربران از استان‌های تهران (۳۰٪)، گیلان (۲۵٪) و اصفهان (۱۵٪) هستند.
            </p>
          </div>
        </div>

        {/* Add SimpleLineChart */}
        <div className="mb-8 h-[400px] bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">نمودار فروش</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              data={result}
            >
              <CartesianGrid stroke="#ccc" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="product1" stroke="#8884d8" name="برنج هاشمی" />
              <Line type="monotone" dataKey="product2" stroke="#82ca9d" name="برنج صدری" />
              <Line type="monotone" dataKey="product3" stroke="#fb8500" name="برنج دودی" />
              <Line type="monotone" dataKey="product4" stroke="#8ecae6" name="برنج دم سیاه" />
              <Line type="monotone" dataKey="product5" stroke="#ff8fab" name="زیتون ماری" />
              <Line type="monotone" dataKey="product6" stroke="#ffd60a" name="زیتون شکسته" />
              <Line type="monotone" dataKey="product7" stroke="#adc178" name="زیتون کنسروی" />
              <Line type="monotone" dataKey="product8" stroke="#f00" name="رشته خشکار" />
              <Line type="monotone" dataKey="product9" stroke="#4CAF50" name="چای کرک" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* آمار مالی و پرداخت‌ها */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">آمار مالی و پرداخت‌ها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* کارت درآمد کل */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">درآمد کل</h3>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">۲۵,۰۰۰,۰۰۰ تومان</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <span className="text-green-600 dark:text-green-400 text-xl">💰</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-600 dark:text-green-400 text-sm flex items-center gap-1">
                    <span>↑</span> ۱۲٪ نسبت به ماه گذشته
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* کارت تعداد سفارشات */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">تعداد سفارشات</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">۱۵۶ سفارش</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <span className="text-blue-600 dark:text-blue-400 text-xl">🛒</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1">
                    <span>↑</span> ۸٪ نسبت به ماه گذشته
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* کارت میانگین سبد خرید */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">میانگین سبد خرید</h3>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">۱۶۰,۰۰۰ تومان</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">📊</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-purple-600 dark:text-purple-400 text-sm flex items-center gap-1">
                    <span>↑</span> ۵٪ نسبت به ماه گذشته
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* کارت تعداد مشتریان جدید */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">مشتریان جدید</h3>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">۲۴ مشتری</p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                    <span className="text-orange-600 dark:text-orange-400 text-xl">👥</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-orange-600 dark:text-orange-400 text-sm flex items-center gap-1">
                    <span>↑</span> ۱۵٪ نسبت به ماه گذشته
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* جدول کاربران */}
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                مدیریت کاربران
              </CardTitle>
              <Button
                onClick={() => setVisible(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                افزودن کاربر
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">در حال بارگذاری...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">هیچ کاربری یافت نشد</div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead 
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => {
                            setSortField('id');
                            setSortOrder(sortField === 'id' && sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          شناسه {sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => {
                            setSortField('username');
                            setSortOrder(sortField === 'username' && sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          نام کاربری {sortField === 'username' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => {
                            setSortField('email');
                            setSortOrder(sortField === 'email' && sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          ایمیل {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </TableHead>
                        <TableHead>رمز عبور</TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => {
                            setSortField('role');
                            setSortOrder(sortField === 'role' && sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          نقش {sortField === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => {
                            setSortField('purchases');
                            setSortOrder(sortField === 'purchases' && sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          تعداد خریدها {sortField === 'purchases' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </TableHead>
                        <TableHead>عملیات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers
                        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                        .map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium text-center">{user.id}</TableCell>
                          <TableCell className="text-center">{user.username}</TableCell>
                          <TableCell className="text-center">{user.email}</TableCell>
                          <TableCell className="text-center">
                            <span className="font-bold text-primary">{user.password}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            {roleBodyTemplate(user.role)}
                          </TableCell>
                          <TableCell className="text-center">
                            {user.purchases?.length || 0}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setViewDialogVisible(true);
                                  router.push(`/purchases/${user.id}`);
                                }}
                              >
                                <CiRead className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setDeleteDialogVisible(true);
                                }}
                              >
                                <CiTrash className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => handleRoleChange(user)}
                              >
                                <CiUser className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setEditDialogVisible(true);
                                }}
                              >
                                <CiEdit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Label>تعداد در هر صفحه:</Label>
                    <Select value={rowsPerPage.toString()} onValueChange={(val) => {
                      setRowsPerPage(Number(val));
                      setCurrentPage(1);
                    }}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      قبلی
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      صفحه {currentPage} از {Math.ceil(filteredUsers.length / rowsPerPage)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredUsers.length / rowsPerPage), prev + 1))}
                      disabled={currentPage >= Math.ceil(filteredUsers.length / rowsPerPage)}
                    >
                      بعدی
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* جدول نظرات */}
        <Card className="mb-8 border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                بازخوردها و نظرات مشتریان
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="جستجو..."
                    value={globalFilterValue}
                    onChange={(e) => setGlobalFilterValue(e.target.value)}
                    className="pr-10 w-64"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    🔍
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">در حال بارگذاری...</div>
            ) : filteredComments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">هیچ نظری یافت نشد</div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>نام کاربر</TableHead>
                        <TableHead>نام محصول</TableHead>
                        <TableHead>متن نظر</TableHead>
                        <TableHead>امتیاز</TableHead>
                        <TableHead>تاریخ ثبت</TableHead>
                        <TableHead className="text-center">عملیات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredComments
                        .slice((commentsPage - 1) * commentsRowsPerPage, commentsPage * commentsRowsPerPage)
                        .map((comment) => (
                        <TableRow key={comment.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{comment.username}</TableCell>
                          <TableCell>{comment.productTitle}</TableCell>
                          <TableCell className="max-w-md">
                            <p className="line-clamp-2">{comment.text}</p>
                          </TableCell>
                          <TableCell>
                            {ratingBodyTemplate(comment.rating)}
                          </TableCell>
                          <TableCell>{comment.createdAtJalali || comment.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex justify-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => {
                                  setSelectedComment(comment);
                                  setDeleteCommentDialogVisible(true);
                                }}
                              >
                                <CiTrash className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Label>تعداد در هر صفحه:</Label>
                    <Select value={commentsRowsPerPage.toString()} onValueChange={(val) => {
                      setCommentsRowsPerPage(Number(val));
                      setCommentsPage(1);
                    }}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCommentsPage(prev => Math.max(1, prev - 1))}
                      disabled={commentsPage === 1}
                    >
                      قبلی
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      صفحه {commentsPage} از {Math.ceil(filteredComments.length / commentsRowsPerPage)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCommentsPage(prev => Math.min(Math.ceil(filteredComments.length / commentsRowsPerPage), prev + 1))}
                      disabled={commentsPage >= Math.ceil(filteredComments.length / commentsRowsPerPage)}
                    >
                      بعدی
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* add user Dialog */}
        <Dialog open={visible} onOpenChange={setVisible}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>افزودن کاربر</DialogTitle>
              <DialogDescription>
                اطلاعات کاربر جدید را وارد کنید
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username">نام کاربری</Label>
                <Input
                  id="username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUseremail}
                  onChange={(e) => setNewUseremail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUserpass}
                  onChange={(e) => setNewUserpass(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setVisible(false)}>
                انصراف
              </Button>
              <Button onClick={() => setVisible(false)}>
                افزودن
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editDialogVisible} onOpenChange={setEditDialogVisible}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>ویرایش کاربر</DialogTitle>
              <DialogDescription>
                اطلاعات کاربر را ویرایش کنید
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-username">نام کاربری</Label>
                  <Input
                    id="edit-username"
                    value={selectedUser.username}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, username: e.target.value })
                    }
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">ایمیل</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-password">رمز عبور</Label>
                  <Input
                    id="edit-password"
                    type="password"
                    value={selectedUser.password}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogVisible(false)}>
                انصراف
              </Button>
              <Button 
                onClick={handleEdit}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                ذخیره
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View/Edit Dialog */}
        <Dialog open={viewDialogVisible} onOpenChange={setViewDialogVisible}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>ویرایش کاربر {selectedUser?.username}</DialogTitle>
              <DialogDescription>
                اطلاعات کاربر را مشاهده و ویرایش کنید
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="view-username">نام کاربری</Label>
                  <Input
                    id="view-username"
                    value={selectedUser.username}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, username: e.target.value })
                    }
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-email">ایمیل</Label>
                  <Input
                    id="view-email"
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-password">رمز عبور</Label>
                  <Input
                    id="view-password"
                    type="password"
                    value={selectedUser.password}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDialogVisible(false)}>
                انصراف
              </Button>
              <Button 
                onClick={handleViewEdit}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                ذخیره
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={deleteDialogVisible} onOpenChange={setDeleteDialogVisible}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تایید حذف</DialogTitle>
              <DialogDescription>
                آیا از حذف کاربر {selectedUser?.username} اطمینان دارید؟
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogVisible(false)}>
                خیر
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDelete}
              >
                بله، حذف کن
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Role Change Dialog */}
        <Dialog open={roleChangeDialogVisible} onOpenChange={setRoleChangeDialogVisible}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تغییر نقش کاربر</DialogTitle>
              <DialogDescription>
                آیا از تغییر نقش کاربر <strong>{selectedUser?.username}</strong> از{" "}
                <strong>{selectedUser?.role}</strong> به{" "}
                <strong>{selectedUser?.role === "admin" ? "کاربر عادی" : "مدیر"}</strong> اطمینان
                دارید؟
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRoleChangeDialogVisible(false)}>
                انصراف
              </Button>
              <Button 
                onClick={confirmRoleChange}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                تایید
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Comment Dialog */}
        <Dialog open={deleteCommentDialogVisible} onOpenChange={setDeleteCommentDialogVisible}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تایید حذف</DialogTitle>
              <DialogDescription>
                آیا از حذف این نظر اطمینان دارید؟
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteCommentDialogVisible(false)}>
                خیر
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteComment}
              >
                بله، حذف کن
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
