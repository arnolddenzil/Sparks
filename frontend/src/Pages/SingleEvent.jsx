import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import Connect from '../Components/Connect'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import bg from '../Assets/depBg.svg'
import bg1 from '../Assets/backgrounds/background1.png'
import bg2 from '../Assets/backgrounds/background2.png'
import bg3 from '../Assets/backgrounds/background3.png'
import bg4 from '../Assets/backgrounds/background4.png'
import bg5 from '../Assets/backgrounds/background1.svg'
import register from '../Assets/register.svg'
import medalfrist from '../Assets/medalfirst.png'
import medalsecond from '../Assets/medalsecond.png'
import medalthird from '../Assets/medalthird.png'
import date from '../Assets/dateRec.png'
import { useEffect } from 'react'
import { useState } from 'react'
import Footer from '../Components/Footer'
import './styles.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const SingleEvent = ({ user }) => {
  const [hideComponent, setHideComponent] = useState(true);
  const [eventDatas, setEventDatas] = useState()
  const [backgroundImage, setBackgroundImage] = useState("");
  const [registered, setRegistered] = useState(false)
  const [open, setOpen] = useState(false)

  const location = useLocation();
  const eventDetails = location?.state

  const backgroundImageUrls = [
    bg,
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
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

  const registeredBy = Cookies.get('userId')

  const eventRegister = () => {
    axios.post('http://localhost:5000/users/eventRegister', {
      registeredBy, eventName: eventDetails.title, eventDep: params.event
    }).then((res) => {
      setRegistered(true)
      isRegistered()
    }).catch((err) => {
    })
  }

  const isRegistered = () => {
    axios.post('https://sparks-production-d365.up.railway.app/users/isRegistereEvent', {
      registeredBy, eventName: eventDetails?.title
    }).then((res) => {
      if (res.data.resCode === 204) {
        setRegistered(true)
      }
    }).catch((err) => {
    })
  }

  useEffect(() => {
    isRegistered()
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleButtonClick = () => {
    window.location.href = eventDetails?.gform
    window.open(eventDetails?.gform, "_blank");
  };

  return (
    <Stack>
      <Stack sx={{
        backgroundColor: 'rgba(5, 5, 5)',
        position: 'relative',
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,15) 100%),url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // height: { sm: '111.7vh', xs: '168vh' },
        height: '100%',
        backgroundAttachment: 'fixed'

      }}>
        <Stack mb={9}>
          <Navbar hideComponent={hideComponent} user={user} />
        </Stack>
        <Stack mt={6} alignItems='center' mb={1} >
          <Stack direction='column' p={2} width='900px' sx={{
            // backgroundColor: 'rgba(5, 5, 5)',
            position: 'relative',
            // backgroundImage: `url(${eventbg})`,
            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05))',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: { xs: 'none', sm: 'flex' },
            border: '1px solid white',
            borderRadius: '5px'
          }}>
            <Stack direction='row' >
              <Stack flex={5} direction='column' p={3} gap={2}>
                <Stack>
                  <Box height='400px' width='100%' component='img' src={eventDetails?.posterImg} />
                </Stack>
                <Stack justifyContent='center' alignItems='center' gap={2}>
                  {/* <Box width='300px' component='img' src={register} /> */}
                  {/* {registered ?
                    <Button sx={{
                      backgroundColor: 'blue', height: '50px', width: '100%',
                      "&:hover": {
                        backgroundColor: "red"
                      }
                    }}>
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '18px',
                        fontWeight: '700',
                        position: 'absolute'
                      }} >
                        Already Registered!
                      </Typography>
                    </Button>
                    :
                    <Button onClick={() => setOpen(true)} sx={{
                      backgroundColor: 'blue', height: '50px', width: '100%',
                      "&:hover": {
                        backgroundColor: "red"
                      }
                    }}>
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '18px',
                        fontWeight: '700',
                        position: 'absolute'
                      }} >
                        REGISTER {eventDetails?.reg_fees}/-
                      </Typography>
                    </Button>} */}
                  {eventDetails?.gform &&
                    <Button onClick={handleButtonClick} sx={{
                      backgroundColor: 'red', height: '50px', width: '100%',
                      "&:hover": {
                        backgroundColor: "blue"
                      }
                    }}>
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '18px',
                        fontWeight: '700',
                      }} >
                        Register 
                      </Typography>
                    </Button>}
                </Stack>
              </Stack>
              <Divider orientation='vertical' />
              <Stack flex={7} p={3} gap={3}>
                <Stack p={1} justifyContent='center' alignItems='center'>
                  <Typography sx={{
                    fontFamily: 'Kelly Slab',
                    fontSize: '25px',
                    fontWeight: '700',
                    position: 'absolute'
                  }} >
                    {eventDetails?.title}
                  </Typography>
                </Stack>
                {(() => {
                  if (eventDetails?.prizeCount === 1) {
                    return <Stack p={1}>
                      <Stack sx={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05))',
                      }} borderRadius='5px' border='2px solid rgba(102, 89, 89, 0.3)' height='50px' justifyContent='center' alignItems='center' direction='row'>
                        <Stack p={2} justifyContent='space-between' alignItems='center' direction='row'>
                          <Box width='60px' component='img' src={medalfrist} />

                          <Typography sx={{
                            fontFamily: 'Kelly Slab',
                            fontSize: '18px',
                            fontWeight: '700',

                          }} >
                            {eventDetails?.first_price}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  } else if (eventDetails?.prizeCount === 2) {
                    return <Stack p={1}>
                      <Stack sx={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05))',
                      }} borderRadius='5px' border='2px solid rgba(102, 89, 89, 0.3)' height='50px' justifyContent='center' alignItems='center' direction='row'>
                        <Stack p={2} gap={8} justifyContent='space-between' alignItems='center' direction='row'>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='60px' component='img' src={medalfrist} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '18px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.first_price}
                            </Typography>
                          </Stack>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='60px' component='img' src={medalsecond} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '18px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.second_price}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  } else if (eventDetails?.prizeCount === 3) {
                    return <Stack p={1}>
                      <Stack sx={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05))',
                      }} borderRadius='5px' border='2px solid rgba(102, 89, 89, 0.3)' height='50px' justifyContent='center' alignItems='center' direction='row'>
                        <Stack p={2} gap={8} justifyContent='space-between' alignItems='center' direction='row'>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='60px' component='img' src={medalfrist} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '18px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.first_price}
                            </Typography>
                          </Stack>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='60px' component='img' src={medalsecond} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '18px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.second_price}
                            </Typography>
                          </Stack>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='35px' component='img' src={medalthird} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '18px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.third_price}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  } else {
                    return <Stack direction='row' justifyContent='center' alignItems='center'>

                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '18px',
                        fontWeight: '700',

                      }} >
                        There will be no prize!.
                      </Typography>
                    </Stack>
                  }
                })()}
                {/* <Stack>
                <Stack justifyContent='center' alignItems='center'>
                  <Box width='460px' component='img' src={medal1} />
                  <Typography sx={{
                    fontFamily: 'Kelly Slab',
                    fontSize: '15px',
                    fontWeight: '700',
                    position: 'absolute'
                  }} >
                    1500
                  </Typography>
                </Stack>
              </Stack> */}
                {/* <Stack p={1}>

              
                
              </Stack> */}
                {
                  eventDetails?.type &&

                  <Stack p={1} direction='row' gap={6}>
                    <Stack justifyContent='center' alignItems='center'>
                      <Box width='200px' component='img' src={register} />
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '14px',
                        fontWeight: '700',
                        position: 'absolute'
                      }} >
                        {eventDetails?.type}
                      </Typography>
                    </Stack>
                    <Stack justifyContent='center' alignItems='center'>
                      <Box width='200px' component='img' src={register} />
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '15px',
                        fontWeight: '700',
                        position: 'absolute'
                      }} >
                        {eventDetails?.mode}
                      </Typography>
                    </Stack>
                  </Stack>
                }
                <Stack direction='column'>
                  {eventDetails?.date &&
                    <Stack justifyContent='center' alignItems='center'>
                      <Box width='97%' component='img' src={date} />
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '15px',
                        fontWeight: '700',
                        position: 'absolute'
                      }} >
                        {eventDetails?.date} April 2023 | {eventDetails?.time}
                      </Typography>
                    </Stack>
                  }
                  <Stack p={1} mt={2} justifyContent='center' alignItems='center'>
                    <Typography sx={{
                      fontFamily: 'Kelly Slab',
                      fontSize: '14px',
                      fontWeight: '500',
                    }} >
                      {eventDetails?.desc}
                    </Typography>
                  </Stack>
                  {eventDetails?.rules && 
                  <Stack mb={1} ml={1}>
                    <Typography sx={{
                      fontFamily: 'Kelly Slab',
                      fontSize: '16px',
                      fontWeight: '500',
                    }} >
                      Rules and Regulations :
                    </Typography>
                  </Stack>
                    }
                    {eventDetails?.rules && 
                   
                  <Stack sx={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#999 #fff',
                  }} className='rules' p={1} direction='column' height='110px' overflow='auto'>
                    {eventDetails?.rules && eventDetails?.rules.map((rule, index) => (
                      <Stack key={index} direction='row' gap={1}>
                        <Stack>
                          *
                        </Stack>
                        <Stack>
                          <Typography sx={{
                            fontFamily: 'Kelly Slab',
                            fontSize: '14px',
                            fontWeight: '500',
                          }} >
                            {rule}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}

                  </Stack>
                  }
                </Stack>
              </Stack>
            </Stack>
            <Stack p={2} direction='column'>
              <Stack direction='row'>

                {eventDetails?.coordinator && eventDetails?.coordinator.map((coordinate, index) => (

                  <Stack key={index} flex={4} direction='column' justifyContent='center' alignItems='center'>
                    <Stack>
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '14px',
                        fontWeight: '500',
                      }} >
                        {coordinate}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
              <Stack direction='row'>
                {eventDetails?.contact_coordinator
                  && eventDetails?.contact_coordinator
                    .map((contact, index) => (

                      <Stack key={index} flex={4} direction='column' justifyContent='center' alignItems='center'>
                        <Stack>
                          <Typography sx={{
                            fontFamily: 'Kelly Slab',
                            fontSize: '14px',
                            fontWeight: '500',
                          }} >
                            {contact}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack gap={10} justifyContent='space-between' direction='row' flex={12} p={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          
              <Button onClick={() => navigate('/branch')} variant='contained' sx={{ height: '50px', width: '100px' ,bgcolor:'red'}}>
                <Typography sx={{
                  fontFamily: 'Kelly Slab',
                  fontSize: '14px',
                  fontWeight: '500',
                }} >
                  BACK
                </Typography>
              </Button>
          
           
              <Button onClick={() => navigate(`/branch/${params.event}`)} variant='contained' sx={{ height: '50px', width: '100px' ,bgcolor:'red'}}>
                <Typography sx={{
                  fontFamily: 'Kelly Slab',
                  fontSize: '14px',
                  fontWeight: '500',
                }} >
                  EVENTS
                </Typography>
              </Button>
            
          </Stack>

          {/* responsive */}
          <Stack sx={{ display: { xs: 'flex', sm: 'none' } }} gap={2} p={3} >
            <Stack direction='column' p={2} sx={{
              // backgroundColor: 'rgba(5, 5, 5)',
              position: 'relative',
              // backgroundImage: `url(${eventbg2})`,
              backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              width: '310px',
              border: '1px solid white',
              borderRadius: '5px'

            }}>
              <Stack justifyContent='center' alignItems='center'>
                <Typography sx={{
                  fontFamily: 'Kelly Slab',
                  fontSize: '20px',
                  fontWeight: '700',
                }} >
                  {eventDetails?.title}
                </Typography>
              </Stack>
              <Stack mt={2} borderRadius='8px'>
                <Box height='400px' width='100%' component='img' src={eventDetails?.posterImg} />
              </Stack>
              <Stack justifyContent='center' alignItems='center' mt={1} gap={2}>
                {/* {registered ?
                  <Button sx={{
                    backgroundColor: 'blue', height: '43px', width: '100%',
                    "&:hover": {
                      backgroundColor: { xs: 'blue', sm: "red" }
                    }
                  }}>
                    <Typography sx={{
                      fontFamily: 'Kelly Slab',
                      fontSize: '15px',
                      fontWeight: '700',
                      position: 'absolute'
                    }} >
                      Registered!
                    </Typography>
                  </Button>
                  :
                  <Button onClick={() => setOpen(true)} sx={{
                    backgroundColor: 'blue', height: '43px', width: '100%',
                    "&:hover": {
                      backgroundColor: "red"
                    }
                  }}>
                    <Typography sx={{
                      fontFamily: 'Kelly Slab',
                      fontSize: '15px',
                      fontWeight: '700',
                      position: 'absolute'
                    }} >
                      REGISTER {eventDetails?.reg_fees}/-
                    </Typography>
                  </Button>
                } */}
                {eventDetails?.gform &&
                  <Button onClick={handleButtonClick} sx={{
                    backgroundColor: 'red', height: '50px', width: '100%',
                    "&:hover": {
                      backgroundColor: { xs: 'red', sm: "blue" }
                    }
                  }}>
                    <Typography sx={{
                      fontFamily: 'Kelly Slab',
                      fontSize: '15px',
                      fontWeight: '700',
                    }} >
                    Register
                    </Typography>
                  </Button>}
              </Stack>
              {eventDetails?.date && <Stack mt={1} justifyContent='center' alignItems='center'>
                <Box width='100%' component='img' src={date} />
                <Typography sx={{
                  fontFamily: 'Kelly Slab',
                  fontSize: '11px',
                  fontWeight: '700',
                  position: 'absolute'
                }} >
                  {eventDetails?.date} April 2023 | {eventDetails?.time}
                </Typography>
              </Stack>}
              <Stack mt={1}>
                {/* <Box width='100%' component='img' src={prize} /> */}
                {(() => {
                  if (eventDetails?.prizeCount === 1) {
                    return <Stack p={1}>
                      <Stack sx={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05))',
                      }} borderRadius='5px' border='2px solid rgba(102, 89, 89, 0.3)' height='40px' justifyContent='center' alignItems='center' direction='row'>
                        <Stack p={2} justifyContent='space-between' alignItems='center' direction='row'>
                          <Box width='60px' component='img' src={medalfrist} />

                          <Typography sx={{
                            fontFamily: 'Kelly Slab',
                            fontSize: '18px',
                            fontWeight: '700',

                          }} >
                            {eventDetails?.first_price}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  } else if (eventDetails?.prizeCount === 2) {
                    return <Stack >
                      <Stack sx={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05))',
                      }} borderRadius='5px' border='2px solid rgba(116, 40, 40, 0.3)' height='40px' justifyContent='center' alignItems='center' direction='row'>
                        <Stack p={1} gap={8} justifyContent='space-between' alignItems='center' direction='row'>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='42px' component='img' src={medalfrist} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '14px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.first_price}
                            </Typography>
                          </Stack>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='40px' component='img' src={medalsecond} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '14px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.second_price}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  } else if (eventDetails?.prizeCount === 3) {
                    return <Stack >
                      <Stack sx={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.05))',
                      }} borderRadius='5px' border='2px solid rgba(102, 89, 89, 0.3)' height='50px' justifyContent='center' alignItems='center' direction='row'>
                        <Stack p={2} gap={4} justifyContent='space-between' alignItems='center' direction='row'>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='38px' component='img' src={medalfrist} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '14px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.first_price}
                            </Typography>
                          </Stack>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='35px' component='img' src={medalsecond} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '14px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.second_price}
                            </Typography>
                          </Stack>
                          <Stack direction='row' justifyContent='center' alignItems='center'>
                            <Box width='22px' component='img' src={medalthird} />

                            <Typography sx={{
                              fontFamily: 'Kelly Slab',
                              fontSize: '14px',
                              fontWeight: '700',

                            }} >
                              {eventDetails?.third_price}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  } else {
                    return <Stack direction='row' justifyContent='center' alignItems='center'>

                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '18px',
                        fontWeight: '700',

                      }} >
                        There will be no prize!.
                      </Typography>
                    </Stack>
                  }
                })()}
              </Stack>
              <Stack direction='row' gap={5}>
                <Stack mt={1} justifyContent='center' alignItems='center'>
                  <Box width='118px' component='img' src={register} />
                  <Typography sx={{
                    fontFamily: 'Kelly Slab',
                    fontSize: '13px',
                    fontWeight: '700',
                    position: 'absolute'
                  }} >
                    {eventDetails?.type}
                  </Typography>
                </Stack>
                <Stack mt={1} justifyContent='center' alignItems='center'>
                  <Box width='118px' component='img' src={register} />
                  <Typography sx={{
                    fontFamily: 'Kelly Slab',
                    fontSize: '13px',
                    fontWeight: '700',
                    position: 'absolute'
                  }} >
                    {eventDetails?.mode}
                  </Typography>
                </Stack>
              </Stack>
              <Stack p={1} justifyContent='center' alignItems='center'>
                <Typography sx={{
                  fontFamily: 'Kelly Slab',
                  fontSize: '14px',
                  fontWeight: '500',
                }} >
                  {eventDetails?.desc}
                </Typography>
              </Stack>
              <Stack mt={2} p={1} direction='column'>
                <Stack mb={1}>
                  <Typography sx={{
                    fontFamily: 'Kelly Slab',
                    fontSize: '16px',
                    fontWeight: '500',
                  }} >
                    Rules and Regulations :
                  </Typography>
                </Stack>
                {eventDetails?.rules && eventDetails?.rules.map((rule, index) => (
                  <Stack direction='row' gap={1}>
                    <Stack>
                      *
                    </Stack>
                    <Stack>
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '14px',
                        fontWeight: '500',
                      }} >

                        {rule}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
              <Stack p={2} direction='row'>
                <Stack flex={6} direction='column'>
                  {eventDetails?.coordinator && eventDetails?.coordinator.map((coordinate, index) => (
                    <Stack key={index}>
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '14px',
                        fontWeight: '500',
                      }} >
                        {coordinate}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack flex={6} direction='column' justifyContent='center' alignItems='center'>
                  {eventDetails?.contact_coordinator && eventDetails?.contact_coordinator.map((contact, index) => (

                    <Stack key={index}>
                      <Typography sx={{
                        fontFamily: 'Kelly Slab',
                        fontSize: '14px',
                        fontWeight: '500',
                      }} >
                        {contact}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>


      </Stack>
      <Connect />
      <Footer />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 300, sm: 400 },
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            borderRadius: '10px',
            p: 4,
          }}>
            <Stack direction='column'>
              <Stack justifyContent='center' alignItems='center'>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Do you want to register ?
                </Typography>
              </Stack>
              <Stack p={2} gap={3} direction='row' justifyContent='center' alignItems='center'>
                <Button onClick={handleClose} variant='contained' sx={{ bgcolor: 'gray' }}>No</Button>
                <Button onClick={() => { eventRegister(); handleClose() }} variant='contained'>Yes</Button>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Stack>
  )
}

export default SingleEvent



