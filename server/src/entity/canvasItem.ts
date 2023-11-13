import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class CanvasItem extends BaseEntity {
    @PrimaryColumn()
    id: string

    @Column()
    x: number

    @Column()
    y: number

    @Column()
    data: string

    @Column()
    userId: string

    @Column()
    timeCreate: string

    @Column()
    timeUpdate: string
}