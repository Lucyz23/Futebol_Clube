import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { teams } from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Roda testes sobre a rota get /teams', () => {
  let chaiHttpResponse: Response;

  it('Retorna todos os times ao bater na rota get "/teams".', async () => {
    sinon.stub(Teams, "findAll").resolves(teams as Teams[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql(teams);

    (Teams.findAll as sinon.SinonStub).restore();
  });

  it('Retorna o time com o id especificado ao bater na rota get "/teams/:id".', async () => {
    sinon.stub(Teams, "findOne").resolves(teams[4] as Teams);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/5');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql(teams[4]);

    (Teams.findOne as sinon.SinonStub).restore();
  });
});
