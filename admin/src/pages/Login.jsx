import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

 const navigate = useNavigate()

  const handleLogin = (data) => {

    axios.post(process.env.REACT_APP_API_URL + 'users/login', {
      username, password
    }).then((res) => {
      navigate('/')
      Cookies.set('auth_token',res.data.accessToken)
    }).catch((err) => {

    })
  }

  const token = Cookies.get('auth_token')
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [])

  return (
    <Stack height='100%' alignItems='center' justifyContent='center' p={5}>
      <Stack p={3}>
        <Stack p={2} alignItems='center' justifyContent='center'>
          <Typography
            fontSize='25px'
            fontFamily='killi sla'
          >SPARKZ '23</Typography>
        </Stack>
        <Stack p={4} alignItems='center' justifyContent='center' sx={{
          border: '1px solid gray',
          borderRadius: '5px'
        }}>
          <Stack p={2}>
            <Typography
              fontSize='25px'
              fontFamily='killi sla'
            >Admin Login</Typography>
          </Stack>

            <form onSubmit={handleSubmit(handleLogin)}>
          <Stack direction='column' gap={3}>
              <Stack>
                <TextField value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Admin username" variant="outlined" />
              </Stack>
              <Stack>
                <TextField type='password' value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
              </Stack>
              <Stack>
                <Button type='submit' sx={{
                  border: '1px solid gray', color: 'white'
                  , height: '40px',
                  '&:hover': {
                    backgroundColor: 'red',
                    border: 'none'
                  }
                }
                }>Admin Login</Button>
              </Stack>
          </Stack>
            </form>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Login