import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryColumn({type:'varchar'})
    username: string

    @Column({type:'varchar'})
    fullName: string

    @Column({type:'varchar'})
    phoneNumber: string

    @Column({type:'varchar'})
    password: string

    @Column({type:'boolean'})
    isAdmin: boolean

    @Column({type:'varchar', nullable: true})
    gender: string

    @Column({type:'varchar', nullable: true})
    dateOfBirth: string

    @Column({type:'varchar', nullable: true})
    email: string

    @Column({type:'varchar', nullable: true})
    availability: string

    @Column({type:'varchar', nullable: true})
    occupation: string

    @Column({type:'varchar', nullable: true})
    school: string

    @Column({type:'simple-array', nullable: true})
    interests: string[] | null

    @Column({type:'simple-array', nullable: true})
    skills: string[] | null
}