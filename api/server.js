const express = require('express');
const server = express();
const games = require('../games/gamesModel.js');

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({message: "Running!"});
});

server.get('/games', async (req,res) => {
    const allGamesData = await games.getAll() ? await games.getAll() : [];
     try { 
        res.status(200).json(allGamesData);
    }
    catch(error) {
        res.status(500).json({error:error});
    }
 });

server.post('/games', (req, res) => {
    const game = req.body;
    if (game.title && game.genre) {
        games.insert(game)
        .then(ids => {
            res.status(201).json({ids})
        })
        .catch(err => {
            res.status(500).json({error: 'error'})
        })
    } else {
        res.status(422).json({error: 'please provide game title and genre'})
    }
});

module.exports = server;


