import { ParsedQs } from 'qs';
import { FindOptions } from 'sequelize';
import { Request, Response } from 'express';
import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';

const getMatchesWithTeams = (): FindOptions => ({
  include: [
    {
      model: TeamsModel,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: TeamsModel,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ],
});

const inProgressFilter = (filter: ParsedQs): FindOptions => {
  const query = getMatchesWithTeams();

  if (!filter.inProgress) return query;

  query.where = {
    inProgress: filter.inProgress === 'true',
  };

  return query;
};

const invalidMatch = async (fields: Record<string, string>) => {
  if (fields.homeTeamId === fields.awayTeamId) {
    return { status: 422, message: 'It is not possible to create a match with two equal teams' };
  }

  if (!await TeamsModel.findOne({ where: { id: fields.homeTeamId } })
    || !await TeamsModel.findOne({ where: { id: fields.awayTeamId } })) {
    return { status: 404, message: 'There is no team with such id!' };
  }

  return false;
};

class Matches {
  static async getMatches(req: Request, res: Response) {
    const matches = await MatchesModel.findAll(inProgressFilter(req.query));

    return res.status(200).json(matches);
  }

  static async finishMatch(req: Request, res: Response) {
    await MatchesModel.update({ inProgress: false }, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: 'Finished' });
  }

  static async updateGoal(req: Request, res: Response) {
    await MatchesModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: 'Updated' });
  }

  static async createMatch(req: Request, res: Response) {
    const isInvalid = await invalidMatch(req.body);

    if (isInvalid) return res.status(isInvalid.status).json({ message: isInvalid.message });

    const match = await MatchesModel.create(req.body);

    return res.status(201).json(match);
  }
}

export default Matches;
