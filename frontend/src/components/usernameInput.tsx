import TextField from '@mui/material/TextField'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export default function UsernameInput() {
  return (
    <div className='flex items-center justify-center'>
        <TextField id="standard-basic" label="Username" variant="standard" />
        <ArrowCircleRightOutlinedIcon className='mt-3 ml-2' />
    </div>
  );
}
