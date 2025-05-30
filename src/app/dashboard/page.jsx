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
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';



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
  const [newUsername, setNewUsername] = useState('')
  const [newUseremail, setNewUseremail] = useState('')
  const [newUserpass, setNewUserpass] = useState('')
  const [selectedDuration, setSelectedDuration] = useState(null);
  const durations = [
    { name: "روزانه", code: "day" },
    { name: "هفتگی", code: "weekly" },
    { name: "ماهانه", code: "monthly" },
    { name: "سالانه", code: "LDN" },
  ];


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

  // دریافت لیست کاربران
  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        console.log('data------', data)
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const roleBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.role}
        severity={rowData.role === "admin" ? "danger" : "success"}
        className="text-center"
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
    return (
      <div className="flex gap-2 justify-content-center">
        <FaEye
          className="cursor-pointer text-blue-600 text-xl"
          onClick={() => {
            setSelectedUser(rowData);
            setViewDialogVisible(true);
          }}
        />
        <FaTrash
          className="cursor-pointer text-red-600 text-xl"
          onClick={() => {
            setSelectedUser(rowData);
            setDeleteDialogVisible(true);
          }}
        />
        <FaUser
          className="cursor-pointer text-blue-600 text-xl"
          onClick={() => handleRoleChange(rowData)}
        />
        <MdModeEdit
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
  const [position, setPosition] = useState('center');
  const footerContent = (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
    </div>
  );

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };


  // 1️⃣ تمام خریدها رو به یک آرایه‌ی واحد جمع می‌کنیم
  const allPurchases = users.flatMap(user => user.purchases);

  // 2️⃣ گروه‌بندی بر اساس purchaseDate
  const groupedByDate = {};

  allPurchases.forEach(purchase => {
    const date = purchase.purchaseDate;
    const productKey = `product${purchase.productId}`;

    // اگر برای تاریخ فعلی آبجکت وجود نداشت، بساز
    if (!groupedByDate[date]) {
      groupedByDate[date] = { date };
    }

    // مقدار قبلی یا ۰
    groupedByDate[date][productKey] = (groupedByDate[date][productKey] || 0) + purchase.quantity;
  });

  // 3️⃣ تبدیل به آرایه
  const result = Object.values(groupedByDate);

  // نمایش نتیجه
  console.log(result);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">داشبورد مدیر</h1>

      {/* Add SimpleLineChart */}
      <div className="mb-8 h-[400px] bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">نمودار فروش</h2>
        {/* <SimpleLineChart /> */}
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
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="product1" stroke="#8884d8" />
          <Line type="monotone" dataKey="product2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="product3" stroke="#fb8500" />
          <Line type="monotone" dataKey="product4" stroke="#8ecae6" />
          <Line type="monotone" dataKey="product5" stroke="#ff8fab" />
          <Line type="monotone" dataKey="product6" stroke="#ffd60a" />
          <Line type="monotone" dataKey="product7" stroke="#adc178" />
          <Line type="monotone" dataKey="product8" stroke="#f00" />
        </LineChart>
      </ResponsiveContainer>
      </div>


      {/* <Button label="افزودن کاربر" icon="pi pi-check" iconPos="right" /> */}
      <Button label="افزودن کاربر" icon="pi pi-arrow-down" onClick={() => show('top')} className="p-button-warning" style={{ minWidth: '10rem' }} />


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

      {/* add user Dialog */}
      <Dialog header="افزودن کاربر" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent} draggable={false} resizable={false}>
        <div className="field bg-red-200">
          <div>

            <label htmlFor="username">نام کاربری</label>
            <InputText
              id="username"
              className="w-full"
              value={newUsername}
              onChange={(e) =>
                setNewUsername(e.target.value)
              }
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
              onChange={(e) =>
                setNewUseremail(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label htmlFor="password">رمز عبور</label>
            <InputText
              id="password"
              className="w-full"
              value={newUserpass}
              onChange={(e) =>
                setNewUserpass(e.target.value)
              }
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
    </div>
  );
}
