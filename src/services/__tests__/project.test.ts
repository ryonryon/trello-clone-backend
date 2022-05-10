import { build } from "../../../tests/helper";
import { createTestProject } from "../../../tests/helper/utils";
import { Project } from "../../entities";
import { project } from "../../services";

// make a connection to real server
build();

describe("getProjectColumnCount()", () => {
  test.todo("passed id that exists - should return a number of columns in the project");

  test.todo("passed id that DOES NOT exist - should return an error message with the passed id");
});

describe("getProjectMetaById()", () => {
  let mockProject: Project;

  beforeAll(async () => {
    mockProject = await createTestProject();
  });

  afterAll(async () => {
    await mockProject.remove();
  });

  test("passed id that exists - should return a project with the passed id", async () => {
    // Arrange
    const mockedId = mockProject.id;

    // Act
    const res = await project.getProjectMetaById(mockProject.id.toString());

    // Assert
    expect(res.id).toEqual(mockedId);
  });

  test("passed id that DOES NOT exist - should return an error message with the passed id", async () => {
    // Arrange
    const mockedId = "1242323";
    const expectedErrorMessage = `Project not found for id: ${mockedId}`;

    // Act/Assert
    await expect(project.getProjectMetaById(mockedId)).rejects.toThrow(expectedErrorMessage);
  });
});

describe("getProjectById()", () => {
  let mockProject: Project;

  beforeAll(async () => {
    mockProject = await createTestProject();
  });

  afterAll(async () => {
    await mockProject.remove();
  });

  test("passed id that exists - should return a project with the passed id", async () => {
    // Arrange
    const mockedId = mockProject.id;

    // Act
    const res = await project.getProjectMetaById(mockProject.id.toString());

    // Assert
    expect(res.id).toEqual(mockedId);
  });

  test("passed id that DOES NOT exist - should return an error message with the passed id", async () => {
    // Arrange
    const mockedId = "1242323";
    const expectedErrorMessage = `Project not found for id: ${mockedId}`;

    // Act/Assert
    await expect(project.getProjectMetaById(mockedId)).rejects.toThrow(expectedErrorMessage);
  });
});

describe("updateProject()", () => {
  let mockProject: Project;

  beforeAll(async () => {
    mockProject = await createTestProject();
  });

  afterAll(async () => {
    await mockProject.remove();
  });

  test("passed proper request body - should return an updated body", async () => {
    // Arrange
    const mockedOriginalBody = {
      id: mockProject.id,
      name: mockProject.name,
      description: mockProject.description,
    } as Project;
    const mockedRequestBody = {
      name: "Test has been successed",
    };
    const expectedResult = {
      id: mockProject.id,
      name: mockedRequestBody.name,
      description: mockProject.description,
    };

    // Act
    const res = await project.updateProject(mockedOriginalBody, mockedRequestBody);

    // Assert
    expect(res).toEqual(expectedResult);
  });

  test("passed broken request body - should return an error message with the passed body", async () => {
    // Arrange
    const mockedOriginalBody = {
      id: mockProject.id,
      name: mockProject.name,
      description: mockProject.description,
    } as Project;
    const mockedRequestBody = {
      crazyKey: "Broken broken",
    } as unknown as Project;
    const expectedErrorMessage = 'Could not update the project with the request body: {"crazyKey":"Broken broken"}';

    // Act
    await expect(project.updateProject(mockedOriginalBody, mockedRequestBody)).rejects.toThrow(expectedErrorMessage);
  });
});
