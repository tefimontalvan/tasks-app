import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty } from 'class-validator';
import { TaskType } from './taskType.enum';
import { TaskHistory } from 'src/task-history/task-history.entity';

@Entity()
export class Task extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @MaxLength(10, { always: true })
  @IsNotEmpty({ message: 'El título es requerido' })
  @Column({ length: 20, nullable: false, unique: true })
  title: string;

  @ApiProperty()
  @MaxLength(500, { always: true })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @Column({ length: 500, nullable: false })
  description: string;

  @Column({ nullable: false })
  type: TaskType;

  @OneToMany((type) => TaskHistory, (taskHistory) => taskHistory.task, {
    cascade: true,
  })
  taskHistory: TaskHistory[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'boolean', default: false })
  complete: boolean;
}
