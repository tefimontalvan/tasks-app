import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskHistory } from 'src/task-history/task-history.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ active: true });
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, task: CreateTaskDto): Promise<CreateTaskDto> {
    await this.taskRepository.update(id, task);
    const taskFind = await this.taskRepository.findOne(id);
    return taskFind;
  }

  async deleteTask(id: number): Promise<CreateTaskDto> {
    const taskFind = await this.taskRepository.findOne(id);
    const taskUpdated = { ...taskFind, active: false };
    this.taskRepository.update(id, taskUpdated);
    return taskUpdated;
  }

  async completeTask(id: number): Promise<CreateTaskDto> {
    const taskFind = await this.taskRepository.findOne(id);

    const taskUpdated = { ...taskFind, complete: !taskFind.complete };
    this.taskRepository.update(id, taskUpdated);
    return taskUpdated;
  }

  async getTaskId(id: number): Promise<CreateTaskDto> {
    return await this.taskRepository.findOne(id);
  }

  async getHistoryTask(id: number): Promise<TaskHistory[]> {
    const taskFind = await this.taskRepository.findOne(id);

    return TaskHistory.find({ title: taskFind.title });
  }
}
