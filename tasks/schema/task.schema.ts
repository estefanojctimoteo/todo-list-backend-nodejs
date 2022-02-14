import mongooseService from '../../common/services/mongoose.service';

class TaskSchema {

  Schema = mongooseService.getMongoose().Schema;  

  schema = new this.Schema({
    _id: String,
    projectId: String,
    description: String,
    creationDate: Date,
    finishDate : Date
  }, { id: false });

}

export default new TaskSchema()