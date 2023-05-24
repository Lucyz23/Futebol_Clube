import { Op } from 'sequelize';
import { Request, Response } from 'express';
import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';

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

class Leaderboard {
  static async leaderboard(_: Request, res: Response) {
    const teams = await TeamsModel.findAll();

    const performance = teams.map(async (team) => {
      const matches = await MatchesModel.findAll({
        where: {
          [Op.or]: [
            { homeTeamId: team.id },
            { awayTeamId: team.id }],
          inProgress: false,
        },
      });
      const teamPerformance = getPerformance(team, matches);

      return {
        name: team.teamName,
        ...teamPerformance,
      };
    });

    const performanceResults = await Promise.all(performance);

    return res.status(200).json(sortTeams(performanceResults));
  }

  static async home(_: Request, res: Response) {
    const teams = await TeamsModel.findAll();

    const performance = teams.map(async (team) => {
      const matches = await MatchesModel.findAll({
        where: { homeTeamId: team.id, inProgress: false },
      });
      const teamPerformance = getPerformance(team, matches);

      return {
        name: team.teamName,
        ...teamPerformance,
      };
    });

    const performanceResults = await Promise.all(performance);

    return res.status(200).json(sortTeams(performanceResults));
  }

  static async away(_: Request, res: Response) {
    const teams = await TeamsModel.findAll();

    const performance = teams.map(async (team) => {
      const matches = await MatchesModel.findAll({
        where: { awayTeamId: team.id, inProgress: false },
      });
      const teamPerformance = getPerformance(team, matches);

      return {
        name: team.teamName,
        ...teamPerformance,
      };
    });

    const performanceResults = await Promise.all(performance);

    return res.status(200).json(sortTeams(performanceResults));
  }
}

export default Leaderboard;
