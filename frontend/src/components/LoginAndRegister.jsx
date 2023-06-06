import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPosts } from '../store/Actions';
import { registerUser } from '../store/Actions';
import { logInUser } from '../store/Actions';
const LoginAndRegister = () => {
    const dispatch = useDispatch()
    const [active, setActive] = useState("Login");
    const [matched, setMatched] = useState(false)
    const [type, setType] = useState("password")
    const [pswdMatch, setPswdMatch] = useState()
    const navigate = useNavigate()
    const [logInData, setLogInData] = useState({
        email: '',
        password: ''
    })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const toggleTab = (index) => {
        setActive(index);
    };
    let entry = [{ name: 'Login' }, { name: 'Register' }]
    const showPswd = () => {
        type === "password" ? setType("text") : setType("password");
    }
    const handleOnChange = (event) => {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const logInUserSubmit = () => {
       dispatch(logInUser(logInData,navigate))
    }
    const registerUserSubmit = () => {

        if (pswdMatch != formData.password) { 
            return alert('password didnt matched')
        }
        dispatch(registerUser(formData,navigate))
    }
    const logIndata = localStorage.getItem('login')
    useEffect(()=>{
      if(logIndata){
         navigate('/profile')
      }
    },[logIndata])
    return (
        <Box width='100%' display='flex' justifyContent='center' alignContent='center' alignItems='center' mt={10}>
            <Box minWidth='50%' sx={{ border: '1px solid black', backdropFilter: 'invert(1)' }} p={5} borderRadius={10}>
                <Box height='50px' width='100%' display={'flex'} >
                    {
                        entry.map((d) => {
                            return (
                                <>
                                    <span active={active} style={{
                                        borderRadius: "30px",
                                        color: active == d.name ? "white" : "black", width: '50.5%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '20px', cursor: 'pointer',
                                        background: active == d.name ? "black" : ""
                                    }} onClick={() => [toggleTab(d.name)]}>{d.name}</span>
                                </>

                            )
                        })
                    }

                </Box>
                <Box width='100%' display={'flex'} justifyContent={'center'}>
                    <Box width={'90%'} sx={{ marginTop: 3 }}>
                        {active === 'Register' ? (
                            <>
                                <TextField label="Name" fullWidth sx={{ marginTop: 2 }} name='name' value={formData.name} onChange={handleOnChange} />
                                <TextField label="Email" type="email" fullWidth sx={{ marginTop: 2 }} name='email' value={formData.email} onChange={handleOnChange} />
                                <Box display={'flex'} width={'100%'} justifyContent={'flex-end'} alignItems={'center'}
                                    sx={{ marginTop: 2 }} >

                                    <TextField label="Password" type={type} fullWidth name='password' value={formData.password} onChange={handleOnChange} />{type === "password" ? < VisibilityOffIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} /> : < VisibilityIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} />}
                                </Box>
                                <TextField label="Confirm Password" type="text" fullWidth sx={{
                                    marginTop: 2,
                                }} onChange={(e) => setPswdMatch(e.target.value)} value={pswdMatch} />

                                <Button
                                    sx={{
                                        marginTop: 4,
                                        width: '50%',
                                        fontWeight: 600,
                                        background: '#aaacae',
                                        color: 'black',
                                        '&:hover': {
                                            border: '1px solid greenyellow',
                                            color: 'white',
                                            backgroundColor: '#171515'
                                        }
                                    }}
                                    onClick={() => registerUserSubmit()}
                                >
                                    Register
                                </Button>
                            </>
                        ) : <>
                            <TextField label="Email" type="email" fullWidth sx={{ marginTop: 2 }} onChange={(e) => setLogInData({ ...logInData, email: e.target.value })} value={logInData.email} />
                            <Box display={'flex'} width={'100%'} justifyContent={'flex-end'} alignItems={'center'}
                                sx={{ marginTop: 2 }} >

                                <TextField label="Password" type={type} fullWidth onChange={(e) => setLogInData({ ...logInData, password: e.target.value })} value={logInData.password} />{type === "password" ? < VisibilityOffIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} /> : < VisibilityIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} />}
                            </Box>
                            <Button
                                sx={{
                                    marginTop: 4,
                                    width: '50%',
                                    fontWeight: 600,
                                    background: '#aaacae',
                                    color: 'black',
                                    '&:hover': {
                                        border: '1px solid greenyellow',
                                        color: 'white',
                                        backgroundColor: '#171515'
                                    }
                                }}
                                onClick={() => logInUserSubmit()}
                            >
                                Login
                            </Button>
                        </>}

                    </Box>
                </Box>

            </Box>

        </Box>
    )
}

export default LoginAndRegister