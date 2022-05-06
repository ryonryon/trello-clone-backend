import { build } from "../../../tests/helper";
import { column } from "..";

// make a connection to real server
build();

describe("geColumnById()", () => {
  test("passed id that exists - should return a column with the passed id", async () => {
    // Arrange
    const mockedId = "1";

    // Act
    const res = await column.getColumnById("1");

    // Assert
    expect(res.id).toEqual(Number(mockedId));
  });

  test("passed id that DOES NOT exist - should return an error message with the passed id", async () => {
    // Arrange
    const mockedId = "1242323";
    const expectedErrorMessage = `Column not found for id: ${mockedId}`;

    // Act/Assert
    await expect(column.getColumnById(mockedId)).rejects.toThrow(expectedErrorMessage);
  });
});
