import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTask {
  @IsOptional()
  @ApiProperty({ description: 'title of the task', required: false })
  title: string;

  @IsOptional()
  @ApiProperty({ description: 'description of the task', required: false })
  description: string;
}
