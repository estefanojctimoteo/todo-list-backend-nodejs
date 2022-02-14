import express from 'express';

import projectsService from '../services/projects.service';

import debug from 'debug';

const log: debug.IDebugger = debug('app:projects-controller');

class ProjectsController {

  async createProject(req: express.Request, res: express.Response) {    
    const  _id = await projectsService.create(req.body);        
    res.status(201).send({ _id: _id });
  }

  async listProjects(req: express.Request, res: express.Response) {
    const users = await projectsService.list(req.params.userId,100, 0);
    res.status(200).send(users);
  }

  async removeProject(req: express.Request, res: express.Response) {
    log(await projectsService.deleteById(req.params.id));
    res.status(204).send();
  }



}

export default new ProjectsController();