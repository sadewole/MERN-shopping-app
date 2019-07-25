const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

//Item model
const User = require('../../model/user')

// route POST api/v1/auth
// @desc POST auth
// @access public
router.post('/', (req, res) => {
    const {
        email,
        password
    } = req.body

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({
            msg: 'Please enter fields'
        })
    }

    //Check existing user
    User.findOne({
            email
        })
        .then(user => {
            if (user) return res.status(400).json({
                msg: 'User does not exist'
            })

            // validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({
                        msg: 'Invalid credentials'
                    })

                    jwt.sign({
                            id: user.id
                        },
                        process.env.jwtSecret, {
                            expiresIn: 3600
                        },
                        (err, token) => {
                            if (err) throw err
                            res.status(201).json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                },
                                token
                            })
                        }
                    )
                })


        })
})

// route Get api/v1/auth/user
// @desc Get auth
// @access private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router