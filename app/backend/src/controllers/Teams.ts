import { Request, Response } from 'express';
import TeamsModel from '../database/models/Teams';

class Teams {
  static async getTeams(_: Request, res: Response) {
    const teams = await TeamsModel.findAll();

    return res.status(200).json(teams);
  }

  static async getTeam(req: Request, res: Response) {
    const team = await TeamsModel.findOne({ where: { id: req.params.id } });

    return res.status(200).json(team);
  }
}

export default Teams;
