import { build } from "../../../tests/helper";
import { createTestTicket } from "../../../tests/helper/utils";
import { Column, Project, Ticket, TicketInput } from "../../entities";
import ticket from "../ticket";

// make a connection to real server
build();

describe("createTicket()", () => {
  test.todo("passed proper request body - should return an created body");

  test("passed body with name undefined - should return an error message that name is required", async () => {
    // Arrange
    const mockedRequestBody = {
      name: undefined,
      description: "This is a test ticket",
      sort: 1,
    } as unknown as TicketInput;
    const project = new Project();
    project.id = 1;
    const column = new Column();
    column.id = 1;
    const expectedErrorMessage = "name is required to create ticket";

    // Act
    await expect(ticket.createTicket(mockedRequestBody, project, column)).rejects.toThrow(expectedErrorMessage);
  });

  test("passed body with empty name - should return an error message that name is required", async () => {
    // Arrange
    const mockedRequestBody = {
      name: "",
      description: "This is a test ticket",
      sort: 1,
    } as unknown as TicketInput;
    const project = new Project();
    project.id = 1;
    const column = new Column();
    column.id = 1;
    const expectedErrorMessage = "name is required to create ticket";

    // Act
    await expect(ticket.createTicket(mockedRequestBody, project, column)).rejects.toThrow(expectedErrorMessage);
  });
});

describe("getTicketById()", () => {
  let mockTicket: Ticket;

  beforeAll(async () => {
    mockTicket = await createTestTicket();
  });

  afterAll(async () => {
    await mockTicket.remove();
  });

  test("passed id that exists - should return a ticket with the passed id", async () => {
    // Arrange
    const mockedId = mockTicket.id;

    // Act
    const res = await ticket.getTicketById(mockTicket.id.toString());

    // Assert
    expect(res.id).toEqual(mockedId);
  });

  test("passed id that DOES NOT exist - should return an error message with the passed id", async () => {
    // Arrange
    const mockedId = "1242323";
    const expectedErrorMessage = `Ticket not found for id: ${mockedId}`;

    // Act/Assert
    await expect(ticket.getTicketById(mockedId)).rejects.toThrow(expectedErrorMessage);
  });
});

describe("updateTicket()", () => {
  let mockTicket: Ticket;

  beforeAll(async () => {
    mockTicket = await createTestTicket();
  });

  afterAll(async () => {
    await mockTicket.remove();
  });

  test("passed proper request body - should return an updated body", async () => {
    // Arrange
    const mockedOriginalBody = {
      id: mockTicket.id,
      name: mockTicket.name,
      description: mockTicket.description,
      sort: mockTicket.sort,
    } as Ticket;
    const mockedRequestBody = {
      name: "Test has been successed",
    };
    const expectedResult = {
      id: mockTicket.id,
      name: mockedRequestBody.name,
      description: mockTicket.description,
      sort: mockTicket.sort,
    };

    // Act
    const res = await ticket.updateTicket(mockedOriginalBody, mockedRequestBody);

    // Assert
    expect(res).toEqual(expectedResult);
  });

  test("passed broken request body - should return an error message with the passed body", async () => {
    // Arrange
    const mockedOriginalBody = {
      id: mockTicket.id,
      name: mockTicket.name,
      description: mockTicket.description,
      sort: mockTicket.sort,
    } as Ticket;
    const mockedRequestBody = {
      crazyKey: "Broken broken",
    } as unknown as Ticket;
    const expectedErrorMessage = 'Could not update the ticket with the request body: {"crazyKey":"Broken broken"}';

    // Act
    await expect(ticket.updateTicket(mockedOriginalBody, mockedRequestBody)).rejects.toThrow(expectedErrorMessage);
  });
});
