import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() name: string;

  @Column('text') description: string;

  @Column('decimal') price: number;

  @Column() teacher: string;

  @Column() category: string;

  @Column() level: string;
  modules: any;
}
