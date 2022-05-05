import { FastifyRequest, FastifyReply } from "fastify";

import { Project } from "../entities";
import { project } from "../service";

async function getProjectById(
  req: FastifyRequest<{
    Params: { projectId: string };
  }>,
  res: FastifyReply,
) {
  const project = await Project.findOneBy({ id: Number(req.params.projectId) });

  return res.send(project);
}

async function editProjectById(
  req: FastifyRequest<{
    Params: { projectId: string };
    Body: Project;
  }>,
  res: FastifyReply,
) {
  return project.editProjectById(req, res);
}

export default { getProjectById, editProjectById };
