import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

import { matches, teams, users } from './mocks';

import { Response } from 'superagent';
import { sign } from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Roda testes sobre a rota get /matches ', () => {
  let chaiHttpResponse: Response;

  it('Retorna todos os jogos ao bater na rota.', async () => {
    const matchesWithTeamNames = matches.map((match) => {
      return {
        ...match,
        homeTeam: {
          teamName: teams.find((team) => team.id === match.homeTeamId)?.teamName
        },
        awayTeam: {
          teamName: teams.find((team) => team.id === match.awayTeamId)?.teamName
        }
      };
    });

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql(matchesWithTeamNames);
  });

  it('Retorna todos os jogos com filtro.', async () => {
    const allMatched = matches.map((match) => {
      return {
        ...match,
        homeTeam: {
          teamName: teams.find((team) => team.id === match.homeTeamId)?.teamName
        },
        awayTeam: {
          teamName: teams.find((team) => team.id === match.awayTeamId)?.teamName
        }
      };
    });

    const matchesInProgress = allMatched.filter((match) => match.inProgress);
    const matchesFinished = allMatched.filter((match) => !match.inProgress);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({
        inProgress: true,
      });

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql(matchesInProgress);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({
        inProgress: false,
      });

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql(matchesFinished);
  });

  it('Finaliza um jogo ao bater na rota com o id e token especificados.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish');

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Token not found' });

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('authorization', '123456');

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Token must be a valid token' });

    sinon.stub(Matches, 'update');

    const token = sign(JSON.stringify(users[0]), process.env.JWT_SECRET || 'secret');

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Finished' });

    (Matches.update as sinon.SinonStub).restore();
  });

  it('Altera os goals de um jogo ao bater na rota com o id e token especificados.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1');

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Token not found' });

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .set('authorization', '123456');

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Token must be a valid token' });

    sinon.stub(Matches, 'update');

    const token = sign(JSON.stringify(users[0]), process.env.JWT_SECRET || 'secret');

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .set('authorization', token)
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1
      });

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Updated' });

    (Matches.update as sinon.SinonStub).restore();
  });

  it('Cria um jogo ao bater na rota com o token e body especificados.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches');

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Token not found' });

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', '123456');

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'Token must be a valid token' });

    sinon.stub(Matches, 'create').resolves({
      id: 49,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 8,
      awayTeamGoals: 2,
      inProgress: true,
    } as Matches);

    const token = sign(JSON.stringify(users[0]), process.env.JWT_SECRET || 'secret');

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send({
        homeTeamId: 1,
        awayTeamId: 1,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(chaiHttpResponse.status).to.be.eq(422);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'It is not possible to create a match with two equal teams' });

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send({
        homeTeamId: 1,
        awayTeamId: 50,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(chaiHttpResponse.status).to.be.eq(404);
    expect(chaiHttpResponse.body).to.be.eql({ message: 'There is no team with such id!' });

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send({
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(chaiHttpResponse.status).to.be.eq(201);
    expect(chaiHttpResponse.body).to.be.eql({
      id: 49,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 8,
      awayTeamGoals: 2,
      inProgress: true,
    });

    (Matches.create as sinon.SinonStub).restore();
  });
});