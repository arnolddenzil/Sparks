import { Box, Button, Grid, ListItem, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Connect from '../Components/Connect'
import { Link, useNavigate, useParams } from 'react-router-dom'
import bg from '../Assets/depBg.svg'
import bg1 from '../Assets/backgrounds/background1.png'
import bg2 from '../Assets/backgrounds/background2.png'
import bg3 from '../Assets/backgrounds/background3.png'
import bg4 from '../Assets/backgrounds/background4.png'
import card from '../Assets/velocity.png'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Footer from '../Components/Footer'
import events from '../Events'


const DepEventList = ({ user }) => {

    const [hideComponent, setHideComponent] = useState(true);
    const [backgroundImage, setBackgroundImage] = useState("");
    const [eventDatas, setEventDatas] = useState([]);
    const [eventName, setEventName] = useState('');
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

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        scrollToTop()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 70) {
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

    useEffect(() => {
        if (params.event === "cse") {
            setEventDatas(events.cse)
            setEventName('COMPUTER SCIENCE ENGINEERING')
        }
    }, [])

    useEffect(() => {
        if (params.event === "eee") {
            setEventName('ELECTRICAL & ELECTRONICS ENGINEERING')
            setEventDatas(events.eee)
        }
    }, [])

    useEffect(() => {
        if (params.event === "civil") {
            setEventName('CIVIL ENGINEERING')
            setEventDatas(events.civil)
        }
    }, [])

    useEffect(() => {
        if (params.event === "mech") {
            setEventName('MECHANICAL ENGINEERING')
            setEventDatas(events.mech)
        }
    }, [])

    useEffect(() => {
        if (params.event === "bsc") {
            setEventName('BASICS SCIENCE & HUMANITIES')
            setEventDatas(events.bsc)
        }
    }, [])

    return (
        <Stack>
            <Stack sx={{
                backgroundColor: 'rgba(5, 5, 5)',
                position: 'relative',
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,17) 100%),url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: 'auto',
                backgroundAttachment: 'fixed'


            }}>
                <Stack mb={5}>
                    <Navbar hideComponent={hideComponent} user={user} />
                </Stack>



                <Stack mt={10} >
                    {/* <Button sx={{ cursor: 'pointer' }} onClick={() => navigate(`/branch/${params.event}/2`)}>hello</Button> */}
                    <Stack mt={1} sx={{ p: { sm: 5, xs: 1 } }} direction='column'>
                        <Stack>
                            <Typography
                                sx={{
                                    ml: '23px',
                                    fontFamily: 'Kelly Slab',
                                    fontSize: { sm: '30px', xs: '17px' },
                                    fontWeight: '700'
                                }}>{eventName}</Typography>
                        </Stack>
                        <Stack p={3}>
                            <Stack >



                                <Grid display='flex' sx={{ flexDirection: { xs: 'column', sm: 'row' } }} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
                                    {eventDatas && eventDatas.map((eventData, index) => (

                                        <Grid item xs={4} sm={4} md={4} >

                                          
                                            <motion.div  >

                                                <Box
                                                    key={index}
                                                    onClick={() => navigate(`/branch/${params.event}/${index + 1}`, { state: eventData })}
                                                    component='img'
                                                    borderRadius='10px'
                                                    // border='2px solid white'
                                                    sx={{
                                                        cursor: 'pointer', height: { xs: '100%', sm: '85%' }, width: { xs: '310px', sm: '85%' },
                                                        transition: 'transform 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.1)'
                                                        },
                                                    }}
                                                    src={eventData.posterImg} />

                                            </motion.div>

                                        </Grid>
                                    ))}
                                    {/* <Grid item xs={4} sm={4} md={4} >


                                        <Box
                                            onClick={() => navigate(`/branch/${params.event}/2`)}
                                            bgcolor='gray'
                                            component='img'
                                            borderRadius='5px'
                                            border='2px solid white'
                                            sx={{ height: { xs: '100%', sm: '100%' }, width: { xs: '310px', sm: '100%' } }}
                                            src={card} />


                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} >


                                        <Box
                                            onClick={() => navigate(`/branch/${params.event}/2`)}
                                            bgcolor='gray'
                                            component='img'
                                            borderRadius='5px'
                                            border='2px solid white'
                                            sx={{ height: { xs: '100%', sm: '100%' }, width: { xs: '310px', sm: '100%' } }}
                                            src={card} />


                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} >


                                        <Box
                                            onClick={() => navigate(`/branch/${params.event}/2`)}
                                            bgcolor='gray'
                                            component='img'
                                            borderRadius='5px'
                                            border='2px solid white'
                                            sx={{ height: { xs: '100%', sm: '100%' }, width: { xs: '310px', sm: '100%' } }}
                                            src={card} />


                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} >



                                        <Box
                                            onClick={() => navigate(`/branch/${params.event}/2`)}
                                            bgcolor='gray'
                                            component='img'
                                            borderRadius='5px'
                                            border='2px solid white'
                                            sx={{ height: { xs: '100%', sm: '100%' }, width: { xs: '310px', sm: '100%' } }}
                                            src={card} />



                                    </Grid> */}


                                </Grid>


                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack >
                <Connect />
                <Footer />
            </Stack>
        </Stack>
    )
}

export default DepEventList