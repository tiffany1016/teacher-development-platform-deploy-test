"use client";
import Image from "next/image";
import { CircleUserRound } from 'lucide-react';
type HeaderProps = {
  username:string,
};


// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Header({
  username,
}: HeaderProps) {
  return(
    <>
      <div className="flex bg-[#013E6E] w-full h-16 top-0 items-center">
        <div className="flex flex-row h-full items-center gap-2 w-1/4">
          <div className="relative h-8 w-8 ml-10">
            <Image
              src="/kistLogo.png"
              alt="Logo"
              className=""
              fill={true}
            />
          </div>
          <p className="text-xl text-white">教師發展平台</p>
        </div>
        <div className="flex w-full mr-4 h-full justify-end items-center gap-2">
          <p className="text-xl text-white">{username}</p>
          <div className="">
            <CircleUserRound size={32} color="white"/>
          </div>
        </div>
      </div>
    </>
  );
}