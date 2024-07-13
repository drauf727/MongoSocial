// Importing express and necessary connections and routes
const express = require('express');
const router = require('express').Router();
const db = require('../../config/connection');
const { User } = require('../../models');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// USER ROUTES

// Route to create a new user
router.post('/', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
     });
     newUser.save();
    if (newUser) {
        res.status(201).json(newUser);
    } else {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!'})
    }
});

// Route to view all users
router.get('/', async (req, res) => {
    try{
        const result = await User.find({});
        res.status(200).json(result);
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!'})
    }
}
);

// Route to view a specific user by ID
router.get('/:id', async (req, res) => {
    try{
        const result = await User.find({
            _id: req.params.id
        });
        res.status(200).json(result);
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!'})
    }
});

// Route to update a user by ID
router.put('/:id', async (req, res) => {
    try{
        const result = await User.findOneAndUpdate(
            { _id: req.params.id },
            { username: req.body.username, email: req.body.email},
            { new: true }
        );
        res.status(200).json(result);
        console.log(`User has been updated`)
    } catch (err){
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!'})
    }
});

// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
    try{
        const result = await User.findOneAndDelete({
            _id: req.params.id
        });
        res.status(200).json(result);
        console.log('User has been deleted');
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!'})
    }
});

// FRIEND ROUTES

// Route to add a friend to a user
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { new: true }
    );
    res.status(200).json(result);
    console.log('Friend added')
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!'})
    }
});

//Route to delete a friend from a user
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const result = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId  } },
            { new: true} 
        );
        res.status(200).json(result);
        console.log('Friend deleted')
    } catch (err) {
        console.log('Error!!');
        res.status(500).json({ error: 'We have a problem!'})
    }
})

module.exports = router;