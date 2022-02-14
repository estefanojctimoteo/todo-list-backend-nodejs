import express from 'express';

import tasksService from '../services/tasks.service';

import debug from 'debug';

const log: debug.IDebugger = debug('app:tasks-controller');

class TasksController {

  async createTask(req: express.Request, res: express.Response) {    
    const  _id = await tasksService.create(req.body);        
    res.status(201).send({ _id: _id });
  }

  async listTasks(req: express.Request, res: express.Response) {
    const tasks = await tasksService.list(req.params.projectId,100, 0);
    res.status(200).send(tasks);
  }

  async listTasksDone(req: express.Request, res: express.Response) {
    const tasks = await tasksService.listDone(req.params.projectId,100, 0);
    res.status(200).send(tasks);
  }

  async removeTask(req: express.Request, res: express.Response) {
    log(await tasksService.deleteById(req.params.id));
    res.status(204).send();
  }

  async patch(req: express.Request, res: express.Response) {
    log(await tasksService.patchById(req.params.id));
    res.status(204).send();
  }

}

export default new TasksController();