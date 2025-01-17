import RegisterPage from "@/components/RegisterPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  
  return (
    <>
    <div className="border border-gray-100 justify-center text-center">
      <RegisterPage />
    </div>
    </>
  );
}
