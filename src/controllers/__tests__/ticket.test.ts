import { build } from "../../../tests/helper";
import { createTestTicket } from "../../../tests/helper/utils";
import { Ticket } from "../../entities";

const app = build();

describe("Tickets", () => {
  describe("editTicket", () => {
    let mockTicket: Ticket;

    beforeAll(async () => {
      mockTicket = await createTestTicket();
    });

    afterAll(async () => {
      await mockTicket.remove();
    });

    test("Passed appropriate body and query - it should successfully edit existing ticket", async () => {
      const mockName = "this is mocked name";

      const res = await app.inject({
        method: "put",
        url: `/tickets/${mockTicket.id}`,
        payload: {
          name: mockName,
        },
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toContain(mockName);
    });

    test("Pass broken query - it should return error that indicates that ticket not found", async () => {
      const expectedErrorMessage =
        '{"statusCode":500,"error":"Internal Server Error","message":"Invalid ticket id: NaN"}';
      const mockName = "test";
      const res = await app.inject({
        method: "put",
        url: "/tickets/a",
        payload: {
          name: mockName,
        },
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toContain(expectedErrorMessage);
    });

    test("Pass broken body - it should return error that indicates passed body isn't appropriate", async () => {
      const expectedErrorMessage =
        '{"statusCode":500,"error":"Internal Server Error","message":"Could not update the ticket with the request body: {\\"crazyKey\\":212}"}';
      const mockName = 212;
      const res = await app.inject({
        method: "put",
        url: `/tickets/${mockTicket.id}`,
        payload: {
          crazyKey: mockName,
        },
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toContain(expectedErrorMessage);
    });
  });
});
