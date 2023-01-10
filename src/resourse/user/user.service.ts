import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import appConfig from 'src/config/app.config';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async signPayload(payload) {
    return sign({ name: payload }, appConfig().appSecret, {
      expiresIn: 60 * 60 * 24,
    });
  }
  async validateUser(payload: string) {
    return await this.model.findOne({ username: payload });
  }
  async register(username: string, password: string) {
    try {
      let user = await this.validateUser(username);
      if (user) throw new HttpException('registered user', HttpStatus.FOUND);
      const hashed = await bcrypt.hash(password, 10);
      user = await this.model.create({
        username: username,
        password: hashed,
      });

      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  async login(username: string, password: string) {
    let user = await this.validateUser(username);
    if (!user) throw new HttpException('wrong email', HttpStatus.FORBIDDEN);
    const checkPassword = this.checkPassword(password, user.password);
    if (checkPassword) {
      return user;
    } else {
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    }
  }
  async checkPassword(password: string, checkPassword: string) {
    bcrypt.compare(password, checkPassword, (err, result) => {
      if (result) {
        return true;
      } else {
        return false;
      }
    });
  }

  async deleteAllUser() {
    await this.model.deleteMany();
    return true;
  }
}
