import {
    Box,
    Drawer,
    List,
    ListItemText,
    ListItem,
    Typography,
    Collapse,
} from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useLocation, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import TagIcon from '@mui/icons-material/Tag';
import React, { useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SmsIcon from '@mui/icons-material/Sms';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { useParams } from 'react-router-dom';
import LoginChangepswd from './settingComponents/LoginChangepswd';
import DeleteAccount from './settingComponents/DeleteAccount';
import PswdChangeUsingLink from './settingComponents/PswdChangeUsingLink';
import PswdChangeUsingOtp from './settingComponents/PswdChangeUsingOtp';
import { useDispatch } from 'react-redux';
import {ProfileUser} from '../store/Actions'
function Setting() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
     const login = localStorage.getItem('login')
     const token ={
        token:login
     }
     const check = useParams()
     if(login){

        //  useEffect(()=>{
            dispatch(ProfileUser(token))
        //  },[login])
     }
     const checkValue = check.forgot == 'link' || check.forgot == 'otp' || check.forgot == 'DeleteAccount' || check.forgot == 'ChangePassword' || check.forgot == 'forgot'
     
     useEffect(()=>{
        setIsOpen(checkValue)
     },[])

    return (
        <>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: '5%' }}>
                <Box sx={{
                    width: "80%", borderRadius: '51px',
                    backdropFilter: ' brightness(0.5)', overflow: 'hidden', boxShadow: '2px 21px 13px -12px #000000, 0px 0px 100px 65px rgba(255,255,255,0.43)',display:'flex'
                }}>
                    <Box
                        sx={{
                            width: "20%",

                            height: "auto",
                            padding:'20px',
                            background: 'rgb(209 209 209 / 15%)',
                        }}
                    >
                        {login ? <> <Box sx={{ display: "flex",paddingTop:"55px" }}>
                            <Box
                               sx={{
                                width: "100%",
                                // maxWidth: 360,
                                bgcolor: "rgba(0,0,0,0.02)",
                                color:'rgb(255 255 255 / 52%)'
                            }}
                            >
                                <nav aria-label="main mailbox folders">
                                    <List>
                                        {/* <ListItem disablePadding> */}
                                        <ListItemButton onClick={() => toggleDrawer()}>
                                            <ListItemIcon>
                                                <PrivacyTipIcon sx={{color:'rgb(255 255 255 / 90%)'}} />
                                            </ListItemIcon>
                                            <ListItemText primary="Privacy" />
                                            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </ListItemButton>
                                        <Collapse in={isOpen} display='block' timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                <ListItemButton sx={{ pl: 4,color: check.forgot == 'ChangePassword' ? 'rgb(255 255 255 / 100%)' :'rgb(255 255 255 / 50%)' }} onClick={()=> navigate('/Setting/ChangePassword')}>
                                                    <PasswordIcon />
                                                    <ListItemText primary=" Change Password" />
                                                </ListItemButton>
                                                <Divider />
                                                <ListItemButton sx={{ pl: 4,color: check.forgot == 'DeleteAccount' ? 'rgb(255 255 255 / 100%)' :'rgb(255 255 255 / 50%)' }} onClick={()=> navigate('/Setting/DeleteAccount')}>
                                                    <DeleteForeverIcon />
                                                    <ListItemText primary="Delete Account" />
                                                </ListItemButton>
                                            </List>
                                        </Collapse>

                                    </List>
                                </nav>
                                <Divider />
                            </Box>

                        </Box></>:<>  <Box sx={{ display: "flex",paddingTop:"55px" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    // maxWidth: 360,
                                    bgcolor: "rgba(0,0,0,0.02)",
                                    color:'rgb(255 255 255 / 50%)'
                                }}
                            >
                                <nav aria-label="main mailbox folders">
                                    <List>
                                        {/* <ListItem disablePadding> */}
                                        <ListItemButton onClick={() => toggleDrawer()}>
                                            <ListItemIcon>
                                                <EnhancedEncryptionIcon  sx={{color:'rgb(255 255 255 / 90%)'}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Forgot Password? " />
                                            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </ListItemButton>
                                        <Collapse in={isOpen} display='block' timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                <ListItemButton sx={{ pl: 4,color: check.forgot == 'link' ? 'rgb(255 255 255 / 100%)' :'rgb(255 255 255 / 50%)' }} onClick={()=> navigate('/Setting/link')}>
                                                    <TagIcon />
                                                    <ListItemText primary="Link" />
                                                </ListItemButton>
                                                <Divider />
                                                <ListItemButton sx={{ pl: 4,color: check.forgot == 'otp' ? 'rgb(255 255 255 / 100%)' :'rgb(255 255 255 / 50%)' }} onClick={()=> navigate('/Setting/otp')}>
                                                    <SmsIcon />
                                                    <ListItemText primary="Otp" />
                                                </ListItemButton>
                                            </List>
                                        </Collapse>

                                    </List>
                                </nav>
                                <Divider />
                            </Box>

                        </Box></>
 
                        }
                      
                    
                       
                    </Box>
                    <Box  width='100%'display={'flex'} justifyContent={'center'} padding='50px'>

                        {!login ?<> {
                            check.forgot == 'link' ?
                            <PswdChangeUsingLink/>:
                            <PswdChangeUsingOtp/>
                           
                        }</>:<>{
                            check.forgot == 'ChangePassword'? 
                            <LoginChangepswd/>
                            :
                            <DeleteAccount/>
                            }</>
                        

                        }
                        
                    </Box>
                </Box>
            </Box>
        </>
    );
}
export default Setting;
