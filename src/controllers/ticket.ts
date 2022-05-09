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
  const projectId = req.params.projectId;
  const columnId = req.params.columnId;
  const createRequestBody = req.body;

  const retrievedProject = await project.getProjectById(projectId);
  const retrievedColumn = await column.getColumnById(columnId);
  const createdTicket = await ticket.createTicket(createRequestBody, retrievedProject, retrievedColumn);

  return res.send(createdTicket);
}

export async function editTicket(
  req: FastifyRequest<{
    Params: { ticketId: string };
    Body: Ticket;
  }>,
  res: FastifyReply,
) {
  const ticketIdQuery = req.params.ticketId;
  const editRequestBody = req.body;

  const retrievedTicket = await ticket.getTicketById(ticketIdQuery);
  const updatedTicket = await ticket.updateTicket(retrievedTicket, editRequestBody);

  return res.send(updatedTicket);
}

export default {
  createTicket,
  editTicket,
};
