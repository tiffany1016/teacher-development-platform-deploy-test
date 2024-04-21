"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label"
// import Resizer from "react-image-file-resizer";
// import AuthInput from "./AuthInput";
import { INDIGO, ORANGE, USERS } from "@/lib/constants";
import { Cell } from "./utils";
import { BasicButton } from "@/app/_components/BasicButton";

type Props = {
  cell: Cell|undefined,
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditCellDialog({cell,open,setOpen}:Props) {
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">編輯儲存格</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-3">
          <div>
            <>儲存格類型：{cell && cell.type}</>
            {/* <Label className="font-semibold">手機號碼</Label>
            <div className="flex gap-2">
              
            </div> */}
          </div>
        </div>
      <DialogFooter className="items-center">
        <BasicButton text="完成" dark={true} onClick={()=>setOpen(false)} />
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCellDialog;