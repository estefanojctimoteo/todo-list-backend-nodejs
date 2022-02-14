import mongooseService from '../../common/services/mongoose.service';

class UserSchema {

  Schema = mongooseService.getMongoose().Schema;  

  schema = new this.Schema({
    _id: String,
    name: String,
    email: String,
    password: { type: String, select: false },
  }, { id: false });

}

export default new UserSchema()