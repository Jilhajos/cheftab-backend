import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  emergency_contact: string;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @Column({ default: false })
  id_card: boolean;

  @Column({ default: false })
  bank_details: boolean;

  @Column({ nullable: true })
  imageUrl?: string;
}
