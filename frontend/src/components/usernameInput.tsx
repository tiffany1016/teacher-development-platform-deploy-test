import TextField from '@mui/material/TextField'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useRef } from 'react';

export default function UsernameInput() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const handleUsername = async () => {
    if (!usernameRef.current) return;
    const newUsername = usernameRef.current.value;
    console.log(newUsername);
  };

  return (
    <div className='flex items-center justify-center'>
        <TextField id="standard-basic" label="Username" variant="standard" inputRef={usernameRef} />
        <div className='mt-3 ml-2 cursor-pointer hover:bg-slate-100 rounded-full' onClick={handleUsername}><ArrowCircleRightOutlinedIcon /></div>
    </div>
  );
}
