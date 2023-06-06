import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const PswdChangeUsingLink = () => {
  return (
    <Box width={'80%'} margin={'auto'} bgcolor={'whitesmoke'} padding={5} borderRadius={'10px'}>
      <Typography variant='h5' value=''></Typography>
      <Typography variant='h5'>Change Password Using Reset Link</Typography>

      <TextField fullWidth label='Email' type='email' sx={{marginTop:2}} />
      <Button variant='contained' sx={{marginTop:2}}>Send Reset Link</Button>

    </Box>
  )
}

export default PswdChangeUsingLink