import { UserPayload } from '../auth/jwt.strategy';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}