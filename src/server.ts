import Fastify from "fastify";
import cors from "@fastify/cors";
import { project, projects, ticket } from "./controllers";

const initializeServer = () => {
  const server = Fastify();

  server.register(cors, {
    origin: "*",
  });

  // project
  server.get("/projects", projects.getProjects);
  server.put("/project/:projectId", project.editProjectById);

  // ticket
  server.put("/tickets/:ticketId", ticket.editTicket);

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
