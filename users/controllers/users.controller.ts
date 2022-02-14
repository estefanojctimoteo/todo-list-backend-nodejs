import express from 'express';

import usersService from '../services/users.service';

import helpers from '../../common/helpers';

import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');


class UsersController {

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = helpers.hash(req.body.password);
    const user = await usersService.create(req.body);
    const _user = Object.assign({}, user);
    try {
      const token = helpers.createJWT(_user);
      if (!token)
        res.status(500).send();
      res
        .status(201)
        .send({ accessToken: token });        
    } catch (err) {
      log('createJWT error: %O', err);
      res.status(500).send();      
    }
  }

  async signinUser(req: express.Request, res: express.Response) {
    req.body.password = helpers.hash(req.body.password);
    const user = await usersService.getUserByEmailAndPassword(req.body.email, req.body.password);
    const status = user ? 201 : 403
    if (status === 403)
      res.status(status).send();
    const _user = Object.assign({}, user);
    try {
      const token = helpers.createJWT(_user);
      if (!token)
        res.status(500).send();
      res
        .status(status)
        .send({ accessToken: token });        
    } catch (err) {
      log('createJWT error: %O', err);
      res.status(500).send();      
    }
  }

}

export default new UsersController();