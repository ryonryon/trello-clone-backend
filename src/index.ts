import { initializeDatabase } from "./database";
import { initializeServer } from "./server";

import "dotenv/config";

const initializeApp = async (): Promise<void> => {
  await initializeDatabase();

  initializeServer();
};

initializeApp();
