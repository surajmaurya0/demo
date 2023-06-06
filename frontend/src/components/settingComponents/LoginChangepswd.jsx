import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changePswdLogin } from '../../store/Actions';
import { useNavigate } from 'react-router-dom';
const LoginChangepswd = () => {
  const token = localStorage.getItem('login')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.Profile.user)
  const[pswdChange,setPswdChange] = useState({
    token:token,
    email:userProfile?.email,
    oldPassword:'',
    newPassword:''
  })

  const [type, setType] = useState("password")
  const showPswd = () => {
    type === "password" ? setType("text") : setType("password");
  }
  const changePassword = ()=>{
    dispatch(changePswdLogin(pswdChange,navigate))
  }
  return (
    <Box width={'80%'} margin={'auto'} bgcolor={'whitesmoke'} padding={5} borderRadius={'10px'}>
    <Typography variant='h5' value=''></Typography>
    <Typography variant='h5'>Change Password </Typography>

    <TextField fullWidth label='Email' value={userProfile?.email + ""} disabled type='email' sx={{marginTop:2}}  />
    <TextField fullWidth label="Old Password" value={pswdChange.oldPassword} sx={{marginTop:2}} onChange={(e) => setPswdChange({...pswdChange,oldPassword:e.target.value})} /> 
    <Box display={'flex'} width={'100%'} justifyContent={'flex-end'} alignItems={'center'}
        sx={{ marginTop: 2 }} >

        <TextField label="New Password" type={type} fullWidth onChange={(e) => setPswdChange({...pswdChange,newPassword:e.target.value})} value={pswdChange.newPassword}/>{type === "password" ? < VisibilityOffIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} /> : < VisibilityIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} />}
      </Box>
    <Button variant='contained' sx={{marginTop:2}} onClick={()=> changePassword()}>Change Password</Button>

  </Box>
  )
}

export default LoginChangepswd