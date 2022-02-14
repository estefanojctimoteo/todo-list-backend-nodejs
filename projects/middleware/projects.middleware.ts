import express from 'express';
import projectService from '../services/projects.service';

class ProjectsMiddleware {

  async validateSameProjectDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const project = await projectService.getProjectByUserIdAndName(req.body.userId, req.body.name);
    if (project) {
      res.status(403).send({ error: `Project already exists` });
    } else {
      next();
    }
  }

}

export default new ProjectsMiddleware();