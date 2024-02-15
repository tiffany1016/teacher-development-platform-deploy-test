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
import { Label } from "@/components/ui/label";

function LoginDialog() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/`,
    });
  };

  return(
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-white rounded-sm hover:opacity-80 py-1 px-2 font-semibold"><MdLogin size={20} /><div>登入</div></button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>登入</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          <AuthInput
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <div className="pt-1"></div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;