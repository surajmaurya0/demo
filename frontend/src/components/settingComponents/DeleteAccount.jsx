import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../store/Actions';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userProfile = useSelector((state)=> state.Profile.user)
  const token = localStorage.getItem('login')
  const [deleteUserData, setDeleteUserData] = useState({
    token:token,
    email:userProfile?.email,
    password:''
  })
  const [type, setType] = useState("password")
  const showPswd = () => {
    type === "password" ? setType("text") : setType("password");
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(deleteUser(deleteUserData,navigate))
    
    setOpen(false);
  };
  return (
    <Box width={'80%'} margin={'auto'} bgcolor={'whitesmoke'} padding={5} borderRadius={'10px'}>
    <Typography variant='h5' value=''></Typography>
    <Typography variant='h5'sx={{color:"red"}} >Delete Your Account</Typography>

    <TextField fullWidth label='Email' value={userProfile?.email + ""} disabled type='email' sx={{marginTop:2}} />
    <Box display={'flex'} width={'100%'} justifyContent={'flex-end'} alignItems={'center'}
        sx={{ marginTop: 2 }} >

        <TextField label="Password" type={type} fullWidth onChange={(e)=> setDeleteUserData({...deleteUserData,password:e.target.value})} />{type === "password" ? < VisibilityOffIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} /> : < VisibilityIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} />}
      </Box>
        <Typography variant='span' sx={{color:'red',display:'block'}} >Enter Your Password For Delete Account</Typography>
        <Button variant='contained' sx={{marginTop:2,background:'red',"&:hover":{background:'#961a1a'}}} onClick={handleClickOpen} >Delete</Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure Delete Your Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          After Delete Account Won't Be Recover
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button variant='contained'  onClick={() => setOpen(false)} >Disagree</Button>
          <Button onClick={handleClose} sx={{background:'red',"&:hover":{background:'#961a1a'},color:'white'}} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  </Box>
  )
}

export default DeleteAccount