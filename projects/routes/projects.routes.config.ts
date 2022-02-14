import express from 'express';
import { body } from 'express-validator';
import { CommonRoutesConfig } from '../../common/routes/common.routes.config';
import BodyValidatorMiddleware from '../../common/middleware/body.validator.middleware';
import ProjectsMiddleware from '../middleware/projects.middleware';
import ProjectsController from '../controllers/projects.controller';

export class ProjectsRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProjectsRoutesConfig');
  }
  configureRoutes() {
    this.app
      .route(`/projects`)      
      .post(
        body('userId').isString(),
        body('name').isString()          
          .isLength({ min: 5})
          .withMessage('Must include name with 5+ characters'),
        BodyValidatorMiddleware.verifyBodyFieldsErrors,
        ProjectsMiddleware.validateSameProjectDoesntExist,
        ProjectsController.createProject
      );

    this.app
      .route(`/projects/:id`)
      .delete(ProjectsController.removeProject);

    this.app
      .route(`/projects/user/:userId`)
      .get(ProjectsController.listProjects);

    return this.app;
  }  
}