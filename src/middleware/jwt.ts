import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';

const { SESSION_SECRET_USER, SESSION_SECRET_ADMIN } = process.env;

export const verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ auth: false, msg: 'No token provided.' });
    return;
  };

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SESSION_SECRET_USER!) as JwtPayload;
    res.locals.decodedUser = decoded;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
      res.status(401).json({ auth: false, msg: 'Invalid or expired token.' });
      return;
    } else {
      res.status(500).json({ auth: false, msg: 'Server error.' });
      return;
    };
  }
};


export const verifyAdminToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ auth: false, msg: 'No token provided.' });
    return;
  };

  const tokenAdmin = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(tokenAdmin, SESSION_SECRET_ADMIN!) as JwtPayload;
    res.locals.decodedAdmin = decoded;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
      res.status(401).json({ auth: false, msg: 'Invalid or expired token.' });
      return;
    } else {
      res.status(500).json({ auth: false, msg: 'Server error.' });
      return;
    };
  };
};
