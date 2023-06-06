import React, { useEffect } from "react";
import { AppBar, Box, Tab, Typography, Tabs, Button } from '@mui/material'

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoodIcon from '@mui/icons-material/Mood';
import { useNavigate } from "react-router-dom";
function Header() {
    const navigat = useNavigate()
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const CheckLogin = localStorage.getItem('login')
    useEffect(() => {

    }, [CheckLogin])
    return (
        <>
            <AppBar sx={{ background: 'black', border: "1px solid greenyellow", borderLeft: '0px', borderRight: '0px' }}>
                <Box width={'auto'} display={'flex'} alignItems='strech' margin="0% 2% 0% 2%">

                    <Box p={2}>
                        <MoodIcon sx={{ transform: "scale(2)", color: 'yellow' }} />
                        <EmojiEmotionsIcon sx={{ transform: "scale(2)", color: 'yellow', }} />
                    </Box>
                    <Box sx={{ width: 'auto', marginLeft: '10px' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="yellow"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="one" label="home" onClick={() => navigat('/')} />
                            {
                                CheckLogin ? <Tab value="two" label="Menu" onClick={() => navigat(`/Setting/ChangePassword`)} /> : <Tab value="two" label="Menu" onClick={() => navigat(`/Setting/link`)} />
                            }
                            {
                                CheckLogin ? <Tab value="three" onClick={() => navigat('/profile')} label="profile" /> : <></>
                            }

                            <Tab value="four" disabled label="insert" />
                        </Tabs>

                    </Box>
                    <Box display='flex' alignItems={'center'} marginLeft='auto'>
                        <Box display='flex'>
                            {CheckLogin ? <Button sx={{
                                background: "white", fontWeight: 700, color: "black", "&:hover": {
                                    border: "1px solid greenyellow",
                                    color: 'white',
                                    backgroundColor: '#4b4848'
                                },

                            }}
                                onClick={() =>[ localStorage.clear('login'),navigat('/')]}
                            >LogOut</Button>
                                : <Button sx={{
                                    background: "white", fontWeight: 700, color: "black", "&:hover": {
                                        border: "1px solid greenyellow",
                                        color: 'white',
                                        backgroundColor: '#4b4848'
                                    },

                                }}
                                    onClick={() => navigat('/entry')} >LogIn</Button>

                            }


                        </Box>

                    </Box>


                </Box>

            </AppBar>
        </>
    )
}
export default Header;