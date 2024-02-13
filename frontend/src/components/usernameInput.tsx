import TextField from '@mui/material/TextField'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export default function UsernameInput() {
  return (
    <div className='flex items-center p-12'>
        <TextField id="standard-basic" label="Username" variant="standard" />
        <ArrowCircleRightOutlinedIcon />
    </div>
  );
}
