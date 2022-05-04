import { build } from "../../../tests/helper";
import { Ticket } from "../../entities";
import { getTicketById, updateTicket } from "../ticket";

// make a connection to real server
build();

describe("getTicketById()", () => {
  test("passed id that exists - should return a ticket with the passed id", async () => {
    // Arrange
    const mockedId = "1";

    // Act
    const res = await getTicketById("1");

    // Assert
    expect(res.id).toEqual(Number(mockedId));
  });
  test("passed id that DOES NOT exist - should return an error message with the passed id", async () => {
    // Arrange
    const mockedId = "1242323";
    const expectedErrorMessage = `Ticket not found for id: ${mockedId}`;

    // Act/Assert
    await expect(getTicketById(mockedId)).rejects.toThrow(expectedErrorMessage);
  });
});

describe("updateTicket()", () => {
  test("passed proper request body - should return an updated body", async () => {
    // Arrange
    const mockedOriginalBody = {
      id: 1,
      name: "Mocked name value",
      description: "This is a test ticket",
      sort: 1,
    } as Ticket;
    const mockedRequestBody = {
      name: "Test has been successed",
    };
    const expectedResult = {
      id: 1,
      name: mockedRequestBody.name,
      description: "This is a test ticket",
      sort: 1,
    };

    // Act
    const res = await updateTicket(mockedOriginalBody, mockedRequestBody);

    // Assert
    expect(res).toEqual(expectedResult);
  });
  test("passed broken request body - should return an error message with the passed body", async () => {
    // Arrange
    const mockedOriginalBody = {
      id: 1,
      name: "Mocked name value",
      description: "This is a test ticket",
      sort: 1,
    } as Ticket;
    const mockedRequestBody = {
      crazyKey: "Broken broken",
    } as unknown as Ticket;
    const expectedErrorMessage = 'Could not update the ticket with the request {"crazyKey":"Broken broken"}';

    // Act
    await expect(updateTicket(mockedOriginalBody, mockedRequestBody)).rejects.toThrow(expectedErrorMessage);
  });
});
