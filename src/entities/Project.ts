import { BaseEntity, Column as ORMColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Ticket from "./Ticket";

@Entity({ name: "projects" })
export default class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ORMColumn("varchar")
  name!: string;

  @ORMColumn("text", { nullable: true })
  description!: string | null;

  @OneToMany(() => Ticket, (ticket) => ticket.project)
  tickets!: Ticket[];
}
