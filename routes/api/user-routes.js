const router = require('express').Router();
const { response } = require('express');
const User = require('../../models/user');

router.get('/', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/', async (req, res) => {
    const data = new User({
        name: req.body.name,
        email: req.body.email
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});


router.get('/:id', async (req, res) => {
    const user_id = req.params.id;
    const user = await User.findById(user_id).exec();
    res.status(200).json(user);
})
module.exports = router;