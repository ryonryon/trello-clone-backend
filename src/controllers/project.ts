import { FastifyRequest, FastifyReply } from "fastify";
import { Project } from "../entities";

export default async function project(
  req: FastifyRequest<{
    Params: { projectId: string };
  }>,
  res: FastifyReply,
) {
  const project = await Project.findOneBy({ id: Number(req.params.projectId) });

  return res.send(project);
}
