import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ModuleEntity } from '../../modules/entities/module.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ type: 'int', nullable: true })
  grade: number | null; // ✅ To'g'rilandi

  @ManyToOne(() => ModuleEntity, { onDelete: 'CASCADE' })
  module: ModuleEntity;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  student: User;
}