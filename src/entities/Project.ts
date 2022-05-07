import { BaseEntity, Column as ORMColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ColumnType from "./Column";
import Ticket from "./Ticket";

@Entity({ name: "projects" })
export default class Project extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "project_id" })
  id!: number;

  @ORMColumn("varchar", {
    nullable: false,
  })
  name!: string;

  @ORMColumn("text", { nullable: true })
  description!: string | null;

  @OneToMany(() => ColumnType, (column) => column.project)
  columns!: ColumnType[];

  @OneToMany(() => Ticket, (ticket) => ticket.project)
  tickets!: Ticket[];
}
