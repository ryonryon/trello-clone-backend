import { FastifyRequest, FastifyReply } from "fastify";

import { Ticket } from "../entities";
import { ticket } from "../services";

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
  editTicket,
};
