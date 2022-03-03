import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TaskHistory } from 'src/task-history/task-history.entity';
import { Task } from '../task.entity';

async function saveTaskHistory(value: Task) {
  const newTaskHistory = new TaskHistory();
  newTaskHistory.task = value;
  newTaskHistory.title = value.title;
  newTaskHistory.description = value.description;
  newTaskHistory.type = value.type;
  newTaskHistory.active = value.active;
  newTaskHistory.complete = value.complete;
  await newTaskHistory.save();
}

@Injectable()
export class TaskHistoryInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      tap((value: Task) => {
        saveTaskHistory(value);
      }),
      catchError((err) => throwError(new BadGatewayException(err))),
    );
  }
}
