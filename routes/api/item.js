const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

//Item model
const Item = require('../../model/item')

// @route Get api/items
// @desc  Get all items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({
            date: -1
        })
        .then(item => res.json(item))
})

// @route Post api/items
// @desc  Add items
// @access Private
router.post('/', auth, (req, res) => {
    const {
        name
    } = req.body

    const newItem = new Item({
        name
    })

    newItem.save().then(item => res.json(item))
})

// @route Delete api/items/:id
// @desc  Delete items
// @access Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.Id)
        .then(item => item.remove().then(() => res.json({
            success: true
        })))
        .catch(err => res.status(404).json({
            success: false
        }))
})

module.exports = router