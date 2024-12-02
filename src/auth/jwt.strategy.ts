/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') , // use your secret key or environment variable
      //secretOrKey: process.env.JWT_KEY, // use your secret key or environment variable
      ignoreExpiration: false,
    });
  }

 
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };  // Adjust the returned values based on your payload
  }
}

