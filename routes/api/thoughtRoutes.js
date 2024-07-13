// Importing express and necessary connections and routes
const express = require('express');
const router = require('express').Router();
const db = require('../../config/connection');
const { Thought, User } = require('../../models');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// THOUGHT ROUTES

// Route to create a new thought
router.post('/', async (req, res) => {
        try {
        const newThought = new Thought({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        });
        
        await newThought.save();

        const updatedUser = await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: newThought._id } },
            { new: true }
        );

        if (updatedUser) {
            res.status(200).json(newThought);
        } else {
            console.log('Error!!');
            res.status(500).json({ error: 'We have a problem!' })
        }} catch (err) {
            console.log('Error!!');
            res.status(500).json({ error: 'We have a problem!' })
        }
    });

// Route to get all thoughts
router.get('/', async (req, res) => {
    try{
        const result = await Thought.find({});
        res.status(200).json(result);
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!' })
    }
});

// Route to get a single thought by ID
router.get('/:id', async (req, res) => {
    try{
        const result = await Thought.find({
            _id: req.params.id
        });
        res.status(200).json(result);
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!' })
    }
});

// Route to update a thought by ID
router.put('/:id', async (req, res) => {
    try{
        const result = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { thoughtText: req.body.thoughtText, username: req.body.username},
            { new: true }
        );
        res.status(200).json(result);
        console.log('Thought has been updated')
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!' })
    }
});

//Route to delete a thought by ID
router.delete('/:id', async (req, res) => {
    try{
        const result = await Thought.findOneAndDelete({ 
            _id: req.params.id
        });
        res.status(200).json(result);
        console.log('Thought has been deleted');
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!' })
    }
})

// REACTION ROUTES

// Route to add a reaction to a post
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const result = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { 
                reactions: {
                    reactionBody: req.body.reactionBody,
                    username: req.body.username
                }
            }},
            { new: true }
        );
        res.status(200).json(result);
        console.log('Reaction added')
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!' })
    }
});

// Route to delete a reaction by ID
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const result = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );
        res.status(200).json(result);
        console.log('Reaction deleted')
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!' })
    }
});


module.exports = router;