import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  itemId: string;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column()
  category: string;

 @Column({ nullable: true })
vegOrNonVeg: string;

  @Column()
  isSpicy: boolean;

  @Column()
  isPopular: boolean;

  @Column({ nullable: true })
imageUrl?: string;  // or imagePath

 @Column({ nullable: true })  // ✅ fix the description error
  description?: string;

}