const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Ensure the correct path to your server file
const should = chai.should();

chai.use(chaiHttp);

describe('Photos', () => {
    // No need to start the server again
    it('should list ALL photos on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});
