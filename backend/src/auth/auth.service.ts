import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { authCredentials } from './dto/authCredentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(credentials: authCredentials) {
    return this.usersRepository.signUp(credentials);
  }

  async signIn(credentials: authCredentials): Promise<{ accessToken: string }> {
    const { username, password } = credentials;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      //NOTE: buat sign payload jdi jwt token
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'please check again your login credentials',
      );
    }
  }
}
