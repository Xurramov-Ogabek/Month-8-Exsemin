import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ModuleEntity } from '../../modules/entities/module.entity';
import { User } from '../../users/entities/user.entity';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ type: 'int', nullable: true })
  grade: number | null;

  @ManyToOne(() => ModuleEntity, (module) => module.assignment, { onDelete: 'CASCADE' })
  module: ModuleEntity;

  @ManyToOne(() => User, (user) => user.assignments, { onDelete: 'CASCADE' })
  student: User;

  @OneToMany(() => Result, (result) => result.assignment)
  results: Result[];
}