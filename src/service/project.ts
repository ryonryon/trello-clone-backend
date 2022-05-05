import { FastifyReply, FastifyRequest } from "fastify";
import { Project } from "../entities";

/**
 * Retrieves a project from DB. It returns error either;
 * 1. Passed project id is invalid - not convertible to Number
 * 2. Project couldn't be found by the passed id
 */
async function getProjectById(projectId: string): Promise<Project> {
  const projectIdQuery = Number(projectId);

  if (isNaN(projectIdQuery) || !projectIdQuery) throw new Error(`Invalid project id: ${projectIdQuery}`);

  const project = await Project.findOneBy({
    id: projectIdQuery,
  });

  if (!project) throw new Error(`Project not found for id: ${projectIdQuery}`);

  return project;
}

/**
 * Updates passed project with requested one. It'd return an error is request contains unexpected kay.
 * @param originalProject - Original project to be updated. Should includes all information of a project
 * @param updateRequestProject - Request body which is in a shape of `Project`
 * @returns Project
 */
async function updateProject(originalProject: Project, updateRequestProject: Partial<Project>) {
  // Check if there's any unexpected key included in the request
  const isAllRequestKeysAssignable = Object.keys(updateRequestProject).some((key) => {
    return Object.keys(originalProject).includes(key);
  });

  if (!isAllRequestKeysAssignable)
    throw new Error(`Could not update the project with the request body: ${JSON.stringify(updateRequestProject)}`);

  const updatedProject = Object.assign(originalProject, updateRequestProject);

  const resultProject = await Project.save(updatedProject);

  return resultProject;
}

async function editProjectById(
  req: FastifyRequest<{
    Params: { projectId: string };
    Body: Project;
  }>,
  res: FastifyReply,
): Promise<Project> {
  const projectIdQuery = req.params.projectId;
  const editRequestBody = req.body;

  const retrievedProject = await getProjectById(projectIdQuery);
  const updatedProject = await updateProject(retrievedProject, editRequestBody);

  return res.send(updatedProject);
}

export default {
  getProjectById,
  updateProject,
  editProjectById,
};
