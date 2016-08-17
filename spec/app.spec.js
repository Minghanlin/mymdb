require('../app');
var request = require("request");
var base_url = "https://localhost:5000/";
describe("Express Server", function() {

  DESCRIBE("GET /", function() {
    it("returns status code 200", function(done) {
      request.get( base_url,
      function(err, response, body) {
        expect( response.statusCode ).toBe(200);
      }
    );
  });
});
});
