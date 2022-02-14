import mongooseService from '../../common/services/mongoose.service';

class ProjectSchema {

  Schema = mongooseService.getMongoose().Schema;  

  schema = new this.Schema({
    _id: String,
    userId: String,
    name: String,        
  }, { id: false });

}

export default new ProjectSchema()