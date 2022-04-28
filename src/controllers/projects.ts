import { FastifyRequest, FastifyReply } from "fastify";
import { Projects } from "../entities";

export default async function projects(_: FastifyRequest, res: FastifyReply) {
  const projects = await Projects.find();

  return res.send(projects);
}
