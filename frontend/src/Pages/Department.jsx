import React from 'react'
import Navbar from '../Components/Navbar'
import { Box, Button, Stack, Typography } from '@mui/material'
import bgImg from '../Assets/cseDEp.svg'
import bgImg2 from '../Assets/eeeDep.svg'
import bgImg3 from '../Assets/civilDep.svg'
import bgImg4 from '../Assets/mechDep.svg'
import bgImg5 from '../Assets/bsc.svg'
import cseTitle from '../Assets/cstitle.png'
import eeeTitle from '../Assets/eeetitle.png'
import civilTitle from '../Assets/civiltitle.png'
import mechTitle from '../Assets/mechtitle.png'
import Connect from '../Components/Connect'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Footer from '../Components/Footer'

const Department = ({user}) => {

    const [hideComponent, setHideComponent] = useState(true);


    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        scrollToTop()
    }, [])


    useEffect(() => {

        const handleScroll = () => {
            if (window.pageYOffset > 20) {
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



    const location = useLocation()
    const navigate = useNavigate()

    const goToEventPage = (data) => {
        navigate(`/${data}`)
    }


    return (
        <Stack sx={{ overflowX: 'hidden' }}>
            <Stack>
                <Navbar hideComponent={hideComponent} user={user}/>
            </Stack>
            <Stack direction='column'>
                <Stack direction='row' sx={{ display: { xs: 'none', sm: 'flex' } }}>

                    <Stack onClick={() => navigate('/branch/cse')}
                        alignItems='end' justifyContent='center' height='400px' flex={3} sx={{
                            position: 'relative',
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,16) 100%),url(${bgImg})`,
                            // backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '510px',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'lightgray',
                                cursor: 'pointer',
                                transform: 'scale(1.09)',
                                color: 'red'
                            },


                        }}>

                        <Box mt={10} height='300px' mr={3} component='img' src={cseTitle} />

                    </Stack>
                    <Stack onClick={() => navigate('/branch/eee')} alignItems='end' justifyContent='center' flex={3} height='400px' sx={{
                        position: 'relative',
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,16) 100%),url(${bgImg2})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '510px',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'lightgray',
                            cursor: 'pointer',
                            transform: 'scale(1.09)'
                        },


                    }}>
                        <Box mt={10} height='300px' mr={3} component='img' src={eeeTitle} />
                    </Stack>
                    <Stack onClick={() => navigate('/branch/civil')} alignItems='end' justifyContent='center' flex={3} height='400px' sx={{
                        position: 'relative',
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,16) 100%),url(${bgImg3})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '510px',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'lightgray',
                            cursor: 'pointer',
                            transform:{sm: 'scale(1.09)',xs:'none'}
                        },


                    }}>
                        <Box mt={10} height='300px' mr={3} component='img' src={civilTitle} />
                    </Stack>
                    <Stack onClick={() => navigate('/branch/mech')} direction='column' alignItems='end' justifyContent='center' flex={3} height='400px' sx={{
                        position: 'relative',
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,16) 100%),url(${bgImg4})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '510px',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'lightgray',
                            cursor: 'pointer',
                            transform: 'scale(1.05)'
                        },


                    }}>
                        <Box mt={10} height='300px' mr={3} component='img' src={mechTitle} />
                    </Stack>
                </Stack>
                <Stack direction='column' sx={{ display: { xs: 'flex', sm: 'none' } }}>
                    <Stack direction='row'>
                        <Stack onClick={() => navigate('/branch/cse')}
                            alignItems='end' justifyContent='center' height='400px' flex={6} sx={{
                                position: 'relative',
                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,16) 100%),url(${bgImg})`,
                                // backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                height: '510px',
                            }}>

                            <Box mt={10} height='300px' mr={3} component='img' src={cseTitle} />

                        </Stack>
                        <Stack onClick={() => navigate('/branch/eee')} alignItems='end' justifyContent='center' flex={6} height='400px' sx={{
                            position: 'relative',
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,16) 100%),url(${bgImg2})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '510px',
                        }}>
                            <Box mt={10} height='300px' mr={3} component='img' src={eeeTitle} />
                        </Stack>
                    </Stack>
                    <Stack direction='row'>
                        <Stack onClick={() => navigate('/branch/civil')} alignItems='end' justifyContent='center' flex={6} height='400px' sx={{
                            position: 'relative',
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,16) 100%),url(${bgImg3})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '510px',
                        }}>
                            <Box mt={10} height='300px' mr={3} component='img' src={civilTitle} />
                        </Stack>
                        <Stack onClick={() => navigate('/branch/mech')} direction='column' alignItems='end' justifyContent='center' flex={6} height='400px' sx={{
                            position: 'relative',
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,16) 100%),url(${bgImg4})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '510px',
                        }}>
                            <Box mt={10} height='300px' mr={3} component='img' src={mechTitle} />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack onClick={() => navigate('/branch/bsc')} width='100%' sx={{
                    position: 'relative',
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,16) 100%),url(${bgImg5})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: { xs: '150px', sm: '250px' },
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'lightgray',
                        cursor: 'pointer',
                        transform: 'scale(1.05)'
                    },

                }}>
                    <Typography
                        sx={{
                            mt: 1,
                            mr: { xs: 2, sm: 10 },
                            fontFamily: 'Kelly Slab',
                            fontSize: '28px',
                            fontWeight: '700',
                            textAlign: 'right'
                        }}>BASIC SCIENCE</Typography>
                </Stack>
            </Stack>
            <Connect />
            <Footer/>
        </Stack>

    )
}

export default Department