import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './taskStatus.enum';
import { createTaskDto } from './dto/create-tasks.dto';
import { FilterTasksDTO } from './dto/get-task-byFilter.dto';
import { TasksRepository } from './tasks.repository';
import { UpdateTask } from './dto/update-task.dto';
import { user } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  //NOTE: bisa pake filter atau get all
  async getTasks(filterTasksDTO: FilterTasksDTO, user: user): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterTasksDTO, user);
  }

  async getTaskById(id: string, user: user): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id, user });
    if (!found) {
      throw new NotFoundException(`Task with id ${id} Not Found`);
    }
    return found;
  }

  //NOTE: buat task manggil fungsi dari task.repository
  createTask(createTaskDTO: createTaskDto, user: user): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO, user);
  }

  async delTaskById(id: string, user: user): Promise<void> {
    const deleted = await this.tasksRepository.delete({ id, user });
    if (deleted.affected === 0) {
      throw new NotFoundException(`Tasks with ${id} not deleted`);
    }
  }

  //NOTE: update task aja
  async updateTaskById(
    id: string,
    updateTask: UpdateTask,
    user: user,
  ): Promise<Task> {
    const { title, description } = updateTask;
    const found = await this.getTaskById(id, user);
    found.title = title;
    found.description = description;

    await this.tasksRepository.save(found);
    return found;
  }

  //NOTE: update Task status
  async updateTaskStatusById(
    id: string,
    status: TaskStatus,
    user: user,
  ): Promise<Task> {
    const found = await this.getTaskById(id, user);
    found.status = status;
    await this.tasksRepository.save(found);
    return found;
  }
}
