"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OTPInput from "react-otp-input";
import { MdArrowBack } from "react-icons/md";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Add this import
import { LogIn } from "lucide-react"; // Add this import

// import {validateIranMobileNumber} from "../../../lib/checkPhoneNumber"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showSquers, setShowSquers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("mobile");

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
        body: JSON.stringify({ mobile, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطا در ورود به سیستم");
      }

      // Successful login
      router.push("/");
      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // تابع اصلی که هنگام کلیک روی دکمه "ارسال کد" اجرا می‌شود
  const sendOTP = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/sms/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });

    if (response.ok) {
      setStep("otp");
      alert("کد تایید ارسال شد");
      setShowSquers(true);
    }
  };

  const verifyOTP = async () => {
    // ارسال کد برای تایید
    const response = await fetch("/api/sms/verify-sms", {
      method: "POST",
      body: JSON.stringify({ mobile, otp }),
    });
    // ... مدیریت پاسخ
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: 'url(/images/bg-login.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay روشن‌تر برای نمایش بهتر عکس */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/30"></div>
      
      <Card className="w-full max-w-md border-0 shadow-2xl relative z-10 bg-background/90 backdrop-blur-md">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center justify-center mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <LogIn className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            ورود به حساب کاربری
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                  className="text-amber-600 flex items-center cursor-pointer"
                  onClick={() => setShowOtp(false)}
                >
                  <MdArrowBack size={20} />
                  بازگشت
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

                {step === "mobile" ? (
                  <button
                    onClick={sendOTP}
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    ارسال کد
                  </button>
                ) : (
                  <button
                    onClick={verifyOTP}
                    type="button"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    تایید
                  </button>
                )}

                {showSquers && (
                  <div dir="ltr" className="flex justify-center">
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      inputType="tel"
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
                  type="button"
                  onClick={() => setShowOtp(true)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ورود با کد یکبار مصرف
                </button>
              </div>
            )}

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                حساب کاربری ندارید؟{" "}
              </span>
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                ثبت نام کنید
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}