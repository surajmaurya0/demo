import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { otpGenerate, otpGenerateVerify } from '../../store/Actions';
import { useNavigate } from 'react-router-dom';



const PswdChangeUsingOtp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userData,setUserData] = useState({
    email:'',
    otp:'' ,
    password:''
  })
  const [type, setType] = useState("password")
  const [otpSend, setOtpSend] = useState(false)
  const showPswd = () => {
    type === "password" ? setType("text") : setType("password");
  }
 const generateOtp = ()=>{
  dispatch(otpGenerate(userData,setOtpSend))
 }
 const generateOtp_verfiy = () =>{
    dispatch(otpGenerateVerify(userData,navigate))
 }
  return (
    <Box width={'80%'} margin={'auto'} bgcolor={'whitesmoke'} padding={5} borderRadius={'10px'}>
      <Typography variant='h5' value=''></Typography>
      <Typography variant='h5'>Change Password Using OTP</Typography>
      <Box display={'flex'} sx={{ marginTop: 2, }} alignItems={'center'} width={'100%'}>

        <TextField fullWidth label='Email' type='email' value={userData.email} onChange={(e) => setUserData({...userData,email:e.target.value})} />

        <Button variant='contained' sx={{ marginLeft: 2, width: '30%' }} onClick={() => generateOtp()}>Send otp</Button>
      </Box>
      {otpSend ? <>
        <Box width={'100%'} display={'flex'} sx={{ marginTop: 2 }} alignItems={'baseline'} >
        <TextField label='Enter Your Otp' type='number'  value={userData.otp} onChange={(e) => setUserData({...userData,otp:e.target.value})} />
      </Box>
      <Box display={'flex'} width={'100%'} justifyContent={'flex-end'} alignItems={'center'}
        sx={{ marginTop: 2 }} >

        <TextField label="Password" type={type} fullWidth value={userData.password} onChange={(e) => setUserData({...userData,password:e.target.value})}  />{type === "password" ? < VisibilityOffIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} /> : < VisibilityIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} />}
      </Box>
      <TextField sx={{ marginTop: 2 }} label="Confirm Password" type='text' fullWidth />
      <Button variant='contained' sx={{ marginTop: 2, width: '20%' }} onClick={()=>generateOtp_verfiy()} >Submit</Button>
      </> :<></>

      }
    
    </Box>
  )
}

export default PswdChangeUsingOtp