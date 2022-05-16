import { build } from "../../../tests/helper";
import { createTestColumns } from "../../../tests/helper/utils";
import { Project } from "../../entities";
import { column } from "..";

// make a connection to real server
build();

describe("createColumn()", () => {
  test.todo("passed proper request body - should return an created body");

  test.todo("passed body with name undefined - should return an error message that name is required");

  test.todo("passed body with empty name - should return an error message that name is required");
});

describe("geColumnById()", () => {
  let mockProject: Project;

  beforeAll(async () => {
    mockProject = await createTestColumns();
  });

  beforeAll(async () => {
    await mockProject.remove();
  });

  test("passed id that exists - should return a column with the passed id", async () => {
    // Arrange
    const mockedId = mockProject.columns[0];

    // Act
    const res = await column.getColumnById(mockProject.columns[0].id);

    // Assert
    expect(res.id).toBe(mockedId);
  });

  test("passed id that DOES NOT exist - should return an error message with the passed id", async () => {
    // Arrange
    const mockedId = 1242323;
    const expectedErrorMessage = `Column not found for id: ${mockedId}`;

    // Act/Assert
    await expect(column.getColumnById(mockedId)).rejects.toThrow(expectedErrorMessage);
  });
});

describe("updateColumnSort()", () => {
  let mockProject: Project;

  beforeAll(async () => {
    mockProject = await createTestColumns();
  });

  beforeAll(async () => {
    await mockProject.remove();
  });

  test("Passed proper request params and body - it should successfully return the updated body", async () => {
    // Arrange
    const updatedProject = await column.updateColumnsSort(mockProject, {
      columnId: mockProject.columns[3].id,
      sort: 0,
    });

    // Act/Assert
    expect(updatedProject.columns[0].name).toBe("mock column 2 name");
    expect(updatedProject.columns[1].name).toBe("mock column 0 name");
    expect(updatedProject.columns[2].name).toBe("mock column 1 name");
    expect(updatedProject.columns[3].name).toBe("mock column 3 name");
  });

  test("Passed columnId that DOES NOT exist - should return an error message with the passed id", async () => {
    // Arrange
    const mockedId = 1242323;
    const expectedErrorMessage = `Column not found for id: ${mockedId}`;

    // Act/Assert
    await expect(column.updateColumnsSort(mockProject, { columnId: mockedId, sort: 0 })).rejects.toThrow(
      expectedErrorMessage,
    );
  });

  test("Passed sort that is less than 0 - should return an error message that sort must be 0 or more", async () => {
    // Arrange
    const mockedSort = -1;
    const expectedErrorMessage = `sort: ${mockedSort} must be 0 or more and less than length of project.colmns`;

    // Act/Assert
    await expect(
      column.updateColumnsSort(mockProject, { columnId: mockProject.columns[0].id, sort: mockedSort }),
    ).rejects.toThrow(expectedErrorMessage);
  });
});
