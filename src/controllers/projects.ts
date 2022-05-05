import { FastifyRequest, FastifyReply } from "fastify";
import { Project } from "../entities";

async function getProjects(_: FastifyRequest, res: FastifyReply) {
  const projects = await Project.find();

  return res.send(projects);
}

export default {
  getProjects,
};
