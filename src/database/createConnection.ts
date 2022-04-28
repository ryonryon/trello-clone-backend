import { DataSource } from "typeorm";

import * as entities from "../entities";

export default async (): Promise<DataSource> => {
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

  return await dataSource.initialize();
};
