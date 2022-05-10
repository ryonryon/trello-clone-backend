import Fastify from "fastify";
import cors from "@fastify/cors";
import { column, project, ticket } from "./controllers";

const initializeServer = () => {
  const server = Fastify();

  server.register(cors, {
    origin: "*",
  });

  // project
  server.get("/projects/:projectId", project.getProjectById);
  server.put("/projects/:projectId", project.editProjectById);

  // column
  server.post("/projects/:projectId/columns", column.createColumn);
  server.put("/projects/:projectId/columns/:columnId", column.editColumnById);

  // ticket
  server.post("/projects/:projectId/columns/:columnId/tickets", ticket.createTicket);
  server.delete("/projects/:projectId/columns/:columnId/tickets/:ticketId", ticket.deleteTicket);
  server.put("/projects/:projectId/columns/:columnId/tickets/:ticketId", ticket.editTicket);

  server.listen(5030, (err, address) => {
    if (err) {
      console.error(err);

      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
  });

  return server;
};

export { initializeServer };
