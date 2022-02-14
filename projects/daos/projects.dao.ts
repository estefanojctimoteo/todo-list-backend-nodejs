import mongooseService from '../../common/services/mongoose.service';
import { CreateProjectDto } from '../dto/create.project.dto';
import projectSchema from '../schema/project.schema';

import { v4 as uuid } from 'uuid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class ProjectsDao {

  Project = mongooseService.getMongoose().model('Projects', projectSchema.schema);
  constructor() {
    log('Created new instance of ProjectsDao');
  }

  async addProject(projectFields: CreateProjectDto) {
    const projectId = uuid();
    const project = new this.Project({
      _id: projectId,
      ...projectFields
    })
    await project.save();    
    return projectId;
  }

  async getProjectByUserIdAndName(userId: string, name: string) {    
    return this.Project.findOne({ userId: userId, name: name })
      .select()
      .exec();
  }

  async getProjectsByUserId(userId: string, limit = 25, page = 0) {
    return this.Project.find({ userId: userId })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async removeProjectById(_id: string) {
    return this.Project.deleteOne({ _id: _id }).exec();
  }



}

export default new ProjectsDao();