import express from 'express';
import userService from '../services/users.service';

class UsersMiddleware {

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res.status(403).send({ error: `User email already exists` });
    } else {
      next();
    }
  }

  async validateEmailExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      res.status(400).send({ error: `User's email and/or password invalid` });
    } else {
      next();
    }
  }

}

export default new UsersMiddleware();