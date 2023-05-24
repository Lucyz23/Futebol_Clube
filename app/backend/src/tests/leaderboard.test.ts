import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';

import { matches, teams } from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

interface PerformanceBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

const teamVictories = (team: TeamsModel, matches: MatchesModel[]) => matches.filter((tm) => {
  const isHome = tm.homeTeamId === team.id;

  if (isHome) return tm.homeTeamGoals > tm.awayTeamGoals;

  return tm.homeTeamGoals < tm.awayTeamGoals;
});

const teamDraw = (matches: MatchesModel[]) =>
  matches.filter((tm) => tm.homeTeamGoals === tm.awayTeamGoals);

const teamLosses = (team: TeamsModel, matches: MatchesModel[]) => matches.filter((tm) => {
  const isHome = tm.homeTeamId === team.id;

  if (isHome) return tm.homeTeamGoals < tm.awayTeamGoals;

  return tm.homeTeamGoals > tm.awayTeamGoals;
});

const totalPoints = (victories: MatchesModel[], losses: MatchesModel[]) =>
  (victories.length * 3) + (losses.length * 1);

const goalsFavor = (team: TeamsModel, matches: MatchesModel[]) => matches.reduce((acc, tm) => {
  const isHome = tm.homeTeamId === team.id;

  return acc + (isHome ? tm.homeTeamGoals : tm.awayTeamGoals);
}, 0);

const goalsOwn = (team: TeamsModel, matches: MatchesModel[]) => matches.reduce((acc, tm) => {
  const isHome = tm.homeTeamId === team.id;

  return acc + (isHome ? tm.awayTeamGoals : tm.homeTeamGoals);
}, 0);

const getPerformance = (team: TeamsModel, matches: MatchesModel[]) => {
  const victories = teamVictories(team, matches);
  const losses = teamLosses(team, matches);
  const draws = teamDraw(matches);
  const tp = totalPoints(victories, draws);
  const gf = goalsFavor(team, matches);
  const go = goalsOwn(team, matches);

  return {
    totalPoints: tp,
    totalGames: matches.length,
    totalVictories: victories.length,
    totalDraws: draws.length,
    totalLosses: losses.length,
    goalsFavor: gf,
    goalsOwn: go,
    goalsBalance: gf - go,
    efficiency: ((tp / (matches.length * 3)) * 100).toFixed(2),
  };
};

const sortTeams = (teams: PerformanceBoard[]) => teams.sort((a, b) => {
  if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;

  if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;

  if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;

  return b.goalsFavor - a.goalsFavor;
});

describe('Roda testes sobre as rotas de /leaderboard', () => {
  let chaiHttpResponse: Response;

  it('Retorna os desempenhos de todos os times em casa na pagina "/leaderboard/home".', async () => {
    const performanceResults = teams.map((team) => {
      const teamMatches = matches
        .filter((match) => !match.inProgress)
        .filter((match) => match.homeTeamId === team.id);

      const teamPerformance = getPerformance(team, teamMatches);

      return {
        name: team.teamName,
        ...teamPerformance,
      };
    });

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql(sortTeams(performanceResults));
  });

  it('Retorna os desempenhos de todos os times fora de casa na pagina "/leaderboard/away".', async () => {
    const performanceResults = teams.map((team) => {
      const teamMatches = matches
        .filter((match) => !match.inProgress)
        .filter((match) => match.awayTeamId === team.id);

      const teamPerformance = getPerformance(team, teamMatches);

      return {
        name: team.teamName,
        ...teamPerformance,
      };
    });

    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql(sortTeams(performanceResults));
  });
});