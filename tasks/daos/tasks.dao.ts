import mongooseService from '../../common/services/mongoose.service';
import { CreateTaskDto } from '../dto/create.task.dto';
import taskSchema from '../schema/task.schema';

import { v4 as uuid } from 'uuid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class TasksDao {

  Task = mongooseService.getMongoose().model('Tasks', taskSchema.schema);
  constructor() {
    log('Created new instance of TasksDao');
  }

  async addTask(taskFields: CreateTaskDto) {
    const taskId = uuid();
    const task = new this.Task({
      _id: taskId,
      creationDate: new Date(),
      finishDate: null,
      ...taskFields
    })
    await task.save();    
    return taskId;
  }

  async getTaskByProjectIdAndDescription(projectId: string, description: string) {    
    return this.Task.findOne({ projectId: projectId, description: description })
      .select()
      .exec();
  }

  async getTasksByProjectId(projectId: string, limit = 25, page = 0) {
    return this.Task.find({ projectId: projectId, finishDate: null })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getTasksDoneByProjectId(projectId: string, limit = 25, page = 0) {
    return this.Task.find({ projectId: projectId, finishDate: { $ne: null } })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async removeTaskById(_id: string) {
    return this.Task.deleteOne({ _id: _id }).exec();
  }

  async updateDoneById(_id: string) {
    return await this.Task.findOneAndUpdate({ _id: _id },{ $set: { finishDate: new Date() } }).exec();        
  }  
  
}

export default new TasksDao();