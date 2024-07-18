import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from 'typeorm/persistence/Subject';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Level, (level) => level.tips)
  level: Level;

  @ManyToOne(() => Subject, {nullable: false})
  subject: Subject;
}
