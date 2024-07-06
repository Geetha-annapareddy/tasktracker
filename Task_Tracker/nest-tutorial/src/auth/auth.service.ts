import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from 'src/dto/auth.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import { SigninDto } from 'src/dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private jwt:JwtService,private config:ConfigService) {}

  async signup(req: AuthDto): Promise<void> {
    const { username,email, password } = req;
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      console.log('Email already exists');
      alert("Email already exists");
      return;
    }

    // Hash password
    const hashedPassword = await argon.hash(password);

    // Create new user
    const newUser = new this.userModel({ username,email, password: hashedPassword });
    await newUser.save();
    console.log('User signed up:', email);
  }

  async signin(dto: SigninDto) :Promise<{ access_token: string } | void>{
    // find the user by email
    console.log("signin started");
    const user =await this.userModel.findOne({email: dto.email});
    // if user does not exist throw exception
    if (!user){
      console.log("User not found");
      return;
    }
    // compare password
    const pwMatches = await argon.verify(
      user.password,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches){
      console.log("Password not matched");
      return;
    }
    
    const token=await this.signToken(user.email);
    return token;
       
  }

  async signToken(email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: email
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}
