"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
const RegisterPage = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mobile, setMobile] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username ,mobile, email , pass , selectedProvince , selectedCity }),
    });

    console.log('res ==>' , res)
    

    if (res.ok) {
      // توکن ساخته شد و در کوکی ذخیره شد
      router.push("/"); // هدایت به صفحه خانه
    } else {
      alert("خطا در ورود");
    }
  };

  // گرفتن لیست استان‌ها (یک بار اول برنامه)
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await fetch('https://iranplacesapi.liara.run/api/provinces');
        const data = await res.json();
        // اگه دیتا داخل خاصیت data بود: setProvinces(data.data)
        setProvinces(data);
      } catch (error) {
        console.error('خطا در گرفتن استان‌ها:', error);
      }
    };
    fetchProvinces();
  }, []);


  // هر وقت استان عوض شد، شهرهای مربوط به اون استان رو بگیر
  useEffect(() => {
    if (!selectedProvince) {
      setCities([]);
      setSelectedCity('');
      return;
    }

    const fetchCities = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://iranplacesapi.liara.run/api/provinces/name/${selectedProvince}/cities`);
        const data = await res.json();
        console.log({data})
        setCities(data);
      } catch (error) {
        console.error('خطا در گرفتن شهرها:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, [selectedProvince]);

  return (
    <div className={`bg-reg h-screen flex justify-center items-center`}>
      <div className="bg-[#ffffff77] w-1/3 p-8 rounded-2xl">
        

        <form role="form" onSubmit={handleSubmit}>
      <h1 className="font-bold text-xl text-[#3a5a40]">ثبت نام کاربری</h1>

      {/* فیلدهای قبلی */}
      <div className="inputBox my-4">
        <input
          type="text"
          required
          value={username}
          placeholder="نام کاربری"
          className="w-full rounded py-2 px-4 bg-[#ffffff96]"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="inputBox my-4">
        <input
          type="text"
          required
          value={mobile}
          placeholder="موبایل"
          className="w-full rounded py-2 px-4 bg-[#ffffff96]"
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <div className="inputBox my-4">
        <input
          type="email"
          required
          value={email}
          placeholder="ایمیل"
          className="w-full rounded py-2 px-4 bg-[#ffffff96]"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="inputBox my-4">
        <input
          type="password"
          required
          value={pass}
          placeholder="رمز عبور"
          className="w-full rounded py-2 px-4 bg-[#ffffff96]"
          onChange={(e) => setPass(e.target.value)}
        />
      </div>

      {/* سلکت باکس استان */}
      <div className="my-4">
        <select
  value={selectedProvince}
  onChange={(e) => setSelectedProvince(e.target.value)}
  required
  className="w-full rounded py-2 px-4 bg-[#ffffff96]"
>
  <option value="" disabled>استان خود را انتخاب کنید</option>
  {provinces.map((province) => (
    <option key={province.id} value={province.name}>  {/* اینجا به جای id از name استفاده شد */}
      {province.name}
    </option>
  ))}
</select>
      </div>

      {/* سلکت باکس شهر */}
      <div className="my-4">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          required
          disabled={!selectedProvince}
          className="w-full rounded py-2 px-4 bg-[#ffffff96]"
        >
          <option value="" disabled>
            {loading ? 'در حال بارگذاری...' : 'شهر خود را انتخاب کنید'}
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center mb-4">
        <Link href="/login" className="font-bold text-[#132a13]">
          حساب کاربری دارید؟ اینجا کلیک کنید
        </Link>
      </div>

      <input
        type="submit"
        className="bg-[#132a13] cursor-pointer text-white font-bold w-full rounded py-2"
        value="ثبت نام"
      />
    </form>
 
      </div>
    </div>
  );
};

export default RegisterPage;
