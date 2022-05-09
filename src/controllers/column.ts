import { FastifyRequest, FastifyReply } from "fastify";

import ColumnInput from "../entities/ColumnInput";
import { column, project } from "../services";

export async function createColumn(
  req: FastifyRequest<{
    Params: { projectId: string };
    Body: ColumnInput;
  }>,
  res: FastifyReply,
) {
  const projectId = req.params.projectId;
  const createRequestBody = req.body;

  const retrievedProject = await project.getProjectById(projectId);
  const createdColumn = await column.createColumn(createRequestBody, retrievedProject);

  return res.send(createdColumn);
}

export default {
  createColumn,
};
