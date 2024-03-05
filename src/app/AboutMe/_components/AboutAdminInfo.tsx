import React from "react";
import { INDIGO, INFO } from "@/lib/constants";
import { auth } from "@/lib/auth";
import LabelText from "./LabelText";
import ChangePasswordDialog from "./ChangePasswordDialog";

async function AboutAdminInfo() {
  return (
    <div className="w-3/4 flex flex-col gap-3 items-center">
      <p className="text-2xl" style={{color: INDIGO}}>個人資料</p>
    </div>
  );
}

export default AboutAdminInfo;
