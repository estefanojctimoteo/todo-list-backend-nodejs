import express from 'express';
import taskService from '../services/tasks.service';

class TasksMiddleware {

  async validateSameTaskDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const task = await taskService.getTaskByProjectIdAndDescription(req.body.projectId, req.body.description);
    if (task) {
      res.status(403).send({ error: `Task already exists` });
    } else {
      next();
    }
  }

}

export default new TasksMiddleware();