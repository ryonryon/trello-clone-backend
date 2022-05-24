import { build } from "../../../tests/helper";
import { createTestColumns } from "../../../tests/helper/utils";
import { Project } from "../../entities";

const app = build();

describe("createColumn", () => {
  test.todo("Passed appropriate query and body - it should successfully create new column");

  test.todo("Passed id THAT DOES NOT exist - it should return an error message with the passed id");

  test.todo("Pass broken body - it should return error that indicates passed body isn't appropriate");
});

describe("editColumnById", () => {
  test.todo("Pass proper body - it should successfully edit existing column");

  test.todo("Pass broken query - it should return error that indicates column not found");

  test.todo("Pass broken body - it should return error that indicates passed body isn't appropriate");
});

describe("updateColumnsSort", () => {
  let mockProject: Project;

  beforeAll(async () => {
    mockProject = await createTestColumns();
  });

  afterAll(async () => {
    await mockProject.remove();
  });

  test("Pass proper query and body - it should successfully update columns sort in the project", async () => {
    const res = await app.inject({
      method: "patch",
      url: `/projects/${mockProject.id}/columns`,
      payload: {
        columnId: mockProject.columns[2].id,
        sort: 0,
      },
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toContain(mockProject.id);
  });

  test("Pass broken query - it should return error that indicates project not found with the projectId", async () => {
    const expectedErrorMessage =
      '{"statusCode":500,"error":"Internal Server Error","message":"Invalid project id: NaN"}';
    const res = await app.inject({
      method: "put",
      url: "/projects/a/columns",
      payload: {
        columnId: mockProject.columns[3].id,
        sort: 0,
      },
    });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toContain(expectedErrorMessage);
  });

  test("Pass broken body - it should return error that indicates passed body isn't appropriate", async () => {
    const mockedSort = -1;
    const expectedErrorMessage = `{"statusCode":500,"error":"Internal Server Error","message":"sort: ${mockedSort} must be 0 or more and less than length of project.colmns"}`;
    const res = await app.inject({
      method: "put",
      url: `/projects/${mockProject.id}/columns`,
      payload: {
        columnId: mockProject.columns[1].id,
        sort: mockedSort,
      },
    });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toContain(expectedErrorMessage);
  });
});
