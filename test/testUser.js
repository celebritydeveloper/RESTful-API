const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const app = require('../app');

const users = require('../routes/auth');

chai.use('chaiHttp');

describe('users', function () {
  this.timeout(100000);
  context('POST /users', function () {
    beforeEach(function (done) {
      users.delete;
      done();
    });
    it('should register & authenticate a user if provided sufficient details', function (done) {
      chai
        .request(app)
        .post('/users')
        .send({
          firstName: 'foo',
          lastName: 'bar',
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data.user.firstName).to.be.equal('foo');
          expect(res.body.data.user.lastName).to.be.equal('bar');
          expect(res.body.data.user.email).to.be.equal('foo@bar.com');
          expect(res.body.data.user.id).to.be.a('string');
          done(err);
        });
    });
  });
});