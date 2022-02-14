import express from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'informYourJwtSecretInDotEnvFile';

class JwtMiddleware {

  validJWTNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
      if (req.headers['authorization']) {
        try {
          const authorization = req.headers['authorization'].split(' ');
          if (authorization[0] !== 'Bearer') {
              return res.status(401).send();
          } else {
            res.locals.jwt = jwt.verify(
              authorization[1],
              JWT_SECRET
            );
            next();
          }
        } catch (err) {
            return res.status(403).send();
        }
      } else {
        return res.status(401).send();
      }
  }
}

export default new JwtMiddleware();