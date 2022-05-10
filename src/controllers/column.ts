import { FastifyRequest, FastifyReply } from "fastify";

import { column, project } from "../services";
import { ColumnInput } from "../entities";

export async function createColumn(
  req: FastifyRequest<{
    Params: { projectId: string };
    Body: Partial<ColumnInput>;
  }>,
  res: FastifyReply,
) {
  const projectId = req.params.projectId;
  const createRequestBody = req.body;

  const retrievedProject = await project.getProjectById(projectId);
  const createdTicket = await column.createColumn(createRequestBody, retrievedProject);

  return res.send(createdTicket);
}

export default {
  createColumn,
};
