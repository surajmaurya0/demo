import React, { useEffect, useState } from "react";
import waveBg from '../assest/wave2.svg'
import { Avatar, Box, Button, TextField, Typography, Modal } from "@mui/material";
import userImg from '../assest/vector-users-icon.webp'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProfileUser } from "../store/Actions";
import { useSelector } from "react-redux";
import { ProfileUserUpdate } from "../store/Actions";
const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '1px solid greenyellow',
   borderRadius: '20px',
   boxShadow: 24,
   p: 4,
};
const logIndata = localStorage.getItem('login')

function Profile() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [open, setOpen] = useState(false);
   const [type, setType] = useState("password")

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const profile = useSelector((state) => state.Profile.user)
   const [userData, setUserData] = useState({
      token: logIndata,
   })

  
   const showPswd = () => {
      type === "password" ? setType("text") : setType("password");
   }

   const token = {
      token: logIndata
   }
   const updateUserProfile = () => {
      dispatch(ProfileUserUpdate(userData,navigate))
   }
   useEffect(() => {
      if (logIndata == null) {
         return navigate('/entry')
      }
      dispatch(ProfileUser(token))

   }, [logIndata])
   useEffect(()=>{
      if(open){
         setUserData({...userData,  email: profile.email,name: profile.name,password: '********'})
      }
   },[open])

   return (
      <>
         <Box
            // sx={{ background: `url(${waveBg})` }}
            minWidth={'100%'}
            display='flex'
            justifyContent={'center'}
            marginTop="8%"


         >
            <Box sx={{
               minWidth: "50%", height: 'auto', alignItems: 'center', display: 'flex', flexDirection: 'column', backdropFilter: "blur(23px)", padding: '30px',
               background: "linear-gradient(to bottom, #000000 0%, #FFFFFF 100%)", borderRadius: '20px'
            }}    >
               <Box width={'100%'} sx={{
                  display: 'flex', flexDirection
                     : 'column', alignItems: "center"
               }}>
                  <img src={userImg} width={200} style={{ borderRadius: '50%', border: '2px solid greenyellow' }} />
                  <Typography variant='h5' sx={{ color: 'whitesmoke' }}>{profile?.name}</Typography>
               </Box>
               <Box minWidth={'70%'} sx={{
                  display: 'flex', flexDirection: "column", backdropFilter: 'blur(1px)',
                  background: 'rgb(255 255 255 / 100%)', padding: '10px', marginTop: "15px", borderRadius: '20px'
               }}>
                  <TextField fullWidth label='Name' value={profile?.name + ""} disabled sx={{ marginTop: "20px" }} />
                  <TextField fullWidth label='Email' value={profile?.email + ""} disabled sx={{ marginTop: "20px" }} />

                  <TextField fullWidth label='Password' type='password' value={profile?.password + ""} disabled sx={{ marginTop: "20px" }} />
               </Box>
               <Box sx={{ marginTop: '20px' }}>
                  <Button variant="contained" onClick={handleOpen} >Do You Want Edit Your Profile?</Button>
                  <Modal
                     open={open}
                     onClose={handleClose}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description"
                  > 
                     <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                           Update Your Profile
                        </Typography>
                        <TextField fullWidth label='Name' value={userData?.name} sx={{ marginTop: "20px" }} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                        <TextField fullWidth label='Email' value={userData?.email} sx={{ marginTop: "20px" }} disabled />
                        <span style={{ color: "red" }}>Email can't be change</span>
                        <Box display={'flex'} width={'100%'} justifyContent={'flex-end'} alignItems={'center'}
                           sx={{ marginTop: 2 }} >

                           <TextField label="Password" type={type} fullWidth value={userData?.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />{type === "password" ? < VisibilityOffIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} /> : < VisibilityIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} />}
                        </Box>
                        <Button variant="contained" sx={{ marginTop: "20px" }} onClick={(e) => updateUserProfile()} >Update</Button>
                     </Box>

                  </Modal>
               </Box>

            </Box>
         </Box>
      </>
   )
}
export default Profile