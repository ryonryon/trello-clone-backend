import { build } from "../helper/index";

const app = build();

describe("index.ts", () => {
  test("default root route", async () => {
    const res = await app.inject({
      method: "get",
      url: "/projects",
    });

    // For now, return values are too arbitrary since the endpoint gets all items.
    // This test case simply focuses on the check that if the API successfully runs.
    expect(res).toBeTruthy();
  });
});
