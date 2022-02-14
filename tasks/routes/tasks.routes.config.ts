import express from 'express';
import { body } from 'express-validator';
import { CommonRoutesConfig } from '../../common/routes/common.routes.config';
import BodyValidatorMiddleware from '../../common/middleware/body.validator.middleware';
import TasksMiddleware from '../middleware/tasks.middleware';
import TasksController from '../controllers/tasks.controller';

export class TasksRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'TasksRoutesConfig');
  }
  configureRoutes() {
    this.app
      .route(`/tasks`)      
      .post(
        body('projectId').isString(),
        body('description').isString()          
          .isLength({ min: 5})
          .withMessage('Must include description with 5+ characters'),
        BodyValidatorMiddleware.verifyBodyFieldsErrors,
        TasksMiddleware.validateSameTaskDoesntExist,
        TasksController.createTask
      );

    this.app
      .route(`/tasks/:id`)
      .delete(TasksController.removeTask);

    this.app.
      patch(`/tasks/done/:id`, [
        TasksController.patch,
      ]);      
  
    this.app
      .route(`/tasks/project/:projectId`)
      .get(TasksController.listTasks);

    this.app
      .route(`/tasks/done/project/:projectId`)
      .get(TasksController.listTasksDone);

    return this.app;
  }  
}