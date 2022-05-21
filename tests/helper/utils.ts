import { Column, Project, Ticket } from "../../src/entities";

/**
 * Mock Project data with 2 columns and each column has 2 tickets
 */
export async function createTestProject(): Promise<Project> {
  const tickets = await Promise.all(
    Array.from({ length: 4 }, (_, i) => i).map(async (_i) => {
      const t = new Ticket();
      t.name = `mock ticket ${_i} name`;
      t.description = `mock ticket ${_i} description`;
      t.sort = _i;

      return await t.save();
    }),
  );

  const columns = await Promise.all(
    Array.from({ length: 2 }, (_, i) => i).map(async (_i) => {
      const c = new Column();
      c.name = `mock column ${_i} name`;
      c.sort = _i;

      c.tickets = _i === 0 ? [tickets[0], tickets[1]] : [tickets[2], tickets[3]];

      return await c.save();
    }),
  );

  const project = new Project();
  project.name = "mock project name";
  project.description = "mock project description";
  project.columns = columns;
  project.tickets = tickets;

  const createdProject = await project.save();

  return createdProject;
}

export async function createTestTicket() {
  const ticket = new Ticket();
  ticket.name = `mock ticket name`;
  ticket.description = `mock ticket description`;
  ticket.sort = 0;

  return await ticket.save();
}

/**
 * Mock Project data with 4 columns.
 */
export async function createTestColumns(): Promise<Project> {
  const columns = await Promise.all(
    Array.from({ length: 4 }, (_, i) => i).map(async (_i) => {
      const c = new Column();
      c.name = `mock column ${_i} name`;
      c.sort = _i;
      c.tickets = [];

      return await c.save();
    }),
  );

  const project = new Project();
  project.name = "mock project name";
  project.description = "mock project description";
  project.columns = columns;

  return await project.save();
}
