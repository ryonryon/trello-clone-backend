import { build } from "../../../tests/helper";
import { createTestProject } from "../../../tests/helper/utils";
import { Project } from "../../entities";

const app = build();

describe("/projects/:projectId", () => {
  describe("get project", () => {
    let mockProject: Project;

    beforeAll(async () => {
      mockProject = await createTestProject();
    });

    afterAll(async () => {
      await mockProject.remove();
    });

    test("Passed appropriate query - it should successfully fetch existing project", async () => {
      const res = await app.inject({
        method: "get",
        url: `/projects/${mockProject.id}`,
        payload: {},
      });

      expect(res).toBe(mockProject);
    });

    test("Passed id that DOES NOT exist - it should successfully fetch existing project", async () => {
      const expectedErrorMessage =
        '{"statusCode":500,"error":"Internal Server Error","message":"Project not found for id: 99999999"}';
      const res = await app.inject({
        method: "get",
        url: `/projects/99999999`,
        payload: {},
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toContain(expectedErrorMessage);
    });
  });

  describe("put project", () => {
    test("Pass proper body - it should successfully edit existing project", async () => {
      const mockName = "this is mocked name";
      const res = await app.inject({
        method: "put",
        url: "/projects/1",
        payload: {
          name: mockName,
        },
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toContain(mockName);
    });

    test("Pass broken query - it should return error that indicates project not found", async () => {
      const expectedErrorMessage =
        '{"statusCode":500,"error":"Internal Server Error","message":"Invalid project id: NaN"}';
      const mockName = "test";
      const res = await app.inject({
        method: "put",
        url: "/projects/a",
        payload: {
          name: mockName,
        },
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toContain(expectedErrorMessage);
    });

    test("Pass broken body - it should return error that indicates passed body isn't appropriate", async () => {
      const expectedErrorMessage =
        '{"statusCode":500,"error":"Internal Server Error","message":"Could not update the project with the request body: {\\"crazyKey\\":212}"}';
      const mockName = 212;
      const res = await app.inject({
        method: "put",
        url: "/projects/1",
        payload: {
          crazyKey: mockName,
        },
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toContain(expectedErrorMessage);
    });
  });
});
