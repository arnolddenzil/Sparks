import { Stack } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import Dep from '../components/Dep'
import Events from '../components/Events'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Dashboard = () => {

  const [user,setUser] = useState({})

  const token = Cookies.get('auth_token')
  const navigate = useNavigate()

  const getAdminDetails = () => {
    axios.get(process.env.REACT_APP_API_URL+'users/getAdminDetails',{
      headers:{
        Authorization:"Bearer "+token
      }
    }).then((res)=>{
      setUser(res.data.data)
    }).catch((err)=>{
    })
  }

  useEffect(() => {
    if (!token) {
      navigate('/adminlogin')
    }
    getAdminDetails()

  }, [])

  return (
    <Stack>
      <Stack>
        <Navbar />
      </Stack>
      <Stack p={5}>
        <Stack>
          <Dep user={user}/>
        </Stack>
        <Stack>
          <Events user={user}/>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Dashboard