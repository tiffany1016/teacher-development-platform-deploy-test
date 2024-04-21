"use client";
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Cell, updateCell } from "./utils";
import { BasicButton } from "@/app/_components/BasicButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Trash } from "react-flaticons";

type Props = {
  data: Cell[][];
  cell: Cell,
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<Cell[][]>>;
};

function EditCellDialog({data,cell,open,setOpen,setData}:Props) {
  const textareaType = ["段落標題","文字","自由填答","勾選題"];

  const handleOptionUpdate = (i:number,newOption:string,cmd:string) => { // cmd: new|update|delete
    const content = JSON.parse(cell.content);
    const newContent:string[] = (cmd === "new") ? [...content,newOption] : //add new option
      ((cmd === "delete") ? [...content.slice(0,i),...content.slice(i+1)] :   // delete option[i]
        [...content.slice(0,i),newOption,...content.slice(i+1)]);  // update option[i] to newOption
    console.log(newContent);
    setData(updateCell(data,cell.id,{
      ...cell,
      content: JSON.stringify(newContent)
    }));
  }
  const handleTextarea = (newContent:string) => {
    setData(updateCell(data,cell.id,{
      ...cell,
      content: newContent
    }));
  }

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">編輯儲存格</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-3">
          <div className="text-sm font-semibold">儲存格類型：{cell && cell.type}</div>
          {textareaType.includes(cell.type) && <Textarea
            placeholder={"請輸入"+(cell.type==="文字"?"該儲存格":(cell.type==="自由填答"?"題示":cell?.type))+"文字"}
            className="resize-none"
            onChange={(e)=>handleTextarea(e.target.value)}
            value={cell.content}
          />}
          {!textareaType.includes(cell.type) && <div className="flex-col flex gap-3">
            <div className="gap-1 flex-col flex overflow-auto overflow-y-auto max-h-52">
              {JSON.parse(cell.content).map((option:string,i:number)=>(
                <div className="flex gap-2 items-center">
                  <div className="text-nowrap" style={{fontSize:12}}>{"選項"+(i+1)}</div>
                  <Input  type="text" placeholder="值" className="" value={option} onChange={(e)=>handleOptionUpdate(i,e.target.value,"update")}/>
                  <div className="cursor-pointer hover:bg-neutral-200 p-1 rounded" onClick={()=>handleOptionUpdate(i,"","delete")}><Trash size={15} /></div>
                </div>
              ))}
            </div>
            <BasicButton text="新增選項" onClick={()=>handleOptionUpdate(0,"","new")} />
          </div>}
        </div>
        <DialogFooter className="items-center">
          <BasicButton width="60px" text="完成" dark={true} onClick={()=>setOpen(false)} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCellDialog;