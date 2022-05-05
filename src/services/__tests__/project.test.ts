import { build } from "../../../tests/helper";
import { Project } from "../../entities";
import { project } from "../../services";

// make a connection to real server
build();

describe("getProjectById()", () => {
  test("passed id that exists - should return a project with the passed id", async () => {
    // Arrange
    const mockedId = "1";

    // Act
    const res = await project.getProjectById("1");

    // Assert
    expect(res.id).toEqual(Number(mockedId));
  });

  test("passed id that DOES NOT exist - should return an error message with the passed id", async () => {
    // Arrange
    const mockedId = "1242323";
    const expectedErrorMessage = `Project not found for id: ${mockedId}`;

    // Act/Assert
    await expect(project.getProjectById(mockedId)).rejects.toThrow(expectedErrorMessage);
  });
});

describe("updateProject()", () => {
  test("passed proper request body - should return an updated body", async () => {
    // Arrange
    const mockedOriginalBody = {
      id: 1,
      name: "Mocked name value",
      description: "This is a test project",
    } as Project;
    const mockedRequestBody = {
      name: "Test has been successed",
    };
    const expectedResult = {
      id: 1,
      name: mockedRequestBody.name,
      description: "This is a test project",
    };

    // Act
    const res = await project.updateProject(mockedOriginalBody, mockedRequestBody);

    // Assert
    expect(res).toEqual(expectedResult);
  });

  test("passed broken request body - should return an error message with the passed body", async () => {
    // Arrange
    const mockedOriginalBody = {
      id: 1,
      name: "Mocked name value",
      description: "This is a test project",
    } as Project;
    const mockedRequestBody = {
      crazyKey: "Broken broken",
    } as unknown as Project;
    const expectedErrorMessage = 'Could not update the project with the request body: {"crazyKey":"Broken broken"}';

    // Act
    await expect(project.updateProject(mockedOriginalBody, mockedRequestBody)).rejects.toThrow(expectedErrorMessage);
  });
});
