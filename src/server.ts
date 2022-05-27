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
  server.put("/projects/:projectId/columns", column.updateColumnsSort);
  server.patch("/projects/:projectId/columns/:columnId", column.editColumnById);

  // ticket
  server.post("/projects/:projectId/columns/:columnId/tickets", ticket.createTicket);
  server.delete("/projects/:projectId/columns/:columnId/tickets/:ticketId", ticket.deleteTicket);
  server.put("/projects/:projectId/columns/:columnId/tickets/:ticketId", ticket.editTicket);

  return server;
};

export { initializeServer };
