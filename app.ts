import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';

import { CommonRoutesConfig } from './common/routes/common.routes.config';
import { UsersRoutesConfig } from './users/routes/users.routes.config';
import { ProjectsRoutesConfig } from './projects/routes/projects.routes.config';
import { TasksRoutesConfig } from './tasks/routes/tasks.routes.config'

import helmet from 'helmet';

import debug from 'debug';
import loggerOptions from './log/loggerOptions'

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

//O Helmet pode ajudar a proteger o seu aplicativo 
//de algumas vulnerabilidades da web bastante conhecidas 
//configurando os cabeçalhos HTTP adequadamente.
//
//O Helmet é na realidade apenas uma coleção de nove funções 
//de middlewares menores que configuram cabeçalhos HTTP 
//relacionados à segurança
app.use(helmet());

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UsersRoutesConfig(app));
routes.push(new ProjectsRoutesConfig(app));
routes.push(new TasksRoutesConfig(app));

// this is a simple route to make sure everything is working properly
const runningMessage = `Server is running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage)
});

export default server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});