// test.js
const request = require("supertest");
const app = require("./inventory-api-on-google-cloud-run-node/app.js");
const assert = require("assert");

describe("App routes", function () {
  it("GET / should return 200", async function () {
    const res = await request(app).get("/");
    assert.strictEqual(res.status, 200);
  });

  it("POST /greeting should return 200 and contain greeting text", async function () {
    const res = await request(app).post("/greeting").send({ name: "Daryl" });
    assert.strictEqual(res.status, 200);
    assert.ok(res.text.includes("Hello, Daryl"));
  });
});
