"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
// import bg from "../../../public/images/bg-login.jpg"

const LoginPage = () => {

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
    <div className={`bg-log h-screen flex justify-center items-center`}>
      <div className="bg-[#ffffff63] w-1/3 p-8 rounded-2xl">
        {/* <form role="form" method="post">
          {isCodeSent ? (
            <>
              <div className="inputBox">
                <input
                  type="text"
                  autoComplete="off"
                  required
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />
                <label>Code</label>
              </div>

              <input
                type="submit"
                className="register-btn"
                onClick={verifyCode}
                value="Verify Code"
              />
            </>
          ) : (
            <>
              <div className="inputBox my-4">
                <input
                  type="text"
                  autoComplete="off"
                  required
                  value={phone}
                  placeholder="موبایل خود را وارد کنید"
                  className="w-full rounded py-2 px-4 bg-[#ffffff96]"
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
              <input
                type="submit"
                className="register-btn bg-[#ff7b00] text-white font-bold w-full rounded py-2"
                value="ارسال کد"
                onClick={sendCode}
              />
            </>
          )}
        </form> */}

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
          <input
            type="submit"
            className="register-btn bg-[#ff7b00] cursor-pointer text-white font-bold w-full rounded py-2"
            value="ثبت نام"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
