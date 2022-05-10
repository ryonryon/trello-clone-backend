import getDataSource from "./createConnection";

const initializeDatabase = async (): Promise<void> => {
  try {
    await getDataSource().initialize();
  } catch (error) {
    console.log(error);
  }
};

const destroyDatabaseConnection = async (): Promise<void> => {
  try {
    await getDataSource().destroy();
  } catch (error) {
    console.log(error);
  }
};

export { initializeDatabase, destroyDatabaseConnection };
