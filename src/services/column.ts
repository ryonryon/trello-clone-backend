import { Column } from "../entities";

/**
 * Retrieves a column from DB. It returns error either;
 * 1. Passed column id is invalid - not convertible to Number
 * 2. Column couldn't be found by the passed id
 */
async function getColumnById(columnId: string): Promise<Column> {
  const columnIdQuery = Number(columnId);

  if (isNaN(columnIdQuery) || !columnIdQuery) throw new Error(`Invalid column id: ${columnIdQuery}`);

  const column = await Column.findOneBy({
    id: columnIdQuery,
  });

  if (!column) throw new Error(`Column not found for id: ${columnIdQuery}`);

  return column;
}

export default { getColumnById };
