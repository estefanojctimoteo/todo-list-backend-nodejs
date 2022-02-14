import express from 'express';
import { body } from 'express-validator';
import { CommonRoutesConfig } from '../../common/routes/common.routes.config';
import BodyValidatorMiddleware from '../../common/middleware/body.validator.middleware';
import UsersMiddleware from '../middleware/users.middleware';
import UsersController from '../controllers/users.controller';

export class UsersRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutesConfig');
  }
  configureRoutes() {
    this.app
      .route(`/users`)
      .post(
        body('email').isEmail(),
        body('password')
          .isString()
          .isLength({ min: 5})
          .withMessage('Must include password with 5+ characters'),
        BodyValidatorMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
        /* #swagger.description = 'Route for create user. ***Please, use double quotes for string parameters ***' */
        /*
          #swagger.parameters['name'] = {
            description: 'User\'s name.',
            type: 'string',
            required: true,
            in: 'body',
            example: '\"John Doe\"',
          }          
          #swagger.parameters['email'] = {
            description: 'User\'s email.',
            type: 'string',
            required: true,
            in: 'body',
            example: '\"user@email.com\"',
          }          
          #swagger.parameters['password'] = {
            description: 'User\'s password (min length: 5).',
            type: 'string',
            required: true,
            in: 'body',
            example: '\"sdij12eh0f1\"',
          }
        */
      );

    this.app
      .route(`/auth`)
      .post(
        body('email').isEmail(),
        body('password').isString(),
        BodyValidatorMiddleware.verifyBodyFieldsErrors,
        UsersController.signinUser
      );
    
    return this.app;
  }  
}