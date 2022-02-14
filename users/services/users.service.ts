import { CRUD } from '../../common/interfaces/crud.interface';
import UsersDao from '../daos/users.dao';
import { CreateUserDto } from '../dto/create.user.dto';

class UsersService implements CRUD {
  async create (resource: CreateUserDto) {
    return UsersDao.addUser(resource);
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }

  async getUserByEmailAndPassword(email: string, password: string) {
    return UsersDao.getUserByEmailAndPassword(email, password);
  }  

  async deleteById(id: string) {
    return '';
  }

}

export default new UsersService();