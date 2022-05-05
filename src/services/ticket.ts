import { Ticket } from "../entities";

/**
 * Retrieves a ticket from DB. It returns error either;
 * 1. Passed ticket id is invalid - not convertible to Number
 * 2. Ticket couldn't be found by the passed id
 */
async function getTicketById(ticketId: string): Promise<Ticket> {
  const ticketIdQuery = Number(ticketId);

  if (isNaN(ticketIdQuery) || !ticketIdQuery) throw new Error(`Invalid ticket id: ${ticketIdQuery}`);

  const ticket = await Ticket.findOneBy({
    id: ticketIdQuery,
  });

  if (!ticket) throw new Error(`Ticket not found for id: ${ticketIdQuery}`);

  return ticket;
}

/**
 * Updates passed ticket with requested one. It'd return an error is request contains unexpected kay.
 * @param originalTicket - Original project to be updated. Should includes all information of a project.
 * @param updateRequestTicket - Request body which is in a shape of `Ticket`
 * @returns Ticket
 */
async function updateTicket(originalTicket: Ticket, updateRequestTicket: Partial<Ticket>) {
  // Check if there's any unexpected key included in the request
  const isAllRequestKeysAssignable = Object.keys(updateRequestTicket).some((key) => {
    return Object.keys(originalTicket).includes(key);
  });

  if (!isAllRequestKeysAssignable)
    throw new Error(`Could not update the ticket with the request body: ${JSON.stringify(updateRequestTicket)}`);

  const updatedTicket = Object.assign(originalTicket, updateRequestTicket);

  const resultTicket = await Ticket.save(updatedTicket);

  return resultTicket;
}

export default {
  getTicketById,
  updateTicket,
};
