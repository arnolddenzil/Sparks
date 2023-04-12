import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import logo from '../Assets/sparkzLogo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion } from 'framer-motion'

import { auth, googleAuthProvider } from '../Firebase/Firebase'
import Cookies from 'js-cookie'


const Navbar = ({ hideComponent }) => {

    const location = useLocation();
    const [showLogo, setShowLogo] = useState(false);

    




    useEffect(() => {
        if (location.pathname !== '/') {
            setShowLogo(true)
        }
    }, [])

    const navigate = useNavigate()

    const handleScrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // to animate scrolling
        });
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Stack alignItems='center' zIndex='9999' width='100%' sx={{
                padding: { sm: 4, xs: 3 },
                backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 10), rgba(0, 0, 0, 0.05))'
            }} p={4} height='80px' position='fixed' display='flex' flexDirection='row' justifyContent='space-between'>

                <Stack sx={{ display: { sm: 'none', xs: 'flex' } }}>
                        <Typography onClick={() => navigate('/branch')} sx={{
                            fontFamily: 'Kelly Slab',
                            fontSize: '13px',
                            fontWeight: '300',
                            zIndex: 1,
                            cursor: 'pointer',
                        }}>EVENTS</Typography>
                </Stack>
                <Stack>
                 <Typography onClick={() => navigate('/branch')} sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '23px',
                        fontWeight: '600',
                        zIndex: 1,
                        cursor: 'pointer',
                        display: { xs: 'none', sm: 'block' }
                    }}>EVENTS</Typography>                                      
                </Stack>
                {showLogo &&
                    <>
                        {hideComponent &&
                            <Stack>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    <Stack mt={6}>
                                        <Box  onClick={() => navigate('/')} sx={{ cursor: 'pointer', height: { sm: '110px', xs: '100px' }, width: { xs: '100px', sm: '110px' },ml:{xs:7,sm:10} }} width='150px' component='img' src={logo} />
                                    </Stack>
                                </motion.div>
                            </Stack>
                        }
                    </>
                }

                        <Stack>
                        <Typography onClick={handleScrollToBottom} sx={{
                            fontFamily: 'Kelly Slab',
                            fontSize: '23px',
                            fontWeight: '600',
                            zIndex: 1,
                            cursor: 'pointer',
                            display: { xs: 'none', sm: 'block' }
                        }}>CONNECT US</Typography>
                        </Stack>
                        <Stack sx={{ display: { sm: 'none', xs: 'flex' } }}>
                        <Typography onClick={handleScrollToBottom} sx={{
                            fontFamily: 'Kelly Slab',
                            fontSize: '13px',
                            fontWeight: '600',
                            zIndex: 1,
                            cursor: 'pointer',
                            display: { xs: 'flex', sm: 'none' }
                        }}>CONNECT US</Typography>
                        </Stack>
            </Stack>
        </motion.div>
    )
}

export default Navbar
