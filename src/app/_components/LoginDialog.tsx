"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image"
// import Resizer from "react-image-file-resizer";
import { publicEnv } from "@/lib/env/public";
import AuthInput from "./AuthInput";
import { MdLogin } from "react-icons/md";
import { INDIGO, ORANGE } from "@/lib/constants";
import ForgotEmailDialog from "./ForgotEmailDialog";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

function LoginDialog() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] =useState<string>("");
  const [phoneNumber,setPhoneNumber] =useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      username,
      password,
      mobile:phoneNumber,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/AboutMe`,
    });
  };

  return(
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-white rounded-sm hover:opacity-80 px-2 font-semibold"><MdLogin size={20} /><div>登入</div></button>
      </DialogTrigger>
      <DialogContent>
        {/* <DialogHeader>
          <DialogTitle className="text-center">登入</DialogTitle>
        </DialogHeader> */}
        <div className="pt-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <AuthInput
              label="帳號"
              type="email"
              value={email}
              placeholder="電子郵件"
              setValue={setEmail}
            />
            <AuthInput
              label="密碼"
              type="password"
              value={password}
              placeholder="預設為手機號碼"
              setValue={setPassword}
            />
            <span className="flex text-xs self-center py-1">
              忘記&nbsp;
              <ForgotEmailDialog />
              /
              <ForgotPasswordDialog />
            </span>
            <div className="pt-2"></div>
            <Button type="submit" className="w-full rounded-full font-semibold text-base" style={{backgroundColor: INDIGO}}>
              登入
            </Button>
          </form>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;