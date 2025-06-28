import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assignment, (a) => a.results, { onDelete: 'CASCADE' })
  assignment: Assignment;

  @ManyToOne(() => User, (u) => u.results, { onDelete: 'CASCADE' })
  student: User;

  @Column()
  score: number;
}