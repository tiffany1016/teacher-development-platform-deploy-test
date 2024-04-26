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
import { INDIGO, ORANGE, /*USERS*/ } from "@/lib/constants";
import useUsers from "@/app/hooks/useUsers";
function ForgotEmailDialog() {
  const [userMobile, setUserMobile] = useState<string>("");
  const [hint, setHint] = useState<string>("");
  const {getUser}=useUsers();
  const handleSubmit = async() => {
    // const userIndex = USERS.findIndex(({ mobile }) => mobile === userMobile);
    const user=await getUser({
      mobile:userMobile,
    });
    const existedUser = user!==null;
    if (!user) {
      setHint("手機號碼錯誤");
      console.log("invalid phone number");
      return;
    }
    console.log(user);
    const email = user.email;
    
    const accountLength = email.split("@")[0].length;
    setHint("您的帳號為 "+email.substring(0,1)+"*".repeat(accountLength-3)+email.substring(accountLength-2));
  };

  return(
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:underline" style={{color: ORANGE}}>
          帳號
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">忘記帳號</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-3">
          <div>
            <Label className="font-semibold">手機號碼</Label>
            <div className="flex gap-2">
              <AuthInput
                label=""
                type="text"
                value={userMobile}
                placeholder="09xxxxxxxx"
                setValue={setUserMobile}
              />
              <Button onClick={() => {handleSubmit()}} className="rounded-full font-semibold text-sm" style={{backgroundColor: INDIGO}}>
                確認
              </Button>
            </div>
          </div>
          <div className="text-xs self-center">{hint}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotEmailDialog;