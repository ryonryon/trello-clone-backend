import { build } from "../../../tests/helper";

const app = build();

describe("createColumn", () => {
  test.todo("Passed appropriate query and body - it should successfully create new column");

  test.todo("Passed id THAT DOES NOT exist - it should return an error message with the passed id");

  test.todo("Pass broken body - it should return error that indicates passed body isn't appropriate");
});

describe("editColumnById", () => {
  test.todo("Pass proper body - it should successfully edit existing column");

  test.todo("Pass broken query - it should return error that indicates column not found");

  test.todo("Pass broken body - it should return error that indicates passed body isn't appropriate");
});
