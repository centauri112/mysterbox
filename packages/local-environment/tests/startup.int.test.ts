import { defaultStart } from "../src/nomadenv";

describe("Startup test", () => {
  it("should successfully start the zerobridge environment", async () => {
    expect(await defaultStart()).toBeTruthy();
  });
});
