import { FastifyRequest, FastifyReply } from "fastify";

import { project } from "../services";
import { Project } from "../entities";

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
  const projectIdQuery = req.params.projectId;
  const editRequestBody = req.body;

  const retrievedProject = await project.getProjectById(projectIdQuery);
  const updatedProject = await project.updateProject(retrievedProject, editRequestBody);

  return res.send(updatedProject);
}

export default { getProjectById, editProjectById };
