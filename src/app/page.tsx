import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { verifyJwt } from "@/../lib/auth";

export default async function Home() {

  

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const isVerify = await verifyJwt(token);

    console.log('token =>' , token)

    if (!isVerify) {
      redirect("login");
    }
  } catch (error) {
    redirect('/login')
    
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      سلام اینجا خانه است
    </div>
  );
}
