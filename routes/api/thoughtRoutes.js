const express = require('express');
const router = require('express').Router();
const db = require('../../config/connection');
const { Thought } = require('../../models');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// router.post('/', async (req, res) => {
//     try{
        
//     }
// })





module.exports = router;