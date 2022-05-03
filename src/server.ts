import Fastify from "fastify";
import cors from "@fastify/cors";
import { project, projects } from "./controllers";
import editTicket from "./controllers/ticket";

const initializeServer = () => {
  const server = Fastify();

  server.register(cors, {
    origin: "*",
  });

  // project
  server.get("/projects", projects);
  server.get("/projects/:projectId", project);
  // ticket
  server.put("/tickets/:ticketId", editTicket);

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
