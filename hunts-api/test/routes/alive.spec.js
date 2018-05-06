//alive.js
const assert = require('assert');
const request = require('supertest');
const app = require('../../app.js');

describe('GET /alive', function() {
  it('respond with json', function() {
    return request(app)
      .get('/alive')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)//make sure content type is json that we get
      .expect(200)
      .then(response =>{
        assert.strictEqual(200, response.statusCode);
      })
  });
});

//app.listen(5000,console.log("app is on!!"));//tesing on port 5000
