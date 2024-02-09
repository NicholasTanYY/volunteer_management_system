import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'varchar'})
    name: string

    @Column({type:'varchar'})
    datePosted: string

    @Column({type:'varchar'})
    timePosted: string

    @Column({type:'varchar'})
    eventName: string

    @Column({type:'varchar'})
    createdBy: string

    @Column({type:'varchar'})
    description: string


}