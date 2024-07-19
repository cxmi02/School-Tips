import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from '../../subjects/entities/subjects.entities';
import { Level } from 'src/module/levels/entities/level.entities';

@Entity()
export class Tip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  author: string;

  @Column({ default: false })
  isDeleted: boolean;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Level, (level) => level.tips)
  level: Level;

  @ManyToOne(() => Subject, {nullable: false})
  subject: Subject;
}
