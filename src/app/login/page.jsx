"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OTPInput from "react-otp-input";
import { MdArrowBack } from "react-icons/md";

import {validateIranMobileNumber} from "../../../lib/checkPhoneNumber"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showSquers, setShowSquers] = useState(false);
  const [loading, setLoading] = useState(false);
  // setShowSquers
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطا در ورود به سیستم");
      }

      // Successful login
      router.push("/"); // Redirect to home page
      router.refresh(); // Refresh the page to update the navbar
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // تابع اصلی که هنگام کلیک روی دکمه "ارسال کد" اجرا می‌شود
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      setShowSquers(true);

      validateIranMobileNumber(mobile)

      
    } catch (err) {
      console.error("Error in form submission:", err);
      setError("خطایی رخ داده است. لطفا مجددا تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-log flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            ورود به حساب کاربری
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!showOtp && (
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="mobile1" className="sr-only">
                  موبایل
                </label>
                <input
                  id="mobile1"
                  name="mobile1"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="موبایل "
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  رمز عبور
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          {showOtp && (
            <>
              <div
                role="button"
                className="text-amber-600 flex items-center"
                onClick={() => setShowOtp(false)}
              >
                بازگشت
                <button>
                  <MdArrowBack size={20} />
                </button>
              </div>
              <div>
                <label htmlFor="mobile" className="sr-only">
                  موبایل
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="موبایل خود را وارد کنید"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <button
                onClick={handleSubmit2}
                //
                role="button"
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ارسال کد
              </button>
              {showSquers && (
                <div dir="ltr" className="flex justify-center">
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4} // تعداد جعبه‌های ورودی = 4 رقم
                    inputType="tel" // فقط عدد و جلوگیری از دکمه‌های اسپینر
                    renderInput={(props) => <input {...props} />}
                    containerStyle="your-container-style"
                    inputStyle={{
                      direction: "ltr",
                      width: "40px",
                      height: "50px",
                      margin: "0 8px",
                      fontSize: "20px",
                      textAlign: "center",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              )}
            </>
          )}

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {!showOtp && (
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "در حال ورود..." : "ورود"}
              </button>
            </div>
          )}

          {!showOtp && (
            <div className="text-sm text-center">
              <button
                onClick={() => setShowOtp(true)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ورود با کد یکبار مصرف
              </button>
            </div>
          )}

          <div className="text-sm text-center">
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              حساب کاربری ندارید؟ ثبت نام کنید
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
