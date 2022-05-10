import { Column, ColumnInput, Project } from "../entities";
import { getProjectColumnCount } from "./project";

/**
 * create column with requested one. It'd return an error is request contains unexpected kay.
 * @param createRequestColumn - Request body which is in a shape of `Column`
 * @param project - Request body which is in a shape of `Project`
 * @returns Column
 */
async function createColumn(createRequestColumn: Partial<ColumnInput>, project: Project) {
  const columnName = createRequestColumn.name;

  if (!columnName || !columnName.length) throw new Error("name is required to create column");

  const columnCount = await getProjectColumnCount(project.id);

  return await Column.save({
    name: columnName,
    sort: columnCount + 1,
    project,
  });
}

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

/**
 * Updates passed column with requested one. It'd return an error if name is empty.
 * @param originalColumn - Original column to be updated. Should includes all information of a column
 * @param updateRequestColumn - Request body which is in a shape of `ColumnInput`
 * @returns Column
 */
async function updateColumn(originalColumn: Column, { name }: Partial<ColumnInput>) {
  if (name && !name.length) throw new Error("Column name must not be empty");

  const updatedColumn = Object.assign(originalColumn, { name });

  const resultColumn = await Column.save(updatedColumn);

  return resultColumn;
}

export default { createColumn, getColumnById, updateColumn };
