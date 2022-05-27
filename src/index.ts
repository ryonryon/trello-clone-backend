import { initializeDatabase } from "./database";
import { initializeServer } from "./server";

import "dotenv/config";

const initializeApp = async (): Promise<void> => {
  await initializeDatabase();

  const server = initializeServer();

  server.listen(5030, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
  });
};

initializeApp();
