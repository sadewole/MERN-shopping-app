const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Item model
const User = require('../../model/user')

// route POST api/users
// @desc POST new user
// @access public
router.post('/', (req, res) => {
    const {
        name,
        email,
        password
    } = req.body

    // Simple validation
    if (!name || !email || !password) {
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
                msg: 'User already exists'
            })

            const newUser = new User({
                name,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
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
        })
})

module.exports = router