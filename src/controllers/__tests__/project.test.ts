import { build } from "../../../tests/helper";

const app = build();

describe("/project/:projectId", () => {
  test("Pass proper body - it should successfully edit existing project", async () => {
    const mockName = "this is mocked name";
    const res = await app.inject({
      method: "put",
      url: "/project/1",
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
      url: "/project/a",
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
      url: "/project/1",
      payload: {
        crazyKey: mockName,
      },
    });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toContain(expectedErrorMessage);
  });
});
