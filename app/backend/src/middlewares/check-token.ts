import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token not found' });

  if (req.headers.authorization.length < 16
    || !verify(req.headers.authorization, process.env.JWT_SECRET || 'secret')) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
};
