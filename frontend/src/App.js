import { Stack, ThemeProvider, createTheme } from "@mui/material";
import MainPage from "./Pages/MainPage";
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Department from "./Pages/Department";
import DepEventList from "./Pages/DepEventList";
import SingleEvent from "./Pages/SingleEvent";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SplashPage from "./Components/SplashPage";
import Credits from "./Pages/Credits";
import axios from 'axios'
import Register from "./Pages/Register";
import Cookies from 'js-cookie'
import Login from "./Pages/Login";




const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true)
  const [reload,setReload] = useState(false)

  useEffect(() => {
    // simulate a delay in loading
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);


  
  
  useEffect(() => {
    setTimeout(() => {
      Cookies.remove('userId');
      Cookies.remove('auth_token');
      setUser(null)
      window.location.reload()
    }, 3600000);
  }, [])
  

  const userId  = Cookies.get('userId')


// const getUserDetails = () => {
//   axios.post('https://sparks-production-d365.up.railway.app/users/getUser',{
//     userId
//   }).then((res)=>{
//     setUser(res.data.data)
//     Cookies.set('userId',res.data._id)   
//   }).catch((err)=>{
//   })
// }

// useEffect(() => {
//   getUserDetails()
// }, [reload]);


const getReload = (data) =>{
  setReload(data)
}

return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {showSplash ?
                <Stack>

                  <SplashPage />
                </Stack>
                :
                <MainPage user={user} />
              }
            </motion.div>
          } />
        </Routes>
        <Routes>
          <Route path="/branch" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Department user={user} />
            </motion.div>
          } />
        </Routes>
        <Routes>
          <Route path="/branch/:event" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <DepEventList user={user} />
            </motion.div>
          } />
        </Routes>
        <Routes>
          <Route path="/branch/:event/:eventId" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <SingleEvent user={user} />
            </motion.div>
          } />
        </Routes>
        <Routes>
          <Route path="/dev-connect" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Credits user={user} />
            </motion.div>
          } />
        </Routes>
        <Routes>
          <Route path="/register" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Register user={user} />
            </motion.div>
          } />
        </Routes>
        <Routes>
          <Route path="/login" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Login user={user} getReload={getReload}/>
            </motion.div>
          } />
        </Routes>
      </Router>
    </ThemeProvider>

  );
}

export default App;
