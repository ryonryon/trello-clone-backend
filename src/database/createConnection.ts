import { DataSource } from "typeorm";

import * as entities from "../entities";

/**
 * Returns an instance of DataSource object which contains
 * functions to establish/destroy connection between server and the DB
 */
export default (): DataSource => {
  const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: Object.values(entities),
    synchronize: true,
  });

  return dataSource;
};
