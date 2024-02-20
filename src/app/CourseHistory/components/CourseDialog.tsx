"use client";
import { useState } from "react";
import {Button} from "@/components/ui/button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { INDIGO } from "@/lib/constants";
type CourseDialogProps={
  color:string,
  courseInfo:{name:string,series:string,teacher:string,type:string,topic:string,time:Date},
}
export default function CourseDialog({courseInfo,color}:CourseDialogProps) {
  const [open,setOpen]=useState(false);
  const handleClick=()=>{
    setOpen(true);
  }
  return (
    <>
      <Button style={{backgroundColor:color}} onClick={handleClick}>
        {courseInfo.name}
      </Button>
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        fullWidth={true}
        maxWidth="md"
        PaperProps={{
          style:{
            borderColor:INDIGO,
            borderWidth:4,
            borderRadius:30,
          }
        }}
      >
        <DialogTitle>
          <p className='text-xl text-black font-bold'>課程詳細資訊</p>
          <p>{courseInfo.name}</p>
        </DialogTitle>
        <DialogContent>
          <div className='grid grid-flow-row grid-cols-2 gap-2'>
            <div className='flex'>
              <p className='text-black font-semibold mr-1'>{"課程名稱 : "}</p>
              <p>{courseInfo.name}</p>
            </div>
            <div className='flex'>
              <p className='text-black font-semibold mr-1'>{"活動系列 : "}</p>
              <p>{courseInfo.series}</p>
            </div>
            <div className='flex'>
              <p className='text-black font-semibold mr-1'>{"授課講師 : "}</p>
              <p>{courseInfo.teacher}</p>
            </div>
            <div className='flex'>
              <p className='text-black font-semibold mr-1'>{"課程類別 : "}</p>
              <p>{courseInfo.type+"-"+courseInfo.topic}</p>
            </div>
            <div className='flex'>
              <p className='text-black font-semibold mr-1'>{"課程時間 : "}</p>
              <p>{courseInfo.time.toDateString()}</p>
            </div>
          </div>
          <div className='w-2/3 mt-3 grid justify-items-end'>
            <Button style={{backgroundColor:INDIGO}} className="rounded-full text-white h-3/4">
              {"查看詳細修課報告"}
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{backgroundColor:INDIGO}} onClick={()=>setOpen(false)} className='mb-1 mr-1'>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}