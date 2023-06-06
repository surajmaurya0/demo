import { Box, Button, TextField, Typography } from '@mui/material'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { linkGenerate } from '../../store/Actions';
import { useNavigate } from 'react-router-dom';

const PswdChangeUsingLink = () => {
   const navigate = useNavigate()
   const dispatch =useDispatch()
  const [email,setEmail] = useState()
  const sendEmail=()=>{
    dispatch(linkGenerate(email,navigate))
  }
  return (
    <Box width={'80%'} margin={'auto'} bgcolor={'whitesmoke'} padding={5} borderRadius={'10px'}>
      <Typography variant='h5' value=''></Typography>
      <Typography variant='h5'>Change Password Using Reset Link</Typography>

      <TextField fullWidth label='Email' type='text' value={email}   onChange={(e)=> setEmail(e.target.value)}  sx={{marginTop:2}} />
      <Button variant='contained' onClick={()=> sendEmail()} sx={{marginTop:2}}>Send Reset Link</Button>

    </Box>
  )
}

export default PswdChangeUsingLink