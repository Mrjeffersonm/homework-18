const router = require('express').Router();
const { response } = require('express');
const Thought = require('../../models/thoughts');
const User = require('../../models/user');
const Reaction = require('../../models/reactions');
const thoughts = require('../../models/thoughts');

router.get('/', async (req, res) => {
    try {
        const data = await Thought.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/', async (req, res) => {
    const data = new Thought({
        thoughtText: req.body.thought,
        username: req.body.name,
    })

    try {
        const dataToSave = await data.save();
        const user_id = req.body.userId;
        const user = await User.findById(user_id).exec();
        user.thoughts.push(data._id);
        await user.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

});


router.get('/:id', async (req, res) => {
    const thought_id = req.params.id;
    const thought = await Thought.findById(thought_id).exec();
    res.status(200).json(thought);
});

router.delete('/:id', async (req, res) => {
    const thought_id = req.params.id;
    result = await Thought.findByIdAndDelete(thought_id)
    if (!result) {
        res.status(400).json({ message: "Thought does not exist" });
        return; 
    };
    const user = await User.findOne({name: result.username}).exec();
    if (user !== null) {
        const index = user.thoughts.indexOf(result._id);
        user.thoughts.splice(index, 1)
        await user.save();
    }
    res.status(200).json(result);
});

router.put('/:id', async (req, res) => {
    const thought_id = req.params.id;
    const thought = req.body.thought;

    result = await Thought.findByIdAndUpdate(thought_id, {$set:{ thoughtText:thought}}, {returnDocument: 'after'} )
    res.status(200).json(result);
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought_id = req.params.thoughtId;
        const thought = await Thought.findById(thought_id).exec();
        thought.reactions.push({
            reactionBody: req.body.reaction,
            username: req.body.name
        });
        await thought.save();
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    function findReaction(thought, reactionId) {
        for(index = 0; index < thought.reactions.length; index++) {
            if (thought.reactions[index].reactionId == reactionId) {
                return thought.reactions[index];
            }
        }
        return null;
    };
    try {
        const thought_id = req.params.thoughtId;
        const thought = await Thought.findById(thought_id).exec();
        const reaction = findReaction(thought, req.params.reactionId)
        reaction.remove();
        console.log(reaction);
        await thought.save();
        res.status(200).json(thought);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    };
});

module.exports = router;