import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class authCredentials {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: 'username with min 4 and max 20' })
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password is too weak, please use combination of upper case, lower case, number, and special character',
  })
  @ApiProperty({ description: 'password with min 6 and max 32 must unique' })
  password: string;
}
