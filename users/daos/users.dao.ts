import mongooseService from '../../common/services/mongoose.service';
import { CreateUserDto } from '../dto/create.user.dto';
import userSchema from '../schema/user.schema';

import { v4 as uuid } from 'uuid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {

  User = mongooseService.getMongoose().model('Users', userSchema.schema);
  constructor() {
    log('Created new instance of UsersDao');
  }

  async addUser(userFields: CreateUserDto) {
    const userId = uuid();
    const user = new this.User({
      _id: userId,
      ...userFields
    })
    await user.save();    
    return this.User.findOne({ email: userFields.email, password: userFields.password })
    .select('_id email name')
    .exec();
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async getUserByEmailAndPassword(email: string, password: string) {    
    return this.User.findOne({ email: email, password: password })
      .select('_id email name')
      .exec();
  }

}

export default new UsersDao();