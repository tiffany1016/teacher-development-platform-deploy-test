import React from "react";
import Link from "next/link";
import Image from "next/image"
// import { auth } from "@/lib/auth";
import { INDIGO } from "@/lib/constants";

async function Navbar() {
  const notAuth = true;
  return (
    <nav style={{zIndex: 10000, backgroundColor: INDIGO }} className="flex justify-between items-center w-full max-w-8xl px-10 py-3 border-b-2 border-gray-100 dark:border-gray-700 dark:text-gray-200">
      <div className="flex gap-3">
        <button className="flex gap-2.5">
          <Link href={`/`} className="flex gap-2">
            <Image
              width={30}
              height={30}
              alt="KIST"
              src="/logo.png"
            />
            <div className="text-white text-lg font-semibold pt-1">
              教師發展平台
            </div>
          </Link>
        </button>
      </div>
      
      <div className="flex items-center justify-self-end">
        
        <span className="mx-2.5">|</span>
        {/* { notAuth ?
          <LoginDialog /> :
          <div className="flex">
            <UserAvatar userEmail={session?.user?.email || ""} />
            <Link href={`/auth/signout`}>
              <button
                type={"submit"}
                className="flex items-center gap-1.5 text-gray-900 rounded-sm hover:bg-slate-100 py-1 px-2 text-sm font-semibold"
              >
                Sign Out
              </button>
            </Link>
          </div>
        } */}
      </div>
    </nav>
  );
}

export default Navbar;