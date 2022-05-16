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

export async function editColumnById(
  req: FastifyRequest<{
    Params: { projectId: string; columnId: string };
    Body: Partial<ColumnInput>;
  }>,
  res: FastifyReply,
) {
  const columnId = req.params.columnId;
  const editRequestBody = req.body;

  const retrievedColumn = await column.getColumnById(columnId);
  const updatedColumn = await column.updateColumn(retrievedColumn, editRequestBody);

  return res.send(updatedColumn);
}

export async function updateColumnsSort(
  req: FastifyRequest<{
    Params: { projectId: string };
    Body: {
      columnId: number;
      sort: number;
    };
  }>,
  res: FastifyReply,
) {
  const projectId = req.params.projectId;
  const editRequestBody = req.body;

  const retrievedProjectColumns = await project.getProjectColumns(projectId);
  const updatedProjectColumns = await column.updateColumnsSort(retrievedProjectColumns, editRequestBody);

  return res.send(updatedProjectColumns);
}

export default {
  createColumn,
  editColumnById,
  updateColumnsSort,
};
