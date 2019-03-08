const request = require('supertest');
const server = require('./server.js');
const db = require('./data/dbConfig.js');

describe('The server', () => {

    describe('Get requests', () => {
        it('responds with status code 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        it('uses json data type', async () => {
            const data = await request(server).get('/');
            expect(response.type).toMatch('/application/json');
        });

        it('returns correct response message', () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({message: "Running!"})
        });
    });






});

