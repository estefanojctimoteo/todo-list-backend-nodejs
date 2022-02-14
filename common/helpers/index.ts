import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'informYourJwtSecretInDotEnvFile';
const tokenExpirationInSeconds = 36000;

class Helpers {

  hash(str: string) {
    if (str.length > 0){
      var hash = crypto.createHmac('sha256', JWT_SECRET).update(str).digest('hex');
      return hash;
    } else {
      return false;
    }
  }

  createJWT(payload: string) {
    try {
      const _payload = Object.assign({}, payload);
      const token = jwt.sign(_payload, JWT_SECRET, {
        expiresIn: tokenExpirationInSeconds,
      });
      return token
    } catch (err) {
      return false
    }    
  }


}

export default new Helpers()