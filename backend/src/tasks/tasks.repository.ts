import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-tasks.dto';
import { TaskStatus } from './taskStatus.enum';
import { FilterTasksDTO } from './dto/get-task-byFilter.dto';
import { user } from 'src/auth/user.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private datasource: DataSource) {
    super(Task, datasource.createEntityManager());
  }

  async getTasks(filterTasksDTO: FilterTasksDTO, user: user): Promise<Task[]> {
    const { status, search } = filterTasksDTO;
    const query = this.createQueryBuilder('task');
    //NOTE: validasi user
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '( LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search) )',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDTO: createTaskDto, user: user): Promise<Task> {
    const { title, description } = createTaskDTO;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user: user,
    });

    await this.save(task);
    return task;
  }
}
