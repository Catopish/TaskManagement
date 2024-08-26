import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../taskStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTasksDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({
    description: 'must be OPEN, IN_PROGRESS, or DONE',
    required: false,
  })
  status?: TaskStatus;

  @IsOptional()
  @ApiProperty({
    description: 'search by title or description',
    required: false,
  })
  search?: string;
}
