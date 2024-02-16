"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import Resizer from "react-image-file-resizer";
import { publicEnv } from "@/lib/env/public";
import AuthInput from "./AuthInput";
import { MdLogin } from "react-icons/md";
import { INDIGO, ORANGE, USERS } from "@/lib/constants";

function ForgotPasswordDialog() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [hint, setHint] = useState<string>("");

  const handleSubmit = () => {
    setHint("已發送驗證碼至信箱");
  };

  return(
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:underline" style={{color: ORANGE}}>
          密碼
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">忘記密碼</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-3">
          <div className="flex flex-col gap-2">
            <div>
              <Label className="font-semibold">帳號</Label>
              <AuthInput
                label=""
                type="text"
                value={userEmail}
                placeholder="電子郵件"
                setValue={setUserEmail}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Button onClick={() => {handleSubmit()}} className="rounded-full font-semibold text-sm w-fit" style={{backgroundColor: INDIGO}}>
                取得驗證碼
              </Button>
              <div className="text-xs">{hint}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPasswordDialog;