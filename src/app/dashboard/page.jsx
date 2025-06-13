"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { FaTrash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
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
import { Rating } from "primereact/rating";
import { Card } from "primereact/card";


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
        // if (data.role !== "admin") {
        //   router.replace("/");
        //   return;
        // }
        setUserRole(data.role);
        fetchUsers();
        setLoading(false);
      } catch (error) {
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
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const roleBodyTemplate = (rowData) => {
    return (
      <Tag
        rounded
        value={rowData.role}
        // severity={rowData.role === "admin" ? "#8ecae6" : "#e0e1dd"}
        className={`text-center ${rowData.role === "admin" ? "bg-[#8ecae6]" : "bg-[#e0e1dd]"
          }`}
      />
    );
  };

  const purchasesBodyTemplate = (rowData) => {
    return <div className="text-center">{rowData.purchases.length}</div>;
  };

  const passwordBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center justify-content-center">
        <span className="font-bold text-primary">{rowData.password}</span>
      </div>
    );
  };

  const actionsBodyTemplate = (rowData) => {
    console.log(rowData);
    return (
      <div className="flex gap-2 justify-content-center">
        <CiRead
          className="cursor-pointer text-blue-600 text-xl"
          onClick={() => {
            setSelectedUser(rowData);
            setViewDialogVisible(true);
            router.push(`/purchases/${rowData.id}`);
          }}
        />
        <CiTrash
          className="cursor-pointer text-red-600 text-xl"
          onClick={() => {
            setSelectedUser(rowData);
            setDeleteDialogVisible(true);
          }}
        />
        <CiUser
          className="cursor-pointer text-blue-600 text-xl"
          onClick={() => handleRoleChange(rowData)}
        />
        <CiEdit
          className="cursor-pointer text-green-600 text-xl"
          onClick={() => {
            setSelectedUser(rowData);
            setEditDialogVisible(true);
          }}
        />
      </div>
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

  const editDialogFooter = (
    <div>
      <Button
        label="انصراف"
        icon="pi pi-times"
        onClick={() => setEditDialogVisible(false)}
        className="p-button-text"
      />
      <Button
        className="bg-green-700"
        label="ذخیره"
        icon="pi pi-check"
        onClick={handleEdit}
        autoFocus
      />
    </div>
  );

  const deleteDialogFooter = (
    <div>
      <Button
        label="خیر"
        icon="pi pi-times"
        onClick={() => setDeleteDialogVisible(false)}
        className="p-button-text"
      />
      <Button
        label="بله"
        icon="pi pi-check"
        onClick={handleDelete}
        severity="danger"
        autoFocus
      />
    </div>
  );

  const viewDialogFooter = (
    <div>
      <Button
        label="انصراف"
        icon="pi pi-times"
        onClick={() => setViewDialogVisible(false)}
        className="p-button-text"
      />
      <Button
        label="ذخیره"
        icon="pi pi-check"
        onClick={handleViewEdit}
        autoFocus
      />
    </div>
  );

  const roleChangeDialogFooter = (
    <div>
      <Button
        label="انصراف"
        icon="pi pi-times"
        onClick={() => setRoleChangeDialogVisible(false)}
        className="p-button-text bg-red-700 text-white rounded px-3 py-1"
      />
      <Button
        label="تایید"
        icon="pi pi-check"
        onClick={confirmRoleChange}
        severity="warning"
        autoFocus
        className="bg-green-700 mx-3  text-white rounded px-3 py-1"
      />
    </div>
  );

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

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

  const filters = {
    global: { value: globalFilterValue, matchMode: "contains" },
    username: { value: null, matchMode: "contains" },
    productTitle: { value: null, matchMode: "contains" },
    text: { value: null, matchMode: "contains" }
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly stars={5} cancel={false} />;
  };

  const dateBodyTemplate = (rowData) => {
    return rowData.createdAtJalali;
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">نظرات کاربران</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={(e) => setGlobalFilterValue(e.target.value)}
          placeholder="جستجو..."
          className="p-inputtext-sm"
        />
      </span>
    </div>
  );

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

  const deleteCommentDialogFooter = (
    <div>
      <Button
        label="خیر"
        icon="pi pi-times"
        onClick={() => setDeleteCommentDialogVisible(false)}
        className="p-button-text"
      />
      <Button
        label="بله"
        icon="pi pi-check"
        onClick={handleDeleteComment}
        severity="danger"
        autoFocus
      />
    </div>
  );

  const commentActionsBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2 justify-content-center">
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="secondary"
          style={{ color: 'black' }}
          onClick={() => {
            setSelectedComment(rowData);
            setDeleteCommentDialogVisible(true);
          }}
        />
      </div>
    );
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
            <Dropdown
              value={selectedTimePeriod}
              options={timePeriodOptions}
              onChange={(e) => setSelectedTimePeriod(e.value)}
              optionLabel="name"
              optionValue="value"
              placeholder="انتخاب بازه زمانی"
              className="w-48"
            />
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
            <Card className="dark:bg-red-600 shadow-lg rounded-lg">
              <div className="p-4 dark:bg-red-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-500 text-sm">درآمد کل</h3>
                    <p className="text-2xl font-bold text-green-600">۲۵,۰۰۰,۰۰۰ تومان</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <i className="pi pi-dollar text-green-600 text-xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-600 text-sm">
                    <i className="pi pi-arrow-up"></i> ۱۲٪ نسبت به ماه گذشته
                  </span>
                </div>
              </div>
            </Card>

            {/* کارت تعداد سفارشات */}
            <Card className="dark:bg-[#161A1D] shadow-lg rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-500 text-sm">تعداد سفارشات</h3>
                    <p className="text-2xl font-bold text-blue-600">۱۵۶ سفارش</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <i className="pi pi-shopping-cart text-blue-600 text-xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-blue-600 text-sm">
                    <i className="pi pi-arrow-up"></i> ۸٪ نسبت به ماه گذشته
                  </span>
                </div>
              </div>
            </Card>

            {/* کارت میانگین سبد خرید */}
            <Card className="dark:bg-[#161A1D] shadow-lg rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-500 text-sm">میانگین سبد خرید</h3>
                    <p className="text-2xl font-bold text-purple-600">۱۶۰,۰۰۰ تومان</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <i className="pi pi-chart-line text-purple-600 text-xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-purple-600 text-sm">
                    <i className="pi pi-arrow-up"></i> ۵٪ نسبت به ماه گذشته
                  </span>
                </div>
              </div>
            </Card>

            {/* کارت تعداد مشتریان جدید */}
            <Card className="dark:bg-[#161A1D] shadow-lg rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-500 text-sm">مشتریان جدید</h3>
                    <p className="text-2xl font-bold text-orange-600">۲۴ مشتری</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <i className="pi pi-users text-orange-600 text-xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-orange-600 text-sm">
                    <i className="pi pi-arrow-up"></i> ۱۵٪ نسبت به ماه گذشته
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* <Button label="افزودن کاربر" icon="pi pi-check" iconPos="right" /> */}
        <Button
          label="افزودن کاربر"
          icon="pi pi-arrow-down"
          onClick={() => show("top")}
          className="p-button-warning"
          style={{ minWidth: "10rem" }}
        />

        <div className="card">
          <DataTable
            value={users}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            className="p-datatable-sm"
            emptyMessage="هیچ کاربری یافت نشد"
            loading={loading}
            dir="rtl"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          >
            <Column
              field="id"
              header="شناسه"
              sortable
              style={{ width: "5%" }}
              className="text-center"
            ></Column>
            <Column
              field="username"
              header="نام کاربری"
              sortable
              style={{ width: "15%" }}
              className="text-center"
            ></Column>
            <Column
              field="email"
              header="ایمیل"
              sortable
              style={{ width: "20%" }}
              className="text-center"
            ></Column>
            <Column
              field="password"
              header="رمز عبور"
              body={passwordBodyTemplate}
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="role"
              header="نقش"
              body={roleBodyTemplate}
              sortable
              style={{ width: "15%" }}
            ></Column>
            <Column
              field="purchases"
              header="تعداد خریدها"
              body={purchasesBodyTemplate}
              sortable
              style={{ width: "10%" }}
            ></Column>
            <Column
              body={actionsBodyTemplate}
              header="عملیات"
              style={{ width: "15%" }}
            ></Column>
          </DataTable>
        </div>

        <Dropdown
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.value)}
          options={durations}
          optionLabel="name"
          placeholder="Select a duration"
          className="w-full md:w-14rem"
        />

        <h3 className="text-center">بازخوردها و نظرات مشتریان</h3>

        <div className="card">
          <Card>
            <DataTable
              value={comments}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              loading={loading}
              filters={filters}
              globalFilterFields={["username", "productTitle", "text"]}
              header={header}
              emptyMessage="هیچ نظری یافت نشد."
              className="p-datatable-sm"
            >
              <Column
                field="username"
                header="نام کاربر"
                sortable
                filter
                filterPlaceholder="جستجو بر اساس نام کاربر"
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="productTitle"
                header="نام محصول"
                sortable
                filter
                filterPlaceholder="جستجو بر اساس نام محصول"
                style={{ minWidth: "14rem" }}
              />
              <Column
                field="text"
                header="متن نظر"
                sortable
                filter
                filterPlaceholder="جستجو در متن نظر"
                style={{ minWidth: "20rem" }}
              />
              <Column
                field="rating"
                header="امتیاز"
                sortable
                body={ratingBodyTemplate}
                style={{ minWidth: "10rem" }}
              />
              <Column
                field="createdAtJalali"
                header="تاریخ ثبت"
                sortable
                body={dateBodyTemplate}
                style={{ minWidth: "10rem" }}
              />
              <Column
                body={commentActionsBodyTemplate}
                header="عملیات"
                style={{ minWidth: "8rem" }}
                className="text-center"
              />
            </DataTable>
          </Card>
        </div>

        {/* add user Dialog */}
        <Dialog
          header="افزودن کاربر"
          visible={visible}
          position={position}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          footer={footerContent}
          draggable={false}
          resizable={false}
        >
          <div className="field bg-red-200">
            <div>
              <label htmlFor="username">نام کاربری</label>
              <InputText
                id="username"
                className="w-full"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="email">ایمیل</label>
              <InputText
                id="email"
                className="w-full"
                value={newUseremail}
                onChange={(e) => setNewUseremail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password">رمز عبور</label>
              <InputText
                id="password"
                className="w-full"
                value={newUserpass}
                onChange={(e) => setNewUserpass(e.target.value)}
                required
              />
            </div>
          </div>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog
          visible={editDialogVisible}
          style={{ width: "450px" }}
          header="ویرایش کاربر"
          modal
          className="p-fluid"
          footer={editDialogFooter}
          onHide={() => setEditDialogVisible(false)}
          dir="rtl"
        >
          {selectedUser && (
            <div className="field bg-red-200">
              <label htmlFor="username">نام کاربری</label>
              <InputText
                id="username"
                value={selectedUser.username}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
                required
                autoFocus
              />
              <label htmlFor="email">ایمیل</label>
              <InputText
                id="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                required
              />
              <label htmlFor="password">رمز عبور</label>
              <InputText
                id="password"
                value={selectedUser.password}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, password: e.target.value })
                }
                required
              />
            </div>
          )}
        </Dialog>

        {/* View/Edit Dialog */}
        <Dialog
          visible={viewDialogVisible}
          style={{ width: "450px" }}
          header={`ویرایش کاربر ${selectedUser?.username}`}
          modal
          className="p-fluid bg-slate-200 p-5 rounded-lg"
          footer={viewDialogFooter}
          onHide={() => setViewDialogVisible(false)}
          dir="rtl"
        >
          {selectedUser && (
            <div className="field my-6">
              <label htmlFor="view-username">نام کاربری</label>
              <InputText
                className="bg-white rounded py-2 px-3 my-4"
                id="view-username"
                value={selectedUser.username}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
                required
                autoFocus
              />
              <label htmlFor="view-email">ایمیل</label>
              <InputText
                className="bg-white rounded py-2 px-3 mb-4"
                id="view-email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                required
              />
              <label htmlFor="view-password">رمز عبور</label>
              <InputText
                className="bg-white rounded py-2 px-3 mb-4"
                id="view-password"
                value={selectedUser.password}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, password: e.target.value })
                }
                required
              />
            </div>
          )}
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          visible={deleteDialogVisible}
          style={{ width: "450px" }}
          header="تایید حذف"
          modal
          footer={deleteDialogFooter}
          onHide={() => setDeleteDialogVisible(false)}
          dir="rtl"
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            <span>آیا از حذف این کاربر اطمینان دارید؟</span>
          </div>
        </Dialog>

        {/* Role Change Dialog */}
        <Dialog
          visible={roleChangeDialogVisible}
          style={{ width: "450px" }}
          header="تغییر نقش کاربر"
          modal
          footer={roleChangeDialogFooter}
          onHide={() => setRoleChangeDialogVisible(false)}
          dir="rtl"
          className="bg-red-200 p-5 rounded-lg"
        >
          <div className="confirmation-content bg-red-200">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            <span>
              آیا از تغییر نقش کاربر {selectedUser?.username} از{" "}
              {selectedUser?.role} به{" "}
              {selectedUser?.role === "admin" ? "کاربر عادی" : "مدیر"} اطمینان
              دارید؟
            </span>
          </div>
        </Dialog>

        {/* Delete Comment Dialog */}
        <Dialog
          visible={deleteCommentDialogVisible}
          style={{ width: "450px" }}
          header="تایید حذف"
          modal
          footer={deleteCommentDialogFooter}
          onHide={() => setDeleteCommentDialogVisible(false)}
          dir="rtl"
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            <span>آیا از حذف این نظر اطمینان دارید؟</span>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
