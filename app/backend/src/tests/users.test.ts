import * as sinon from 'sinon';
import * as chai from 'chai';
import { sign } from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { users } from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Roda testes sobre a rota /login', () => {
  let chaiHttpResponse: Response;

  it('Valida se o email e password sao validos.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: '123',
      });

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'All fields must be filled' });

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: '123@123.com',
      });

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'All fields must be filled' });

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'exemplo@exemplo',
        password: '123456',
      });

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Invalid email or password' });

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'exemplo@exemplo.com',
        password: '12345',
      });

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Invalid email or password' });

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'exemplo@exemplo.com',
        password: '123456',
      });

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Invalid email or password' });

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: '123456',
      });

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Invalid email or password' });
  });

  it('Valida se o usuario é valido na rota post', async () => {
    sinon.stub(Users, "findOne").resolves(users[0] as Users);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.eq(200);

    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Valida se o token na rota "/login/role" é valido.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role');

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Token not found' });

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', '123456');

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Token must be a valid token' });
  });

  it('Retorna a role de um usuario com um token valido na rota "/login/role".', async () => {
    const token = sign(JSON.stringify(users[0]), process.env.JWT_SECRET || 'secret');

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql({ role: 'admin' });
  });
});
