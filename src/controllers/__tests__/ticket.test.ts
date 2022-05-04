import { build } from "../../../tests/helper";

const app = build();

describe("Tickets", () => {
  test("/tickets/:ticketId - it should successfully edit existing ticket", async () => {
    const mockName = "this is mocked name";
    const res = await app.inject({
      method: "put",
      url: "/tickets/1",
      payload: {
        name: mockName,
      },
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toContain(mockName);
  });
});
