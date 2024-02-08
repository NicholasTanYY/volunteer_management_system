import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    username: string

    @Column({type:'varchar'})
    firstName: string

    @Column({type:'varchar'})
    lastName: string

    @Column({type:'varchar'})
    phoneNumber: string

    @Column({type:'varchar'})
    password: string
}