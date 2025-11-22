import jwt, { SignOptions } from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import env from '../config/env';

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE as string | number,
  } as SignOptions);
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
};
