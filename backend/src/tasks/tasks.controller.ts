import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-tasks.dto';
import { FilterTasksDTO } from './dto/get-task-byFilter.dto';
import { UpdateTaskStatusDto } from './dto/update-taskStatus.dto';
import { UpdateTask } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { user } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTask(
    @Query() filterTasksDto: FilterTasksDTO,
    @GetUser() user: user,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterTasksDto, user);
  }

  @Get('/:id')
  getTaskByID(@Param('id') id: string, @GetUser() user: user): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  delTaskById(@Param('id') id: string, @GetUser() user: user): Promise<void> {
    return this.tasksService.delTaskById(id, user);
  }

  @Patch('/:id')
  updateTaskById(
    @Param('id') id: string,
    @GetUser() user: user,
    @Body() updateTask: UpdateTask,
  ) {
    return this.tasksService.updateTaskById(id, updateTask, user);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body() UpdateTaskStatusDTO: UpdateTaskStatusDto,
    @GetUser() user: user,
  ): Promise<Task> {
    const { status } = UpdateTaskStatusDTO;
    return this.tasksService.updateTaskStatusById(id, status, user);
  }

  @Post()
  createTask(
    @Body() createTaskDTO: createTaskDto,
    @GetUser() user: user,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO, user);
  }
}
