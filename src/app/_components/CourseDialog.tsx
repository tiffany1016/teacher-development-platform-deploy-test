import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { INDIGO } from "@/lib/constants";
type CourseDialogProps={
  open:boolean,
  onClose:()=>void,
  courseInfo:{name:string,series:string,teacher:string,type:string,topic:string,time:Date},
}
export default function CourseDialog({open,onClose,courseInfo}:CourseDialogProps) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>onClose()} className='mb-1 mr-1'>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}