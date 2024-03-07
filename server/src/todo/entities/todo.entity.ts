import { Column, ManyToOne } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Todo {
  /**
   * this decorator will help to auto generate id for the table.
   */
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
}
