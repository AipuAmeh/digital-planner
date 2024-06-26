import { Column, ManyToOne } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column({ type: 'varchar', length: 100 })
  todo: string;

  @Column({ type: 'varchar', length: 250 })
  reflectionText: string;

  @CreateDateColumn({ type: 'date' })
  todaysDate: Date;

  @Column()
  priority: string;

  @Column({ default: false })
  completed: boolean;
}
