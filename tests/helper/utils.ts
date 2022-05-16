import { Column, Project, Ticket } from "../../src/entities";

export async function createTestColumn(): Promise<Column> {
  const tickets = await Promise.all(
    Array.from({ length: 2 }, (_, i) => i).map(async (_i) => {
      const t = new Ticket();
      t.name = `mock ticket ${_i} name`;
      t.description = `mock ticket ${_i} description`;
      t.sort = _i;

      return await t.save();
    }),
  );

  const column = new Column();
  column.name = "mock column name";

  const createdColumn = await column.save();

  return createdColumn;
}

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

      return await c.save();
    }),
  );

  columns[0].tickets = [tickets[0], tickets[1]];
  columns[1].tickets = [tickets[2], tickets[3]];

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
