import Teams from '../../database/models/Teams';
import Users from '../../database/models/Users';
import Matches from '../../database/models/Matches';

export const teams: Teams[] = <Teams[]>[
  {
    id: 1,
    teamName: 'Avaí/Kindermann'
  },
  {
    id: 2,
    teamName: 'Bahia'
  },
  {
    id: 3,
    teamName: 'Botafogo'
  },
  {
    id: 4,
    teamName: 'Corinthians'
  },
  {
    id: 5,
    teamName: 'Cruzeiro'
  },
  {
    id: 6,
    teamName: 'Ferroviária'
  },
  {
    id: 7,
    teamName: 'Flamengo'
  },
  {
    id: 8,
    teamName: 'Grêmio'
  },
  {
    id: 9,
    teamName: 'Internacional'
  },
  {
    id: 10,
    teamName: 'Minas Brasília'
  },
  {
    id: 11,
    teamName: 'Napoli-SC'
  },
  {
    id: 12,
    teamName: 'Palmeiras'
  },
  {
    id: 13,
    teamName: 'Real Brasília'
  },
  {
    id: 14,
    teamName: 'Santos'
  },
  {
    id: 15,
    teamName: 'São José-SP'
  },
  {
    id: 16,
    teamName: 'São Paulo'
  }
];

export const users: Users[] = <Users[]>[
  {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    // senha: secret_admin
  },
  {
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    // senha: secret_user
  },
  // os logins abaixo são intencionalmente inválidos, pois serão usados nos testes
  {
    username: 'User',
    role: 'user',
    email: '@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    // senha: secret_user
  },
  {
    username: 'User',
    role: 'user',
    email: 'invalid.user@user.com',
    password: '$2a$10$HDkFwOMKOI6PTza0F7.YRu1Bqsqb9hx7XkuV7QeYB5dRL4z9DI1Mu',
    // senha: 12345
  },
];

export const matches: Matches[] = <Matches[]>[
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 4,
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 5,
    homeTeamId: 7,
    homeTeamGoals: 1,
    awayTeamId: 10,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 6,
    homeTeamId: 5,
    homeTeamGoals: 1,
    awayTeamId: 13,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 7,
    homeTeamId: 12,
    homeTeamGoals: 2,
    awayTeamId: 6,
    awayTeamGoals: 2,
    inProgress: false,
  },
  {
    id: 8,
    homeTeamId: 15,
    homeTeamGoals: 0,
    awayTeamId: 1,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 9,
    homeTeamId: 1,
    homeTeamGoals: 0,
    awayTeamId: 12,
    awayTeamGoals: 3,
    inProgress: false,
  },
  {
    id: 10,
    homeTeamId: 2,
    homeTeamGoals: 0,
    awayTeamId: 9,
    awayTeamGoals: 2,
    inProgress: false,
  },
  {
    id: 11,
    homeTeamId: 13,
    homeTeamGoals: 1,
    awayTeamId: 3,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 12,
    homeTeamId: 6,
    homeTeamGoals: 0,
    awayTeamId: 4,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 13,
    homeTeamId: 8,
    homeTeamGoals: 2,
    awayTeamId: 5,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 14,
    homeTeamId: 14,
    homeTeamGoals: 2,
    awayTeamId: 16,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 15,
    homeTeamId: 10,
    homeTeamGoals: 0,
    awayTeamId: 15,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 16,
    homeTeamId: 11,
    homeTeamGoals: 0,
    awayTeamId: 7,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 17,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 3,
    inProgress: false,
  },
  {
    id: 18,
    homeTeamId: 12,
    homeTeamGoals: 4,
    awayTeamId: 5,
    awayTeamGoals: 2,
    inProgress: false,
  },
  {
    id: 19,
    homeTeamId: 11,
    homeTeamGoals: 2,
    awayTeamId: 2,
    awayTeamGoals: 2,
    inProgress: false,
  },
  {
    id: 20,
    homeTeamId: 7,
    homeTeamGoals: 0,
    awayTeamId: 9,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 21,
    homeTeamId: 6,
    homeTeamGoals: 3,
    awayTeamId: 13,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 22,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 23,
    homeTeamId: 15,
    homeTeamGoals: 2,
    awayTeamId: 16,
    awayTeamGoals: 3,
    inProgress: false,
  },
  {
    id: 24,
    homeTeamId: 10,
    homeTeamGoals: 2,
    awayTeamId: 14,
    awayTeamGoals: 2,
    inProgress: false,
  },
  {
    id: 25,
    homeTeamId: 2,
    homeTeamGoals: 0,
    awayTeamId: 6,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 26,
    homeTeamId: 13,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 27,
    homeTeamId: 5,
    homeTeamGoals: 1,
    awayTeamId: 15,
    awayTeamGoals: 2,
    inProgress: false,
  },
  {
    id: 28,
    homeTeamId: 16,
    homeTeamGoals: 3,
    awayTeamId: 7,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 29,
    homeTeamId: 9,
    homeTeamGoals: 0,
    awayTeamId: 4,
    awayTeamGoals: 4,
    inProgress: false,
  },
  {
    id: 30,
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 12,
    awayTeamGoals: 4,
    inProgress: false,
  },
  {
    id: 31,
    homeTeamId: 8,
    homeTeamGoals: 2,
    awayTeamId: 10,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 32,
    homeTeamId: 14,
    homeTeamGoals: 5,
    awayTeamId: 11,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 33,
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 16,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 34,
    homeTeamId: 9,
    homeTeamGoals: 3,
    awayTeamId: 6,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 35,
    homeTeamId: 10,
    homeTeamGoals: 1,
    awayTeamId: 5,
    awayTeamGoals: 3,
    inProgress: false,
  },
  {
    id: 36,
    homeTeamId: 2,
    homeTeamGoals: 0,
    awayTeamId: 7,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 37,
    homeTeamId: 15,
    homeTeamGoals: 0,
    awayTeamId: 13,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 38,
    homeTeamId: 14,
    homeTeamGoals: 2,
    awayTeamId: 4,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 39,
    homeTeamId: 3,
    homeTeamGoals: 2,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 40,
    homeTeamId: 12,
    homeTeamGoals: 4,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    id: 43,
    homeTeamId: 11,
    homeTeamGoals: 0,
    awayTeamId: 10,
    awayTeamGoals: 0,
    inProgress: true,
  },
  {
    id: 44,
    homeTeamId: 7,
    homeTeamGoals: 2,
    awayTeamId: 15,
    awayTeamGoals: 2,
    inProgress: true,
  },
  {
    id: 45,
    homeTeamId: 5,
    homeTeamGoals: 1,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    id: 46,
    homeTeamId: 4,
    homeTeamGoals: 1,
    awayTeamId: 12,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    id: 47,
    homeTeamId: 8,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 2,
    inProgress: true,
  },
  {
    id: 48,
    homeTeamId: 13,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true,
  }
];