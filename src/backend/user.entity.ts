import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryColumn({type:'varchar'})
    username: string

    @Column({type:'varchar'})
    firstName: string

    @Column({type:'varchar'})
    lastName: string

    @Column({type:'varchar'})
    phoneNumber: string

    @Column({type:'varchar'})
    password: string

    @Column({type:'boolean'})
    isAdmin: boolean
}