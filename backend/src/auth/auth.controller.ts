import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authCredentials } from './dto/authCredentials.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() credentials: authCredentials) {
    return this.authService.signUp(credentials);
  }

  @Post('/signin')
  signIn(
    @Body() credentials: authCredentials,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentials);
  }
}
