import { Project } from "../entities";

/**
 * Retrieves number of columns in the project. It returns error either;
 * 1. Passed project id is invalid - not convertible to Number
 */
export async function getProjectColumnCount(projectId: number): Promise<number> {
  if (isNaN(projectId) || !projectId) throw new Error(`Invalid project id: ${projectId}`);

  return await Project.count({
    where: {
      id: projectId,
    },
    relations: {
      columns: true,
    },
  });
}

/**
 * Retrieves a project data with columns and tickets from DB. It returns error either;
 * 1. Passed project id is invalid - not convertible to Number
 * 2. Project couldn't be found by the passed id
 */
async function getProjectById(projectId: string): Promise<Project> {
  const projectIdQuery = Number(projectId);

  if (isNaN(projectIdQuery) || !projectIdQuery) throw new Error(`Invalid project id: ${projectIdQuery}`);

  const project = await Project.findOne({
    where: {
      id: projectIdQuery,
    },
    relations: {
      columns: {
        tickets: true,
      },
    },
    order: {
      columns: {
        id: "ASC",
        tickets: {
          id: "ASC",
        },
      },
    },
  });

  if (!project) throw new Error(`Project not found for id: ${projectIdQuery}`);

  return project;
}

/**
 * Retrieves a project meta data from DB. It returns error either;
 * 1. Passed project id is invalid - not convertible to Number
 * 2. Project couldn't be found by the passed id
 */
async function getProjectMetaById(projectId: string): Promise<Project> {
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

export default { getProjectColumnCount, getProjectById, getProjectMetaById, updateProject };
