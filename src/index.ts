import { initializeServer } from "./server";
import { initializeDatabase } from "./database";

import "dotenv/config";

const initializeApp = async (): Promise<void> => {
  await initializeDatabase();
  initializeServer();
};

initializeApp();
