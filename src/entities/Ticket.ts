import { BaseEntity, Column as ORMColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Column from "./Column";
import Project from "./Project";

@Entity({ name: "tickets" })
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ORMColumn("varchar")
  name!: string;

  @ORMColumn("text", { nullable: true })
  description!: string | null;

  @ORMColumn("integer")
  order!: number;

  @ManyToOne(() => Project, (project) => project.tickets)
  project!: Project;

  @ManyToOne(() => Column, (column) => column.tickets)
  column!: Column;
}
