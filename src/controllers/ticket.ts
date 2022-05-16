import { FastifyRequest, FastifyReply } from "fastify";

import { Ticket, TicketInput } from "../entities";
import { column, project, ticket } from "../services";

export async function createTicket(
  req: FastifyRequest<{
    Params: { projectId: string; columnId: string };
    Body: Partial<TicketInput>;
  }>,
  res: FastifyReply,
) {
  const projectId = Number(req.params.projectId);
  const columnId = Number(req.params.columnId);
  const createRequestBody = req.body;

  if (isNaN(projectId) || !projectId) throw new Error(`Invalid project id: ${projectId}`);
  if (isNaN(columnId) || !columnId) throw new Error(`Invalid column id: ${columnId}`);

  const retrievedProject = await project.getProjectById(projectId);
  const retrievedColumn = await column.getColumnById(columnId);
  const createdTicket = await ticket.createTicket(createRequestBody, retrievedProject, retrievedColumn);

  return res.send(createdTicket);
}

export async function deleteTicket(
  req: FastifyRequest<{
    Params: { projectId: string; columnId: string; ticketId: string };
  }>,
  res: FastifyReply,
) {
  const ticketId = Number(req.params.ticketId);

  if (isNaN(ticketId) || !ticketId) throw new Error(`Invalid ticket id: ${ticketId}`);

  const deletedTicket = await ticket.deleteTicketById(ticketId);

  return res.send(deletedTicket);
}

export async function editTicket(
  req: FastifyRequest<{
    Params: { ticketId: string };
    Body: Ticket;
  }>,
  res: FastifyReply,
) {
  const ticketId = Number(req.params.ticketId);
  const editRequestBody = req.body;

  if (isNaN(ticketId) || !ticketId) throw new Error(`Invalid ticket id: ${ticketId}`);

  const retrievedTicket = await ticket.getTicketById(ticketId);
  const updatedTicket = await ticket.updateTicket(retrievedTicket, editRequestBody);

  return res.send(updatedTicket);
}

export default {
  createTicket,
  deleteTicket,
  editTicket,
};
