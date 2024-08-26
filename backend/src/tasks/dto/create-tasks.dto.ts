import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createTaskDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'title of the task' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'description of the task' })
  description: string;
}
