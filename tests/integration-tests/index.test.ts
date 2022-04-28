import server from "../../src/index";

afterAll(async () => {
  // workaround. It'd fails to kill server before jest finish its execution
  // so it results in failure of jest to stop.
  setTimeout(() => {
    server.close();
  }, 1000);
});

describe("index.ts", () => {
  test('requests the "/" route - should return expected response', async () => {
    const expectedResponse = "hello world with fastify";
    const res = await server.inject({
      method: "GET",
      url: "/",
    });

    expect(res.statusCode).toBe(200);
    expect(res.payload).toBe(expectedResponse);
  });
});
