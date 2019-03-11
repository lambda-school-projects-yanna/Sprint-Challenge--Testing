const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('The server', () => {

    afterEach( async () => {
        await db('games').truncate()
    });

    test('server returns correct response message', async () => {
        const response = await request(server).get('/');
        expect(response.body).toEqual({message: "Running!"})
    });

    describe('GET games requests', () => {

        afterEach( async () => {
            await db('games').truncate()
        });    

        it('responds with status code 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });

        it('uses json data type', async () => {
            const data = await request(server).get('/games');
            expect(data.type).toMatch('application/json');
        });

        it('always returns an array', async () => {
            const response = await request(server).get('/games');
            expect(response.body).toEqual([]);
        });
    });

    describe('POST games requests', () => {

        afterEach( async () => {
            await db('games').truncate()
        });    

        test('responds with 201 when res.body is correct', async () => {
            const game = {
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: '1980'
            };
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(201);
        });
        
        test('responds with 422 when res.body is missing fields', async () => {
            const game = {
                title: 'Pacman',
            };
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(422);
        });

        test('it uses json data type', async () => {
            const game = {
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: '1980'
            };
            const data = await request(server).post('/games').send(game);
            expect(data.type).toMatch('application/json');
        });
    });

});

