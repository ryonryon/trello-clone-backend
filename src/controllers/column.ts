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
  const projectId = Number(req.params.projectId);
  const createRequestBody = req.body;

  if (isNaN(projectId) || !projectId) throw new Error(`Invalid project id: ${projectId}`);

  const retrievedProject = await project.getProjectById(projectId);
  const createdTicket = await column.createColumn(createRequestBody, retrievedProject);

  return res.send(createdTicket);
}

export async function editColumnById(
  req: FastifyRequest<{
    Params: { projectId: string; columnId: string };
    Body: Partial<ColumnInput>;
  }>,
  res: FastifyReply,
) {
  const columnId = Number(req.params.columnId);
  const editRequestBody = req.body;

  if (isNaN(columnId) || !columnId) throw new Error(`Invalid column id: ${columnId}`);

  const retrievedColumn = await column.getColumnById(columnId);
  const updatedColumn = await column.updateColumn(retrievedColumn, editRequestBody);

  return res.send(updatedColumn);
}

export default {
  createColumn,
  editColumnById,
};
