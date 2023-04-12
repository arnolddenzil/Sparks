const Admin = require("../Models/Admin");
const Event = require("../Models/Event");
const User = require("../Models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const auth = require("../libs/auth");

const router = require("express").Router();

router.get('/get', (req, res) => {
    res.status(200).json({
        status: 'success',
        error: false,
        message: 'This API is working properly'
    })
})

//API to create user with all details

router.post('/createUser', async (req, res) => {
    let { username, email, password, mobileNo, college, branch, semester } = req.body
    console.log(email, password)

    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({
            status: 'false',
            error: 'User already exists',
        });
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
        User.create({
            username,
            email,
            password: hash,
            mobileNo,
            college,
            branch,
            semester

        }).then(() => {
            res.status(200).json({
                status: 'success',
                message: "successfull",
            })
            console.log("Registered successfully");
        }).catch((err) => {
            return res.status(400).json({
                status: 'error',
                error: err,
            });
        })
    });
})

//API to register a Event;
router.post('/eventRegister', async (req, res) => {
    let { registeredBy, eventName, eventDep } = req.body
    console.log(req.body)
    try {
        const existingEvents = await Event.findOne({ eventName, registeredBy })
        if (existingEvents) {
            return res.status(500).json({
                status: 'failed',
                error: true,
                messgae: "You're already registered for the event!"
            })
        } else {
            const event = new Event({ registeredBy, eventName, eventDep });
            await event.save();
            return res.status(201).json({
                status: 'success',
                error: false,
                message: 'Registered successfully!'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            error: true,
            error: 'Error registering event'
        });
    }
})

//API to get events on the basis of department
router.get('/getEvents', async (req, res) => {
    let { eventDep } = req.query

    try {
        const regUsers = await Event.find({ eventDep })
        const regUsersCount = await Event.count({ eventDep })
        console.log(regUsersCount)

        return res.status(200).json({
            status: "success",
            error: false,
            data: {
                users: regUsers,
                usersCount: regUsersCount
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: true,
            messgae: "Error in fetching datas"
        })
    }
})

//API to get events on the basis of department & eventName
router.get('/getEventUsers', async (req, res) => {
    let { eventDep, eventName } = req.query
    try {
        const regUsers = await Event.find({ eventDep, eventName }).populate('registeredBy', 'username email mobileNo')
        const regUsersCount = await Event.count({ eventDep, eventName })
        console.log(regUsersCount)

        return res.status(200).json({
            status: "success",
            error: false,
            data: {
                users: regUsers,
                usersCount: regUsersCount
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: true,
            messgae: "Error in fetching datas"
        })
    }
})

//API to check whether the user has registered the respective or not?
router.post('/isRegistereEvent', async (req, res) => {
    let { eventName, registeredBy } = req.body
    try {
        const isRegistered = await Event.findOne({ eventName, registeredBy })
        if (isRegistered) {
            return res.status(200).json({
                resCode: 204,
                status: "success",
                error: false,
                message: `You've already registered for ${eventName}`
            })

        }
        return res.status(200).json({
            resCode: 203,
            status: "success",
            error: false,
            message: "Not registered yet!"
        })
    } catch (err) {
        return res.status(500).json({
            status: 'success',
            error: true,
            message: 'something went wrong!'
        })
    }
})

//ADMIN signup
router.post('/createAdmin', async (req, res) => {
    let { username, password, adminDep } = req.body;
    console.log(req.body)
    console.log('hi')
    let admin = await Admin.findOne({ username })
    if (admin) {
        return res.status(400).json({
            status: 'false',
            error: 'Admin already exists',
        });
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
        Admin.create({
            username,
            password: hash,
            adminDep
        }).then(() => {
            res.status(200).json({
                status: 'success',
                message: "successfull",
            })
            console.log("Registered successfully");
        }).catch((err) => {
            return res.status(400).json({
                status: 'error',
                error: err,
            });
        })
    });
})

//API to login admin
router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    console.log(req.body)
    let admin = await Admin.findOne({ username: username })
    console.log('hi', admin)
    if (admin) {
        bcrypt.compare(password, admin.password, function (err, result) {
            if (result) {
                console.log(result)
                var access_token = jwt.sign({ userId: admin._id, username: username }, 'sparkz', { expiresIn: "1h" });
                res.cookie('access_Token', access_token, {
                    httpOnly: true
                }); username
                const { password, ...adminInfo } = admin._doc
                res.status(200).json({
                    statusCode: 200,
                    status: "success",
                    message: "Logged in successfully!",
                    data: adminInfo,
                    accessToken: access_token,
                })
                if (err) {
                    return res.status(500).json({
                        statusCode: 500,
                        status: 'failed',
                        error: true
                    })
                }
            }
        })
    }
});

//GET ADMIN DETAILS
router.get('/getAdminDetails', auth.isLoggedIn, async (req, res) => {
    console.log(req.admin)
    const admin = await Admin.find({ username: req.admin.username })

    return res.status(200).json({
        status: "success",
        data: req.admin
    })
})

//API to check user has logged in early
router.post('/isLogged', async (req, res) => {
    let { email } = req.body
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        return res.status(500).json({
            statusCode: 500,
            status: "failed",
            error: false,
            message: "You're not registered yet"
        })
    }

    return res.status(200).json({
        statusCode: 200,
        status: "success",
        error: false,
        message: "You're already registered user!"
    })
})

//API to login a user with email and password
// router.post('/userLogin', async (req, res) => {
//     let { email, password } = req.body;
//     console.log(req.body)
//     let user = await User.find({ email: email })
//     console.log(user)
//     if (user) {
//         bcrypt.compare(password, user.password, function (err, result) {
//             if (result) {
//                 console.log(result)
//                 var access_token = jwt.sign({ userId: user._id, email: email }, 'sparkz', { expiresIn: "1h" });
//                 res.cookie('access_Token', access_token, {
//                     httpOnly: true
//                 });
//                 const { password, ...userInfo } = user._doc
//                 console.log(userInfo, access_token)
//                 return res.status(200).json({
//                     statusCode: 200,
//                     status: "success",
//                     message: "Logged in successfully!",
//                     data: userInfo,
//                     accessToken: access_token,
//                 })
//                 if (err) {
//                     return res.status(500).json({
//                         statusCode: 500,
//                         status: 'failed',
//                         error: true
//                     })
//                 }
//             }
//         })
//     }
// });

//
router.post('/loginUser', async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email })
    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                console.log('result', result)
                var access_token = jwt.sign({ userId: user._id, email: email }, 'sparkz', { expiresIn: "1h" });
                res.cookie('access_Token', access_token, {
                    httpOnly: true
                });
                const { password, ...userInfo } = user._doc
                console.log(userInfo, access_token)
                return res.status(200).json({
                    statusCode: 200,
                    status: "success",
                    message: "Logged in successfully!",
                    data: userInfo,
                    accessToken: access_token,
                })
            } else {
                console.log(err)
                return res.status(200).json({
                    statusCode: 200,
                    status: "failed",
                    message: "Password missmatch",
                })
            }
        })

    } else {
        return res.status(200).json({
            status: "failed",
            error: true,
            message:'Account not found!'
        })
    }

})

//API to get user details
router.post('/getUser', async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    console.log(user)

    if (!user) {
        return res.status(403).json({
            status: "false",
            error: 'user not found'
        })
    }

    const { password, ...userInfo } = user._doc
    return res.status(200).json({
        status: "success",
        data: userInfo
    })

})

module.exports = router; 
