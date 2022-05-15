import { Column, Project, Ticket, TicketInput } from "../entities";

/**
 * create ticket with requested one. It'd return an error is request contains unexpected kay.
 * @param createRequestTicket - Request body which is in a shape of `Ticket`
 * @param project - Request body which is in a shape of `Project`
 * @param column - Request body which is in a shape of `Column`
 * @returns Ticket
 */
async function createTicket(createRequestTicket: Partial<TicketInput>, project: Project, column: Column) {
  if (!createRequestTicket.name || !createRequestTicket.name.length)
    throw new Error("name is required to create ticket");

  return await Ticket.save({
    ...createRequestTicket,
    project,
    column,
  });
}

/**
 * Delete a ticket by ticketId. It returns error either;
 * 1. Passed ticket id is invalid - not convertible to Number
 * 2. Ticket couldn't be found by the passed id
 */
async function deleteTicketById(ticketId: number) {
  const ticket = await Ticket.findOneBy({ id: ticketId });

  if (!ticket) throw new Error(`Ticket not found for id: ${ticketId}`);

  await ticket.remove();

  return ticket;
}

/**
 * Retrieves a ticket from DB. It returns error either;
 * 1. Passed ticket id is invalid - not convertible to Number
 * 2. Ticket couldn't be found by the passed id
 */
async function getTicketById(ticketId: number): Promise<Ticket> {
  const ticket = await Ticket.findOneBy({
    id: ticketId,
  });

  if (!ticket) throw new Error(`Ticket not found for id: ${ticketId}`);

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
  createTicket,
  deleteTicketById,
  getTicketById,
  updateTicket,
};
