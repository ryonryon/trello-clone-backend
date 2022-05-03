import { FastifyRequest, FastifyReply } from "fastify";
import { editTicketById } from "../service/ticket";

export default async function editTicket(
  req: FastifyRequest<{
    Params: { ticketId: string };
    Body: { name: string };
  }>,
  res: FastifyReply,
) {
  return editTicketById(req, res);
}
