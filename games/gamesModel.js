const db = require('../data/dbConfig.js');

 async function insert(game) {
   return db('games').insert(game);
};

 async function getAll() {
   return db('games');
};

module.exports = {
   insert, getAll
};