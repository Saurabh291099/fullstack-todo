import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SignUp {
  // If id is UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  refreshToken?: string;
}
