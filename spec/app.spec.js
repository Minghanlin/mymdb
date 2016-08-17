var app = require('../app');
// var request = require("request");
// var base_url = "https://localhost:5000/";
// describe("Express Server", function() {
//
//   DESCRIBE("GET /", function() {
//     it("returns status code 200", function(done) {
//       request.get( 'https://localhost:5000/movies',
//       function(err, response, body) {
//         expect( response.statusCode ).toBe(200);
//       }
//     );
//   });
// });
// });

var supertest = require('supertest');

describe("Express Server API", function() {
  it("returns status code 200", function(done) {
    supertest(app)
    .get('/movies')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

});
