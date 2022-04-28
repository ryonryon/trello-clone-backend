import Fastify from "fastify";
import cors from "fastify-cors";
import projects from "./controllers/projects";
import createConnection from "./database/createConnection";

import "dotenv/config";

const initializeDatabase = async (): Promise<void> => {
  try {
    await createConnection();
  } catch (error) {
    console.log(error);
  }
};

const initializeServer = () => {
  const server = Fastify({
    logger: true,
  });

  server.register(cors, {
    origin: "*",
  });

  server.get("/projects", projects);

  server.listen(5030, (err, address) => {
    if (err) {
      console.error(err);

      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
  });
};

const initializeApp = async (): Promise<void> => {
  await initializeDatabase();

  initializeServer();
};

initializeApp();
