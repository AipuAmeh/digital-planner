import { Column } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  todo: string;

  @Column({ type: 'varchar', length: 250 })
  reflectionText: string;

  @CreateDateColumn()
  todaysDate: Date;

  @Column()
  priority: string;
}
