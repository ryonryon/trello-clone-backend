import { FastifyReply, FastifyRequest } from "fastify";
import { Ticket } from "../entities";

export async function getTicketById(ticketId: string): Promise<Ticket> {
  const ticketIdQuery = Number(ticketId);

  if (isNaN(ticketIdQuery) || !ticketIdQuery) throw new Error(`Invalid ticket id: ${ticketIdQuery}`);

  const ticket = await Ticket.findOneBy({
    id: ticketIdQuery,
  });

  if (!ticket) throw new Error(`Ticket not found for id: ${ticketIdQuery}`);

  return ticket;
}

export async function editTicketById(
  req: FastifyRequest<{
    Params: { ticketId: string };
    Body: { name: string };
  }>,
  res: FastifyReply,
): Promise<Ticket> {
  const ticketIdQuery = req.params.ticketId;
  const requestBodyName = req.body.name;

  const ticket = await getTicketById(ticketIdQuery);
  ticket.name = requestBodyName;

  const resultTicket = await Ticket.save(ticket);

  return res.send(resultTicket);
}
