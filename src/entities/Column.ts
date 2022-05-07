import {
  BaseEntity,
  Column as ORMColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Project from "./Project";
import Ticket from "./Ticket";

@Entity({ name: "columns" })
export default class Column extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "column_id" })
  id!: number;

  @ORMColumn("varchar", {
    nullable: false,
  })
  name!: string;

  @ORMColumn("integer", {
    nullable: false,
  })
  sort!: number;

  @ManyToOne(() => Project, (project) => project.columns, { onDelete: "CASCADE" })
  @JoinColumn({ name: "project_id" })
  project!: Project;

  @OneToMany(() => Ticket, (ticket) => ticket.column)
  tickets!: Ticket[];
}
