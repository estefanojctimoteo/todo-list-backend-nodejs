import { CRUD } from '../../common/interfaces/crud.interface';
import TasksDao from '../daos/tasks.dao';
import { CreateTaskDto } from '../dto/create.task.dto';

class TasksService implements CRUD {
  async create (resource: CreateTaskDto) {
    return TasksDao.addTask(resource);
  }

  async getTaskByProjectIdAndDescription(projectId: string, description: string) {
    return TasksDao.getTaskByProjectIdAndDescription(projectId, description);
  }

  async list(projectId: string, limit: number, page: number) {
    return TasksDao.getTasksByProjectId(projectId, limit, page);
  }

  async listDone(projectId: string, limit: number, page: number) {
    return TasksDao.getTasksDoneByProjectId(projectId, limit, page);
  }

  async deleteById(id: string) {
    return TasksDao.removeTaskById(id);
  }

  async patchById(id: string) {
    return TasksDao.updateDoneById(id);
  }

}

export default new TasksService();