import { CRUD } from '../../common/interfaces/crud.interface';
import ProjectsDao from '../daos/projects.dao';
import { CreateProjectDto } from '../dto/create.project.dto';

class ProjectsService implements CRUD {
  async create (resource: CreateProjectDto) {
    return ProjectsDao.addProject(resource);
  }

  async getProjectByUserIdAndName(userId: string, name: string) {
    return ProjectsDao.getProjectByUserIdAndName(userId, name);
  }

  async list(userId: string, limit: number, page: number) {
    return ProjectsDao.getProjectsByUserId(userId, limit, page);
  }

  async deleteById(id: string) {
    return ProjectsDao.removeProjectById(id);
  }


}

export default new ProjectsService();