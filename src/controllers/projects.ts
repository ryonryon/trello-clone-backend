import { FastifyRequest, FastifyReply } from "fastify";
import { Project } from "../entities";

export default async function projects(_: FastifyRequest, res: FastifyReply) {
  const projects = await Project.find();

  return res.send(projects);
}
