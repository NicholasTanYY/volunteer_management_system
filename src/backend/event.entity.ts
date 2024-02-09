import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Event {
    @PrimaryColumn({type:'varchar'})
    name: string

    @Column({type:'varchar'})
    date: string

    @Column({type:'varchar'})
    startTime: string //HH:MM format

    @Column({type:'varchar'})
    endTime: string //HH:MM format

    @Column({type:'simple-array'})
    category: string[]

    @Column({type:'varchar'})
    description: boolean

    @Column({type:'varchar'})
    createdBy: string
}