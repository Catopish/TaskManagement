import { IsEnum } from 'class-validator';
import { TaskStatus } from '../taskStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @ApiProperty({ description: 'must be OPEN, IN_PROGRESS, or DONE' })
  status: TaskStatus;
}
