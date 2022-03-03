import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskType } from '../taskType.enum';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El título es requerido' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @ApiProperty()
  @IsEnum(TaskType, { message: 'que onda' })
  type: TaskType;
}
