"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/userinfo", { credentials: "include" });
        if (!res.ok) {
          router.replace("/login"); // اگر لاگین نیست به صفحه ورود بفرست
          return;
        }
        const data = await res.json();
        console.log({data})
        if (data.role !== "admin") {
          router.replace("/"); // اگر مدیر نیست به صفحه اصلی بفرست
          return;
        }
        setUserRole(data.role);
        setLoading(false);
      } catch (error) {
        router.replace("/login");
      }
    }

    checkUser();
  }, [router]);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      <h1>داشبورد مدیر</h1>
      <p>خوش آمدید مدیر عزیز!</p>
      {/* محتوای مخصوص مدیران */}
    </div>
  );
}
