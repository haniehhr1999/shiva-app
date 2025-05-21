"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
const RegisterPage = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username , email , pass }),
    });

    

    if (res.ok) {
      // توکن ساخته شد و در کوکی ذخیره شد
      router.push("/"); // هدایت به صفحه خانه
    } else {
      alert("خطا در ورود");
    }
  };

  return (
    <div className={`bg-reg h-screen flex justify-center items-center`}>
      <div className="bg-[#ffffff77] w-1/3 p-8 rounded-2xl">
        

        <form role="form" onSubmit={handleSubmit}>
          <h1 className="font-bold text-xl text-[#3a5a40]">ثبت نام کاربری</h1>
          
          <div className="inputBox my-4">
            <input
              type="text"
              autoComplete="off"
              required
              value={username}
              placeholder="نام کاربری   "
              className="w-full rounded py-2 px-4 bg-[#ffffff96]"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="inputBox my-4">
            <input
              type="text"
              autoComplete="off"
              required
              value={email}
              placeholder="ایمیل خود را وارد کنید"
              className="w-full rounded py-2 px-4 bg-[#ffffff96]"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="inputBox my-4">
            <input
              type="text"
              autoComplete="off"
              required
              value={pass}
              placeholder="رمز عبور خود را وارد کنید"
              className="w-full rounded py-2 px-4 bg-[#ffffff96]"
              onChange={(event) => setPass(event.target.value)}
            />
          </div>

          <div className="text-center mb-4">
            <Link href="/login" className="text-center font-bold text-[#132a13]">
            حساب کاربری دارید؟ اینجا کلیک کنید
            </Link>
          </div>
          
          <input
            type="submit"
            className="register-btn bg-[#132a13] cursor-pointer text-white font-bold w-full rounded py-2"
            value="ثبت نام"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
