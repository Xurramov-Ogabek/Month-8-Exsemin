import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ModuleEntity } from '../../modules/entities/module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() title: string;

  @Column('text') content: string;

  @ManyToOne(() => ModuleEntity, module => module.lessons, { onDelete: 'CASCADE' })
  module: ModuleEntity;
}