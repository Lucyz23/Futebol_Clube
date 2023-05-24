import * as express from 'express';
import TeamsController from './controllers/Teams';
import UsersController from './controllers/Users';
import MatchesController from './controllers/Matches';
import LeaderboardController from './controllers/Leaderboard';

import checkToken from './middlewares/check-token';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.teamRoutes();
    this.loginRoutes();
    this.matchesRoutes();
    this.leaderboardRoutes();
    // Não remover essa rota
    this.app.get('/', (_, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public teamRoutes(): void {
    this.app.get('/teams', TeamsController.getTeams);
    this.app.get('/teams/:id', TeamsController.getTeam);
  }

  public loginRoutes(): void {
    this.app.post('/login', UsersController.login);
    this.app.get('/login/role', checkToken, UsersController.getRole);
  }

  public matchesRoutes(): void {
    this.app.get('/matches', MatchesController.getMatches);
    this.app.post('/matches', checkToken, MatchesController.createMatch);
    this.app.patch('/matches/:id', checkToken, MatchesController.updateGoal);
    this.app.patch('/matches/:id/finish', checkToken, MatchesController.finishMatch);
  }

  public leaderboardRoutes(): void {
    this.app.get('/leaderboard', LeaderboardController.leaderboard);
    this.app.get('/leaderboard/home', LeaderboardController.home);
    this.app.get('/leaderboard/away', LeaderboardController.away);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
