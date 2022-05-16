import { FastifyRequest, FastifyReply } from "fastify";

import { project } from "../services";
import { Project } from "../entities";

async function getProjectById(
  req: FastifyRequest<{
    Params: { projectId: string };
  }>,
  res: FastifyReply,
) {
  const projectId = Number(req.params.projectId);

  if (isNaN(projectId) || !projectId) throw new Error(`Invalid project id: ${projectId}`);

  const retrievedProject = await project.getProjectById(projectId);

  return res.send(retrievedProject);
}

async function editProjectById(
  req: FastifyRequest<{
    Params: { projectId: string };
    Body: Project;
  }>,
  res: FastifyReply,
) {
  const projectId = Number(req.params.projectId);
  const editRequestBody = req.body;

  if (isNaN(projectId) || !projectId) throw new Error(`Invalid project id: ${projectId}`);

  const retrievedProject = await project.getProjectMetaById(projectId);
  const updatedProject = await project.updateProject(retrievedProject, editRequestBody);

  return res.send(updatedProject);
}

export default { getProjectById, editProjectById };
