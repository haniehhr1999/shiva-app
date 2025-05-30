import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import Providers from "@/components/Providers";


import 'primereact/resources/themes/lara-light-blue/theme.css'; // تم دلخواهت
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shiva App",
  description: "Created by Shiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300 dark:bg-gray-900 dark:text-white`}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
