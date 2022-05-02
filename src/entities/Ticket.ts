import { BaseEntity, Column as ORMColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Column from "./Column";
import Project from "./Project";

@Entity({ name: "tickets" })
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "ticket_id" })
  id!: number;

  @ORMColumn("varchar", {
    nullable: false,
  })
  name!: string;

  @ORMColumn("text", { nullable: true })
  description!: string | null;

  @ORMColumn("integer", {
    nullable: false,
  })
  sort!: number;

  @ManyToOne(() => Project, (project) => project.tickets)
  @JoinColumn({ name: "project_id" })
  project!: Project;

  @ManyToOne(() => Column, (column) => column.tickets)
  @JoinColumn({ name: "column_id" })
  column!: Column;
}
