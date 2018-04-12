//alive.js
const assert = require('assert');
const request = require('supertest');
const express = require('express');
const app = express();



app.get('/alive', function(req, res) {
  res.status(200).json({testMessage: 'This is very important Message!!!!' });
});//res status code 200 and json object testMessage


describe('GET /alive', function() {
  it('respond with json', function() {
    return request(app)
      .get('/alive')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)//make sure content type is json that we get
      .expect(200)
      .then(response =>{
        assert(response.body.testMessage);//assert testMessage
      })
  });
});

//app.listen(5000,console.log("app is on!!"));//tesing on port 5000
