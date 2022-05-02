import Fastify from "fastify";
import cors from "@fastify/cors";
import { project, projects } from "./controllers";

const initializeServer = () => {
  const server = Fastify();

  server.register(cors, {
    origin: "*",
  });

  server.get("/projects", projects);
  server.get("/projects/:projectId", project);

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
