import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import Providers from "@/components/Providers";

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css'; 
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shiva App",
  description: "Created by Shiva",
};

// read user data from cookie 
async function getUserFromCookie() {
  console.log('getUserFromCookie()')

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) return null;
  
  try {
    // ✅ اینجا توکن رو توی سرور verify میکنیم
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
}

export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // ✅ اطلاعات کاربر توی سرور خونده میشه
  const user = await getUserFromCookie();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
        <Providers>
          <Layout initialUser={user}>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
