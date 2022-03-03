import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskInterceptor } from './interceptor/create-task.interceptor';
import { TaskHistoryInterceptor } from './interceptor/task-history.interceptor';
import { TaskService } from './task.service';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.taskService.findAll();
  }

  @UseInterceptors(CreateTaskInterceptor, TaskHistoryInterceptor)
  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.taskService.createTask(task);
  }

  @UseInterceptors(TaskHistoryInterceptor)
  @Put(':id')
  updateTask(@Param('id') id: number, @Body() task: CreateTaskDto) {
    return this.taskService.updateTask(id, task);
  }

  @UseInterceptors(TaskHistoryInterceptor)
  @Put('delete/:id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @UseInterceptors(TaskHistoryInterceptor)
  @Put('complete/:id')
  completeTask(@Param('id') id: number) {
    return this.taskService.completeTask(id);
  }

  @Get(':id')
  getTaskId(@Param('id') id: number) {
    return this.taskService.getTaskId(id);
  }

  @Get('history/:id')
  getHistoryTask(@Param('id') id: number) {
    return this.taskService.getHistoryTask(id);
  }
}
