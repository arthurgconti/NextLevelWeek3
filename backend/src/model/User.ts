import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt'


@Entity('users')

export default class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    passwordResetToken: string;

    @Column({ nullable: true })
    passwordRestExpires: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async generateHash() {
        const saltRounds = Math.floor(10 * Math.random() + 1)
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
}