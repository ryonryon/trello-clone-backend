import { BaseEntity, Column as ORMColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Ticket from "./Ticket";

@Entity({ name: "columns" })
export default class Column extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ORMColumn("integer")
  order!: number;

  @ORMColumn("varchar")
  name!: string;

  @OneToMany(() => Ticket, (ticket) => ticket.column)
  tickets!: Ticket[];
}
