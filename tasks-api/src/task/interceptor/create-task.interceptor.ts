import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../task.entity';

async function createValidation(value: CreateTaskDto) {
  const exists = await Task.findOne({ where: { title: value.title } });
  if (exists) {
    throw new BadRequestException('Ya existe una tarea con ese nombre');
  }
}

@Injectable()
export class CreateTaskInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    await createValidation(request.body);
    return next.handle().pipe();
  }
}
