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
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

import { FaReply, FaTrash, FaEdit } from "react-icons/fa";
import { Dropdown } from "primereact/dropdown";
import { TabPanel, TabView } from "primereact/tabview";
import { ProgressBar } from "primereact/progressbar";
import { Avatar } from "primereact/avatar";
import { Rating } from "primereact/rating";
// import { FaTrash } from 'react-icons/fa';

// ثبت کامپوننت‌های مورد نیاز Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
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
  const [deleteCommentDialogVisible, setDeleteCommentDialogVisible] =
    useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("daily");
  const durations = [
    { name: "روزانه", code: "day" },
    { name: "هفتگی", code: "weekly" },
    { name: "ماهانه", code: "monthly" },
    { name: "سالانه", code: "LDN" },
  ];

  // داده‌های جنسیت کاربران
  const genderData = {
    labels: ["آقایان", "خانم‌ها", "نامشخص"],
    datasets: [
      {
        data: [45, 40, 15],
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // داده‌های توزیع جغرافیایی
  const locationData = {
    labels: [
      "تهران",
      "گیلان",
      "اصفهان",
      "خراسان رضوی",
      "فارس",
      "سایر استان‌ها",
    ],
    datasets: [
      {
        data: [30, 25, 15, 10, 8, 12],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
        position: "bottom",
        labels: {
          font: {
            family: "Vazirmatn",
          },
        },
      },
      title: {
        display: true,
        text: "توزیع کاربران",
        font: {
          family: "Vazirmatn",
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
        position: "top",
        labels: {
          font: {
            family: "Vazirmatn",
          },
        },
      },
      title: {
        display: true,
        text: "آمار فروش محصولات",
        font: {
          family: "Vazirmatn",
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "تعداد فروش",
          font: {
            family: "Vazirmatn",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "محصولات",
          font: {
            family: "Vazirmatn",
          },
        },
      },
    },
  };

  // داده‌های فروش محصولات بر اساس بازه زمانی
  const salesDataByPeriod = {
    daily: {
      labels: [
        "برنج هاشمی",
        "برنج صدری",
        "برنج دودی",
        "زیتون ماری",
        "زیتون شکسته",
        "چای کرک",
      ],
      data: [12, 19, 3, 5, 2, 3],
      label: "فروش روزانه",
    },
    weekly: {
      labels: [
        "برنج هاشمی",
        "برنج صدری",
        "برنج دودی",
        "زیتون ماری",
        "زیتون شکسته",
        "چای کرک",
      ],
      data: [65, 59, 80, 81, 56, 55],
      label: "فروش هفتگی",
    },
    monthly: {
      labels: [
        "برنج هاشمی",
        "برنج صدری",
        "برنج دودی",
        "زیتون ماری",
        "زیتون شکسته",
        "چای کرک",
      ],
      data: [280, 250, 300, 290, 200, 220],
      label: "فروش ماهانه",
    },
    yearly: {
      labels: [
        "برنج هاشمی",
        "برنج صدری",
        "برنج دودی",
        "زیتون ماری",
        "زیتون شکسته",
        "چای کرک",
      ],
      data: [3200, 2800, 3500, 3300, 2400, 2600],
      label: "فروش سالانه",
    },
    twoYearly: {
      labels: [
        "برنج هاشمی",
        "برنج صدری",
        "برنج دودی",
        "زیتون ماری",
        "زیتون شکسته",
        "چای کرک",
      ],
      data: [6500, 5800, 7200, 6800, 4800, 5200],
      label: "فروش دو سال اخیر",
    },
  };

  // گزینه‌های دراپ‌داون
  const timePeriodOptions = [
    { name: "روزانه", value: "daily" },
    { name: "هفتگی", value: "weekly" },
    { name: "ماهانه", value: "monthly" },
    { name: "سالانه", value: "yearly" },
    { name: "دو سال اخیر", value: "twoYearly" },
  ];

  // داده‌های نمودار بر اساس بازه زمانی انتخاب شده
  const currentSalesData = {
    labels: salesDataByPeriod[selectedTimePeriod].labels,
    datasets: [
      {
        label: salesDataByPeriod[selectedTimePeriod].label,
        data: salesDataByPeriod[selectedTimePeriod].data,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    ],
  };

  // useEffect(() => {
  //   async function checkUser() {
  //     try {
  //       const res = await fetch("/api/userinfo", { credentials: "include" });
  //       if (!res.ok) {
  //         router.replace("/login");
  //         return;
  //       }
  //       const data = await res.json();
  //       setUserRole(data.role);

  //       if (data.role !== "admin") {
  //         router.replace("/");
  //         return;
  //       }

  //       fetchUsers();
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error checking user:", error);
  //       router.replace("/login");
  //     }
  //   }

  //   checkUser();
  // }, [router]);

  // get comments list ------------------------
  const fetchComments = async () => {
    try {
      const response = await fetch("/api/products");
      const products = await response.json();
      console.log(products);

      // جمع‌آوری تمام نظرات از محصولات
      const allComments = products.data.reduce((acc, product) => {
        const productComments = product.comments.map((comment) => ({
          ...comment,
          productTitle: product.title,
          productId: product.id,
        }));
        return [...acc, ...productComments];
      }, []);

      console.log(allComments);

      setComments(allComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  // get users list ------------------------
  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");

      const data = await res.json();
      console.log(data);
      setUsers(data.users);

      // setFilteredUsers(data.users);

      // if (res.ok) {
      //   const data = await res.json();
      //   console.log("data------", data);
      //   setUsers(data.users);
      // }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // get products list ------------------------
  async function fetchProducts() {
    try {
      const response = await fetch("/api/products");
      const products = await response.json();
      console.log({ products });
      setProducts(products.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  // get all data
  useEffect(() => {
    fetchComments();
    fetchUsers();
    fetchProducts();
  }, []);

  const roleBodyTemplate = (rowData) => {
    console.log(rowData);
    // style={{ backgroundColor: "#f0f0f0" }}
    return (
      <Tag
        rounded
        value={rowData.role}
        // severity={rowData.role === "admin" ? "#8ecae6" : "#e0e1dd"}
        style={{
          backgroundColor: rowData.role === "admin" ? "#8ecae6" : "#e0e1dd",
        }}
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

  const roleBodyTemplate2 = (role) => {
    return (
      <Badge
        variant={role === "admin" ? "default" : "secondary"}
        className={
          role === "admin"
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 hover:bg-gray-500"
        }
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

  const filters = {
    global: { value: globalFilterValue, matchMode: "contains" },
    username: { value: null, matchMode: "contains" },
    productTitle: { value: null, matchMode: "contains" },
    text: { value: null, matchMode: "contains" },
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly stars={5} cancel={false} />;
  };

  const dateBodyTemplate = (rowData) => {
    return rowData.createdAtJalali;
  };

  const header = (
    <div className="flex  flex-wrap gap-2 items-center justify-between">
      <h4 className="m-0">نظرات کاربران</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          size="small"
          onChange={(e) => setGlobalFilterValue(e.target.value)}
          placeholder="جستجو..."
          className="p-inputtext-sm"
        />
      </span>
    </div>
  );

  const headerUser = (
    <div className="flex  flex-wrap gap-2 items-center justify-between">
      <Button
        label="افزودن کاربر"
        icon="pi pi-arrow-down"
        onClick={() => show("top")}
        className="p-button-warning"
        style={{ minWidth: "10rem" }}
      />
    </div>
  );

  const headerProduct = (
    <div className="flex  flex-wrap gap-2 items-center justify-between">
      <Button
        label="افزودن محصول"
        icon="pi pi-arrow-down"
        onClick={() => show("top")}
        className="p-button-warning"
        style={{ minWidth: "10rem" }}
      />
    </div>
  );

  const handleDeleteComment = async () => {
    try {
      // حذف نظر از محصول مربوطه
      const response = await fetch(
        `/api/products/${selectedComment.id}/comments/${selectedComment.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        // به‌روزرسانی لیست نظرات
        const updatedComments = comments.filter(
          (comment) => comment.id !== selectedComment.id,
        );
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
      <div className="flex gap-2 justify-content-center items-center">
        {/* <Button
          icon="pi pi-trash"
          rounded
          text
          severity="secondary"
          style={{ color: "black" }}
          onClick={() => {
            setSelectedComment(rowData);
            setDeleteCommentDialogVisible(true);
          }}
        /> */}
        <FaEdit  style={{ cursor: "pointer" }} color="blue" />
        <FaTrash
          onClick={() => {
            setSelectedComment(rowData);
            setDeleteCommentDialogVisible(true);
          }}
          style={{ cursor: "pointer" }}
          color="#dc3545"
        />

        <FaReply
          className="text-[#0e5fb0]"
          onClick={() => {
            setSelectedComment(rowData);
            setDeleteCommentDialogVisible(true);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);

  // Sample data for each tab
  const usersData = [
    {
      id: 1,
      name: "Emma Johnson",
      role: "Admin",
      status: "active",
      country: "USA",
      avatar: "E",
    },
    {
      id: 2,
      name: "Liam Smith",
      role: "Editor",
      status: "active",
      country: "UK",
      avatar: "L",
    },
    {
      id: 3,
      name: "Sophia Brown",
      role: "Viewer",
      status: "inactive",
      country: "Canada",
      avatar: "S",
    },
    {
      id: 4,
      name: "Oliver Jones",
      role: "Editor",
      status: "active",
      country: "Australia",
      avatar: "O",
    },
  ];

  const commentsData = [
    {
      id: 1,
      user: "Emma Johnson",
      text: "Great work on the new design!",
      date: "2023-10-01",
      rating: 5,
    },
    {
      id: 2,
      user: "Liam Smith",
      text: "Could we improve the loading speed?",
      date: "2023-10-02",
      rating: 4,
    },
    {
      id: 3,
      user: "Sophia Brown",
      text: "Love the new features!",
      date: "2023-10-03",
      rating: 5,
    },
    {
      id: 4,
      user: "Oliver Jones",
      text: "Found a small bug in the form.",
      date: "2023-10-04",
      rating: 3,
    },
  ];

  const reportsData = [
    { metric: "Total Users", value: "1,284", change: "+12%", icon: "pi-users" },
    {
      metric: "Active Sessions",
      value: "342",
      change: "+5%",
      icon: "pi-chart-line",
    },
    {
      metric: "New Comments",
      value: "87",
      change: "+18%",
      icon: "pi-comments",
    },
    {
      metric: "Conversion Rate",
      value: "3.2%",
      change: "-1%",
      icon: "pi-chart-line",
    },
  ];

  // Custom template for user avatar
  const userAvatarTemplate = (rowData) => {
    return (
      <Avatar
        label={rowData.avatar}
        shape="circle"
        className="mr-2"
        style={{ backgroundColor: "#3B82F6", color: "white" }}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={rowData.status === "active" ? "success" : "danger"}
      ></Tag>
    );
  };

  const ratingBodyTemplate2 = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B090A] py-16">
      <div className="mx-auto md:px-10">
        <h1 className="text-4xl font-bold text-[#38b000] text-center mb-12">
          گزارشات سایت{" "}
        </h1>

        {/* <Dropdown
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.value)}
          options={durations}
          optionLabel="name"
          placeholder="Select a duration"
          className="w-full md:w-14rem"
        /> */}

        <Card
          className="p-shadow-8"
          // style={{
          //   borderRadius: "24px",
          //   overflow: "hidden",
          //   width: "100%",
          //   maxWidth: "1200px",
          //   backdropFilter: "blur(10px)",
          //   background: "rgba(255,255,255,0.9)",
          // }}
        >
          {/* <div className="p-text-center p-mb-3">
            <h1
              className="p-mt-0"
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              گزارشات سایت
            </h1>
          </div> */}

          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
            className="custom-tabs"
          >
            {/* Tab 1: Reports */}
            <TabPanel
              header={
                <span>
                  <i className="pi pi-chart-line p-mr-2" />
                  آمار و اعداد
                </span>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* کارت درآمد کل */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-500 text-sm">درآمد کل</h3>
                        <p className="text-2xl font-bold text-green-600">
                          ۲۵,۰۰۰,۰۰۰ تومان
                        </p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                        <span className="text-green-600 dark:text-green-400 text-xl">
                          💰
                        </span>
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
                        <h3 className="text-gray-500 text-sm">تعداد سفارشات</h3>
                        <p className="text-2xl font-bold text-blue-600">
                          ۱۵۶ سفارش
                        </p>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                        <span className="text-blue-600 dark:text-blue-400 text-xl">
                          🛒
                        </span>
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
                        <h3 className="text-gray-500 text-sm">
                          میانگین سبد خرید
                        </h3>
                        <p className="text-2xl font-bold text-purple-600">
                          ۱۶۰,۰۰۰ تومان
                        </p>
                      </div>
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                        <span className="text-purple-600 dark:text-purple-400 text-xl">
                          📊
                        </span>
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
                        <h3 className="text-gray-500 text-sm">مشتریان جدید</h3>
                        <p className="text-2xl font-bold text-orange-600">
                          ۲۴ مشتری
                        </p>
                      </div>
                      <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                        <span className="text-orange-600 dark:text-orange-400 text-xl">
                          👥
                        </span>
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
            </TabPanel>

            {/* Tab 2: Users */}
            <TabPanel
              header={
                <span>
                  <i className="pi pi-users p-mr-2" />
                  کاربران <Badge value="4" severity="info" className="p-ml-2" />
                </span>
              }
            >
              <DataTable
                value={users}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: "50rem" }}
                className="p-datatable-sm"
                header={headerUser}
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
                  // body={actionsBodyTemplate}
                  header="عملیات"
                  style={{ width: "15%" }}
                ></Column>
              </DataTable>
            </TabPanel>

            {/* Tab 3: Comments */}
            <TabPanel
              header={
                <span>
                  <i className="pi pi-comments p-mr-2" />
                  نظرات{" "}
                  <Badge value="4" severity="warning" className="p-ml-2" />
                </span>
              }
            >
              <DataTable
                style={{
                  "--p-datatable-cell-padding": "0",
                  "--p-datatable-header-cell-padding": "0.5rem",
                }}
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
                className="p-datatable-sm table-no-padding custom-datatable"
              >
                <Column
                  header="#"
                  body={(data, options) => options.rowIndex + 1}
                  style={{ minWidth: "3rem", textAlign: "center" }}
                />
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
                  body={(rowData) => {
                    const maxLength = 50;
                    const text = rowData.text;
                    const truncatedText =
                      text.length > maxLength
                        ? text.substring(0, maxLength) + "..."
                        : text;

                    return (
                      <div
                        title={rowData.text}
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {truncatedText}
                      </div>
                    );
                  }}
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
            </TabPanel>

            {/* Tab 4: Settings */}
            <TabPanel
              header={
                <span>
                  <i className="pi pi-cog p-mr-2" />
                  نمودار ها
                </span>
              }
            >
              {/* نمودار فروش محصولات */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#38b000]">
                    آمار فروش محصولات
                  </h2>
                  <Select
                    value={selectedTimePeriod}
                    onValueChange={setSelectedTimePeriod}
                  >
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
              {/* Add SimpleLineChart */}
              <div className="mb-8 h-[400px] bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  نمودار فروش
                </h2>
                {/* <ResponsiveContainer width="100%" height="100%">
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
                    <Line
                      type="monotone"
                      dataKey="product1"
                      stroke="#8884d8"
                      name="برنج هاشمی"
                    />
                    <Line
                      type="monotone"
                      dataKey="product2"
                      stroke="#82ca9d"
                      name="برنج صدری"
                    />
                    <Line
                      type="monotone"
                      dataKey="product3"
                      stroke="#fb8500"
                      name="برنج دودی"
                    />
                    <Line
                      type="monotone"
                      dataKey="product4"
                      stroke="#8ecae6"
                      name="برنج دم سیاه"
                    />
                    <Line
                      type="monotone"
                      dataKey="product5"
                      stroke="#ff8fab"
                      name="زیتون ماری"
                    />
                    <Line
                      type="monotone"
                      dataKey="product6"
                      stroke="#ffd60a"
                      name="زیتون شکسته"
                    />
                    <Line
                      type="monotone"
                      dataKey="product7"
                      stroke="#adc178"
                      name="زیتون کنسروی"
                    />
                    <Line
                      type="monotone"
                      dataKey="product8"
                      stroke="#f00"
                      name="رشته خشکار"
                    />
                    <Line
                      type="monotone"
                      dataKey="product9"
                      stroke="#4CAF50"
                      name="چای کرک"
                    />
                  </LineChart>
                </ResponsiveContainer> */}
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
            </TabPanel>
            {/* Tab 5: Settings */}
            <TabPanel
              header={
                <span>
                  <i className="pi pi-cog p-mr-2" />
                  محصولات
                </span>
              }
            >
              <DataTable
                style={{
                  "--p-datatable-cell-padding": "0",
                  "--p-datatable-header-cell-padding": "0.5rem",
                }}
                value={products}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: "50rem" }}
                loading={loading}
                filters={filters}
                globalFilterFields={["username", "productTitle", "text"]}
                header={headerProduct}
                emptyMessage="هیچ نظری یافت نشد."
                className="p-datatable-sm table-no-padding custom-datatable"
              >
                <Column
                  header="#"
                  body={(data, options) => options.rowIndex + 1}
                  style={{ minWidth: "3rem", textAlign: "center" }}
                />

                <Column
                  field="title"
                  header="نام محصول"
                  sortable
                  filter
                  filterPlaceholder="جستجو بر اساس نام محصول"
                  style={{ minWidth: "14rem" }}
                />

                <Column
                  field="inventory"
                  header="موجودی"
                  sortable
                  // body={dateBodyTemplate}
                  style={{ minWidth: "10rem" }}
                />

                <Column
                  field="category"
                  header="دسته بندی"
                  sortable
                  // body={dateBodyTemplate}
                  style={{ minWidth: "10rem" }}
                />
                <Column
                  body={commentActionsBodyTemplate}
                  header="عملیات"
                  style={{ minWidth: "8rem" }}
                  className="text-center"
                />
              </DataTable>
            </TabPanel>

            {/* Tab 5: Settings */}
            <TabPanel
              header={
                <span>
                  <i className="pi pi-cog p-mr-2" />
                  مقالات
                </span>
              }
            ></TabPanel>
            {/* Tab 6: Settings */}
            <TabPanel
              header={
                <span>
                  <i className="pi pi-cog p-mr-2" />
                  پیام ها
                </span>
              }
            ></TabPanel>
          </TabView>
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
              <Button onClick={() => setVisible(false)}>افزودن</Button>
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
                      setSelectedUser({
                        ...selectedUser,
                        username: e.target.value,
                      })
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
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
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
                      setSelectedUser({
                        ...selectedUser,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditDialogVisible(false)}
              >
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
                      setSelectedUser({
                        ...selectedUser,
                        username: e.target.value,
                      })
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
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
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
                      setSelectedUser({
                        ...selectedUser,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setViewDialogVisible(false)}
              >
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
        <Dialog
          open={deleteDialogVisible}
          onOpenChange={setDeleteDialogVisible}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تایید حذف</DialogTitle>
              <DialogDescription>
                آیا از حذف کاربر {selectedUser?.username} اطمینان دارید؟
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogVisible(false)}
              >
                خیر
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                بله، حذف کن
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Role Change Dialog */}
        <Dialog
          open={roleChangeDialogVisible}
          onOpenChange={setRoleChangeDialogVisible}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تغییر نقش کاربر</DialogTitle>
              <DialogDescription>
                آیا از تغییر نقش کاربر <strong>{selectedUser?.username}</strong>{" "}
                از <strong>{selectedUser?.role}</strong> به{" "}
                <strong>
                  {selectedUser?.role === "admin" ? "کاربر عادی" : "مدیر"}
                </strong>{" "}
                اطمینان دارید؟
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRoleChangeDialogVisible(false)}
              >
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
        <Dialog
          open={deleteCommentDialogVisible}
          onOpenChange={setDeleteCommentDialogVisible}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تایید حذف</DialogTitle>
              <DialogDescription>
                آیا از حذف این نظر اطمینان دارید؟
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteCommentDialogVisible(false)}
              >
                خیر
              </Button>
              <Button variant="destructive" onClick={handleDeleteComment}>
                بله، حذف کن
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
