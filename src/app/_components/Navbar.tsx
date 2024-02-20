import { auth } from "@/lib/auth";
import React from "react";
import Link from "next/link";
import Image from "next/image"
// import { auth } from "@/lib/auth";
import { INDIGO } from "@/lib/constants";
import LoginDialog from "./LoginDialog";
import UserAvatar from "./UserAvatar";
import { NavbarMenu } from "./NavbarMenu";

async function Navbar() {
  const session = await auth();
  const notAuth = (!session || !session?.user?.email);
  return (
    <nav style={{ backgroundColor: INDIGO }} className="flex justify-between items-center w-full max-w-8xl px-10 py-3 border-b-2 border-gray-100d">
      <div className="flex gap-3">
        <button className="flex gap-2.5">
          <Link href={`/`} className="flex gap-2">
            <Image
              width={30}
              height={30}
              alt="KIST"
              src="/logo.png"
            />
            <div className="text-white hover:opacity-80 text-lg font-semibold">
              教師發展平台
            </div>
          </Link>
        </button>
      </div>
      <div className="flex items-center justify-self-end text-white">
        { notAuth ?
          <LoginDialog /> :
          <NavbarMenu userEmail={session?.user?.email || ""} username={session?.user?.username || ""} />
          // <div className="flex">
          //   <UserAvatar userEmail={session?.user?.email || ""} />
          //   <Link href={`/auth/signout`}>
          //     <button
          //       type={"submit"}
          //       className="flex items-center gap-1.5 rounded-sm hover:opacity-80 py-1 px-2 font-semibold"
          //     >
          //       {session?.user?.username} 登出
          //     </button>
          //   </Link>
          // </div>
        }
      </div>
    </nav>
  );
}

export default Navbar;
