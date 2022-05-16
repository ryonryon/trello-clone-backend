import { build } from "../../../tests/helper";
import { createTestColumn, createTestProject } from "../../../tests/helper/utils";
import { Column, Project } from "../../entities";
import { column, project } from "..";

// make a connection to real server
build();

describe("createColumn()", () => {
  let mockedProject: Project;

  beforeAll(async () => {
    mockedProject = await createTestProject();
  });

  afterAll(async () => {
    await mockedProject.remove();
  });

  test("Passed proper request body - should return an created body", async () => {
    // Arrange
    const mockedColumnName = "create column test";

    // Act
    const createdColumn = await column.createColumn(
      {
        name: mockedColumnName,
      },
      mockedProject,
    );
    const newMockedProject = await project.getProjectById(mockedProject.id.toString());
    const newColumnsLength = newMockedProject.columns.length;

    // Assert
    expect(createdColumn.name).toBe(mockedColumnName);
    expect(newColumnsLength).toBe(mockedProject.columns.length + 1);
    expect(newMockedProject.columns[newColumnsLength - 1].name).toBe(mockedColumnName);
  });

  test("Passed body with name undefined - should return an error message that name is required", async () => {
    // Arrange
    const mockedName = undefined;
    const expectedErrorMessage = `Column name must not be empty`;

    // Act/Assert
    expect(column.createColumn({ name: mockedName }, mockedProject)).rejects.toThrow(expectedErrorMessage);
  });

  test("Passed body with empty name - should return an error message that name is required", async () => {
    // Arrange
    const mockedName = "";
    const expectedErrorMessage = `Column name must not be empty`;

    // Act/Assert
    expect(column.createColumn({ name: mockedName }, mockedProject)).rejects.toThrow(expectedErrorMessage);
  });
});

describe("geColumnById()", () => {
  test("Passed id that exists - should return a column with the passed id", async () => {
    // Arrange
    const mockedId = "1";

    // Act
    const res = await column.getColumnById("1");

    // Assert
    expect(res.id).toEqual(Number(mockedId));
  });

  test("Passed id that DOES NOT exist - should return an error message with the passed id", async () => {
    // Arrange
    const mockedId = "1242323";
    const expectedErrorMessage = `Column not found for id: ${mockedId}`;

    // Act/Assert
    await expect(column.getColumnById(mockedId)).rejects.toThrow(expectedErrorMessage);
  });
});

describe("updateColumn()", () => {
  let mockedColumn: Column;

  beforeAll(async () => {
    mockedColumn = await createTestColumn();
  });

  afterAll(async () => {
    await mockedColumn.remove();
  });

  test("Passed proper request params and body - should return an updated body", async () => {
    // Arrange
    const updatingName = "update column name";

    //Act
    const updatedColumn = await column.updateColumn(mockedColumn, { name: updatingName });

    //Assert
    expect(updatedColumn.name).toBe(updatingName);
  });

  test("Passed body with name undefined - should return an error message that name is required", async () => {
    // Arrange
    const mockedName = undefined;
    const expectedErrorMessage = `Column name must not be empty`;

    // Act/Assert
    expect(column.updateColumn(mockedColumn, { name: mockedName })).rejects.toThrow(expectedErrorMessage);
  });

  test("Passed body with empty name - should return an error message that name is required", async () => {
    // Arrange
    const mockedName = "";
    const expectedErrorMessage = `Column name must not be empty`;

    // Act/Assert
    expect(column.updateColumn(mockedColumn, { name: mockedName })).rejects.toThrow(expectedErrorMessage);
  });
});
