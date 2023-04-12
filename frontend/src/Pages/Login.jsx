import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Footer from '../Components/Footer'
import bg from '../Assets/depBg.svg'
import bg1 from '../Assets/backgrounds/background1.png'
import bg2 from '../Assets/backgrounds/background2.png'
import bg3 from '../Assets/backgrounds/background3.png'
import bg4 from '../Assets/backgrounds/background4.png'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import Connect from '../Components/Connect'

const Login = ({ user ,getReload}) => {
    const [backgroundImage, setBackgroundImage] = useState("");
    const [hideComponent, setHideComponent] = useState(true);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
  

    const createUser = async () => {
        axios.post('https://sparks-production-d365.up.railway.app/users/loginUser', {
            email, password
        }).then((res) => {
        
            // Cookies.set('userId', res.data.data._id)
            navigate('/branch')
            getReload(true)

        }).catch((err) => {
        })
    }

    const Token = Cookies.get('userId')

    useEffect(() => {
        if (Token) {
            navigate('/branch')
        }
    }, [])  



    const backgroundImageUrls = [
        bg,
        bg1,
        bg2,
        bg3,
        bg4,
    ];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * backgroundImageUrls.length);
        setBackgroundImage(backgroundImageUrls[randomIndex]);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 10) {
                setHideComponent(false);
            } else {
                setHideComponent(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const params = useParams()

    const navigate = useNavigate()

    return (
        <Stack height='100%'>
            <Stack sx={{
                backgroundColor: 'rgba(5, 5, 5)',
                position: 'relative',
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,17) 100%),url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: 'auto',
                backgroundAttachment: 'fixed'
            }}>

                <Stack >
                    <Navbar hideComponent={hideComponent} user={user} />
                </Stack>
                <Stack direction='column'  mt={3} sx={{ mt: { sm: 3, xs: 14 },mb:{xs:6,sm:1} }} justifyContent='center' alignItems='center'>
                    <Stack sx={{ p: { sm: 10, xs: 2 } }}  gap={5}>
                        <Stack justifyContent='center' alignItems='center'>
                            <Stack sx={{ p: { sm: 5, xs: 1 } }}>
                                <Typography
                                    sx={{
                                        ml: '20px',
                                        fontFamily: 'Kelly Slab',
                                        fontSize: { sm: '30px', xs: '17px' },
                                        fontWeight: '700'
                                    }}>LOGIN</Typography>
                            </Stack>

                        </Stack>
                        <form>



                            <Stack  gap={5} sx={{ padding: { sm: '0px 100px', xs: '0px 30px' }, width: { xs: "300px", sm: "500px" } }} >
                                <Stack display='flex' sx={{ flexDirection: { sm: 'column', xs: 'column' } }} gap={2}>
                                    <Stack flex={6}>
                                        <TextField onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                                    </Stack>
                                    <Stack flex={6}>
                                        <TextField type='password' onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
                                    </Stack>
                                </Stack>
                                <Stack direction='row' >
                                    <Stack flex={12}>
                                        <Button variant="contained" onClick={createUser}>Login</Button>
                                    </Stack>
                                </Stack>
                                <Stack justifyContent='center' alignItems='center'>
                                <Typography onClick={()=>navigate('/register')}
                                    sx={{
                                        ml: '20px',
                                        fontFamily: 'Kelly Slab',
                                        fontSize: { sm: '12px', xs: '10px' },
                                        fontWeight: '400',
                                        cursor:'pointer'
                                    }}>New to Sparkz ? Create a new</Typography>
                                </Stack>
                            </Stack>
                        </form>
                    </Stack>
                </Stack>

            </Stack>
            <Connect />
            <Footer />
        </Stack >
    )
}

export default Login
