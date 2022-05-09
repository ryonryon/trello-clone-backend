import { build } from "../../../tests/helper";

const app = build();

describe("/projects/:projectId/columns", () => {
  describe("createColumn", () => {
    test.todo("Pass proper query and body - it should successfully create new column");
    test.todo("Pass broken project id - it should return error that indicates project not found");
    test.todo("Pass broken body - it should return error that indicates passed body isn't appropriate");
  });
});
