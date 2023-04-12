import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import datas from '../datas'

const Events = ({ user }) => {

    const [eventName, setEventName] = useState([])

    const event = [
        {
            eventName: 'Hackathon'
        },
        {
            eventName: 'keyboard'
        },
        {
            eventName: 'web design'
        },
        {
            eventName: 'web dev'
        },
        {
            eventName: 'coding'
        },
    ]

    const students = [
        {
            studentName: 'Hackathon',
            college: 'ccet',
            email: 'abhjgh@gamail.com',
            mobNo: '7988766565'
        },
        {
            studentName: 'keyboard',
            college: 'ccet',
            email: 'abhjgh@gamail.com',
            mobNo: '7988766565'

        },
        {
            studentName: 'web design',
            college: 'ccet',
            email: 'abhjgh@gamail.com',
            mobNo: '7988766565'
        },
        {
            studentName: 'web dev',
            college: 'ccet',
            email: 'abhjgh@gamail.com',
            mobNo: '7988766565'
        },
        {
            studentName: 'coding',
            college: 'ccet',
            email: 'abhjgh@gamail.com',
            mobNo: '7988766565'
        },
    ]

    useEffect(() => {
        if (user.adminDep === 'cse') {
            setEventName(datas.cse)
        }
    }, [user])

    useEffect(() => {
        if (user.adminDep === 'eee') {
            setEventName(datas.eee)
        }
    }, [user])

    useEffect(() => {
        if (user.adminDep === 'mech') {
            setEventName(datas.mech)
        }
    }, [user])

    useEffect(() => {
        if (user.adminDep === 'civil') {
            setEventName(datas.civil)
        }
    }, [user])

    useEffect(() => {
        if (user.adminDep === 'bsc') {
            setEventName(datas.bsc)
        }
    }, [user])

    return (
        <Stack p={2} direction='column' gap={2}>
            <Stack>
                <Typography
                    fontSize='25px'
                    fontFamily='killi sla'
                >Events :</Typography>
            </Stack>
            <Stack direction='row' gap={2} >
                {eventName && eventName.map((item, index) => (
                    <Button key={index} sx={{
                        border: '1px solid red',
                        color: 'white'
                    }}>{item.name}</Button>
                ))}
            </Stack>
            <Stack direction='column' mt={5}>
                {students && students.map((student, index) => (

                    <Stack direction='row' gap={10} >
                        <Stack alignItems='center' justifyContent='center'>
                            <Typography
                                fontSize='25px'
                                fontFamily='killi sla'
                            >{index + 1}</Typography>
                        </Stack>
                        <Stack alignItems='center' justifyContent='center'>
                            <Typography
                                fontSize='25px'
                                fontFamily='killi sla'
                            >{student.studentName}</Typography>
                        </Stack>
                        <Stack alignItems='center' justifyContent='center'>
                            <Typography
                                fontSize='25px'
                                fontFamily='killi sla'
                            >{student.email}</Typography>
                        </Stack>
                        <Stack alignItems='center' justifyContent='center'>
                            <Typography
                                fontSize='25px'
                                fontFamily='killi sla'
                            >{student.college}</Typography>
                        </Stack>
                        <Stack alignItems='center' justifyContent='center'>
                            <Typography
                                fontSize='25px'
                                fontFamily='killi sla'
                            >{student.mobNo}</Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>

        </Stack >
    )
}

export default Events