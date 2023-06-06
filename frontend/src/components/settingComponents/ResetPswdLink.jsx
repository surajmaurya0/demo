import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { linkGenerateVerify } from '../../store/Actions';
const LoginChangepswd = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [confirmPswd, setConfirmPswd] = useState()
    const [pswdChange, setPswdChange] = useState({
        token: params.token,
        password: ''
    })

    const [type, setType] = useState("password")
    const showPswd = () => {
        type === "password" ? setType("text") : setType("password");
    }
    const changePassword = () => {
        const match = pswdChange.password == confirmPswd
        if (!match) {
            return alert('confirm password mismatched')
        }
        dispatch(linkGenerateVerify(pswdChange, navigate))
    }
    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: '5%' }}>
            <Box width={'50%'} margin={'auto'} bgcolor={'whitesmoke'} padding={5} borderRadius={'10px'}>
                <Typography variant='h5' value=''></Typography>
                <Typography variant='h5'>Reset Password </Typography>

                <TextField fullWidth label="Password" value={pswdChange.password} sx={{ marginTop: 2 }} onChange={(e) => setPswdChange({ ...pswdChange, password: e.target.value })} />
                <Box display={'flex'} width={'100%'} justifyContent={'flex-end'} alignItems={'center'}
                    sx={{ marginTop: 2 }} >

                    <TextField label="Confirm Password" type={type} fullWidth onChange={(e) => setConfirmPswd(e.target.value)} value={confirmPswd} />{type === "password" ? < VisibilityOffIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} /> : < VisibilityIcon sx={{ position: "absolute", marginRight: '1%' }} onClick={showPswd} />}
                </Box>
                <Button variant='contained' sx={{ marginTop: 2 }} onClick={() => changePassword()}>Change Password</Button>

            </Box>
        </Box>
    )
}

export default LoginChangepswd