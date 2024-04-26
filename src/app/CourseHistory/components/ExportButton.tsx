"use client";
import {Button} from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import useUsers from "@/app/hooks/useUsers";
export default function CourseDialog() {
  const router=useRouter();
  const {postUser}=useUsers();
  const handleClick=async()=>{
    console.log("redirect");
    // await postUser({
    //   username:"111",
    //   email:"one@gmail.com",
    //   phoneNumber:"091111111",
    //   hashedPassword:"1234",
    // });
    router.push("/CourseHistory/ExportHistory");
  }
  return (
    <>
      <Button
        className="justify-self-center w-36 mt-4 bg-[#013E6E] text-white text-lg rounded-full hover:bg-slate-400 hover:text-black"
        onClick={handleClick}
      >
        匯出修課紀錄
      </Button>
    </>
  );
}