import { FastifyRequest, FastifyReply } from "fastify";

import { Ticket } from "../entities";
import { editTicketById } from "../service/ticket";

export async function editTicket(
  req: FastifyRequest<{
    Params: { ticketId: string };
    Body: Ticket;
  }>,
  res: FastifyReply,
) {
  return editTicketById(req, res);
}

export default {
  editTicket,
};
