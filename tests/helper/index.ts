import { FastifyInstance } from "fastify";
import { DataSource } from "typeorm";
import dataSource from "../../src/database/createConnection";
import { initializeServer } from "../../src/server";

/**
 * Helper function to set up all the needed environment for integration test.
 * With this function, it will set DB and server at once.
 */
export function build(): FastifyInstance {
  // Set up server. This instance will be the return
  // for jest to access and manipulate its APIs
  const app = initializeServer();
  let database: DataSource;

  // Set up DB with mocked environment valuables.
  beforeAll(async () => {
    process.env.POSTGRES_USER = "test";
    process.env.POSTGRES_PASSWORD = "test";
    process.env.POSTGRES_DB = "trello-clone-test";

    database = dataSource();
    await database.initialize();
  });

  // Clean up both server and database
  afterAll(async () => {
    await database.destroy();
    await app.close();
    app.server.unref();
  });

  return app;
}
