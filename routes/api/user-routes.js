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
});

router.put('/:id', async (req, res) => {
    const user_id = req.params.id;
    const username = req.body.name;

    result = await User.findByIdAndUpdate(user_id, {$set:{ name:username}}, {returnDocument: 'after'} )
    res.status(200).json(result);
});

router.delete('/:id', async (req, res) => {
    const user_id = req.params.id;
    result = await User.findByIdAndDelete(user_id)
    res.status(200).json(result);
});

router.post('/:userId/friends/:friendId', async (req, res) => {
        try {
        const user_id = req.params.userId;
        const user = await User.findById(user_id).exec();
        user.friends.push(req.params.friendId);
        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user_id = req.params.userId;
        const user = await User.findById(user_id).exec();
        const index = user.friends.indexOf(req.params.friendId);
        user.friends.splice(index, 1);
        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = router;