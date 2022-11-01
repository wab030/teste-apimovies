const supertest = require('supertest');
const app = require('../index');

const api = '/api/filmes/';
const movie = {
  name: 'Marighella',
  director: 'Wagner Moura',
  link: 'https://br.web.img3.acsta.net/pictures/19/02/07/09/37/4344204.jpg'
};

describe('movie', () => {
  beforeEach(() => {
    jest.setTimeout(60000);
    // p = new SUT.PlaywrightFluent();
  });

  describe('post movie route', () => {
    describe('post a valid movie', () => {
      it('should return a 200', async () => {
        const { statusCode, body } = await supertest(app).post(api).send(movie);
        expect(statusCode).toBe(200);
        console.log('[Body]',body);
        expect(body).toEqual({
          "acknowledged": true,
          "insertedId": expect.any(String)
        });
      })
    });
  });

  describe('given the movie exist', () => {
        it('should return a 200', async () => {
          await supertest(app).delete(`${api}/634ddaba86c776c804b70457`).expect(200);
          // expect(true).toBe(true);
        })
      });


  describe('get movie route', () => {
    describe('get all movies', () => {
      it('should return a 200', async () => {
        await supertest(app).get(api).expect(200);
        // expect(true).toBe(true);
      });
    });
    // describe('given the movie does not exist', () => {
    //   it('should return a 404', async () => {
    //     await supertest(app).get(`${api}/222`).expect(404);
    //     // expect(true).toBe(true);
    //   })
    // });
  });
});