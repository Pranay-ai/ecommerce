import { CategoryEntity } from "src/categories/entities/category.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('products')
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type: 'decimal', precision:10, scale:2, default: 0})
    price: number;

    @Column()
    stock: number;

    @Column('simple-array')
    image: string[];

    @CreateDateColumn()
    created_at: Timestamp

    @UpdateDateColumn()
    updated_at: Timestamp

    @ManyToOne(() => UserEntity, (user) => user.products)
    addedBy: UserEntity;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category: CategoryEntity;


}
