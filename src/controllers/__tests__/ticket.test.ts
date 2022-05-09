import { build } from "../../../tests/helper";
import { createTestTicket } from "../../../tests/helper/utils";
import { Ticket } from "../../entities";

const app = build();

describe("Tickets", () => {
  describe("createTicket", () => {
    test.todo("Passed appropriate query and body - it should successfully create new ticket");

    describe("Passed inapropriate query or body", () => {
      test("Broken projectId - it should return error that indicates projectId is invalid", async () => {
        const expectedErrorMessage =
          '{"statusCode":500,"error":"Internal Server Error","message":"Invalid project id: NaN"}';
        const mockName = "test";
        const res = await app.inject({
          method: "post",
          url: "/projects/a/columns/a/tickets",
          payload: {
            name: mockName,
          },
        });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toContain(expectedErrorMessage);
      });

      test("Unexist projectId - it should return error that indicates project with the id is unexist", async () => {
        const expectedErrorMessage =
          '{"statusCode":500,"error":"Internal Server Error","message":"Project not found for id: 99999"}';
        const mockName = "test";
        const res = await app.inject({
          method: "post",
          url: "/projects/99999/columns/a/tickets",
          payload: {
            name: mockName,
          },
        });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toContain(expectedErrorMessage);
      });

      test("Broken columnId - it should return error that indicates columnId is invalid", async () => {
        const expectedErrorMessage =
          '{"statusCode":500,"error":"Internal Server Error","message":"Invalid column id: NaN"}';
        const mockName = "test";
        const res = await app.inject({
          method: "post",
          url: "/projects/1/columns/a/tickets",
          payload: {
            name: mockName,
          },
        });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toContain(expectedErrorMessage);
      });

      test("Unexist columnId - it should return error that indicates column with the id is unexist", async () => {
        const expectedErrorMessage =
          '{"statusCode":500,"error":"Internal Server Error","message":"Column not found for id: 99999"}';
        const mockName = "test";
        const res = await app.inject({
          method: "post",
          url: "/projects/1/columns/99999/tickets",
          payload: {
            name: mockName,
          },
        });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toContain(expectedErrorMessage);
      });

      test("Without name - it should return error that indicates name is required to create ticket", async () => {
        const expectedErrorMessage =
          '{"statusCode":500,"error":"Internal Server Error","message":"name is required to create ticket"}';
        const res = await app.inject({
          method: "post",
          url: "/projects/1/columns/1/tickets",
          payload: {
            name: undefined,
          },
        });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toContain(expectedErrorMessage);
      });

      test("Empty name - it should return error that indicates name is required to create ticket", async () => {
        const expectedErrorMessage =
          '{"statusCode":500,"error":"Internal Server Error","message":"name is required to create ticket"}';
        const mockName = "";
        const res = await app.inject({
          method: "post",
          url: "/projects/1/columns/1/tickets",
          payload: {
            name: mockName,
          },
        });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toContain(expectedErrorMessage);
      });
    });
  });

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
        url: "/tickets/1",
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
