import { compare } from 'bcryptjs';
import { decode, sign } from 'jsonwebtoken';

import { Request, Response } from 'express';
import UsersModel from '../database/models/Users';

const INVALID_PASSWORD = 'Invalid email or password';

const invalidBody = (fields?: Record<string, string>) => {
  if (!fields
    || (!fields.email || fields.email === '') || (!fields.password || fields.password === '')) {
    return { status: 400, message: 'All fields must be filled' };
  }

  const validEmail = (email: string) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);

  if (!validEmail(fields.email)
    || fields.password.length < 6) return { status: 401, message: INVALID_PASSWORD };

  return false;
};

class Users {
  static async login(req: Request, res: Response) {
    const isInvalid = invalidBody(req.body);

    if (isInvalid) return res.status(isInvalid.status).json({ message: isInvalid.message });

    const user = await UsersModel.findOne({
      where: { email: req.body.email },
    });

    if (!user) return res.status(401).json({ message: INVALID_PASSWORD });

    if (!await compare(req.body.password, user.password)) {
      return res.status(401).json({ message: INVALID_PASSWORD });
    }

    const token = sign(JSON.stringify(user), process.env.JWT_SECRET || 'secret');

    return res.status(200).json({ token });
  }

  static async getRole(req: Request, res: Response) {
    const user = decode(req.headers.authorization as string);

    return res.status(200).json({ role: (user as { role: string }).role });
  }
}

export default Users;
