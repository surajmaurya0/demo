import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Box, Toolbar } from "@mui/material";
import Setting from "./components/Setting";
import LoginAndRegister from "./components/LoginAndRegister";
import Profile from "./components/Profile"; 
import bg from './assest/bg.jpg'
import { useEffect } from "react";
import ResetPswdLink from './components/settingComponents/ResetPswdLink'

function App() {  
  return (
    <>
      <Header />
      <Toolbar/>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Setting/:forgot/" element={<Setting/>} />
        <Route path="/reset-password/:token" element={<ResetPswdLink/>} />
        <Route path="/profile" element={ <Profile/>} />
        {/* {not working properly profile page} */}
        <Route path="/entry" element={<LoginAndRegister/>} />
      </Routes>
      

    </>

  )
}
export default App;