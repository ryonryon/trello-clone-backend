import createConnection from "./createConnection";

const initializeDatabase = async (): Promise<void> => {
  try {
    await createConnection();
  } catch (error) {
    console.log(error);
  }
};

export { initializeDatabase };
