import { FastifyInstance } from "fastify";
import { initializeDatabase } from "../../src/database";
import { initializeServer } from "../../src/server";

/**
 * Helper function to set up all the needed environment for integration test.
 * With this function, it will set DB and server at once.
 */
export function build(): FastifyInstance {
  // Set up server. This instance will be the return
  // for jest to access and manipulate its APIs
  const app = initializeServer();

  // Set up DB with mocked environment valuables.
  beforeAll(async () => {
    process.env.POSTGRES_USER = "root";
    process.env.POSTGRES_PASSWORD = "root";
    process.env.POSTGRES_DB = "trello-clone";
    await initializeDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  return app;
}
