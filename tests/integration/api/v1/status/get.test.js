let response; // O let é necessário para permitir a reatribuição de valores às variáveis após a execução do fetch dentro do beforeAll
let responseBody;
let database;
beforeAll(async () => {
  response = await fetch("http://localhost:3000/api/v1/status");
  responseBody = await response.json();
  database = responseBody.dependencies.database;
});
// O beforeAll é uma função de setup de testes que executa um bloco de código uma única vez antes de todos os testes em um determinado arquivo ou suíte de testes.

test("GET to /api/v1/status should return 200", async () => {
  expect(response.status).toBe(200);
});

test("Return update_at in ISO format", async () => {
  expect(responseBody.update_at).toBeDefined();
  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);
});

test("Return Postgres version", async () => {
  expect(database.version).toBeDefined();
  expect(typeof database.version).toBe("string");
  expect(database.version).toMatch("16.0");
});

test("Return max connections", async () => {
  expect(database.max_connections).toBeDefined();
  expect(typeof database.max_connections).toBe("number");
  expect(database.max_connections).toBe(100);
});

test("Return opened connections ", async () => {
  expect(database.opened_connections).toBeDefined();
  expect(typeof database.opened_connections).toBe("number");
  expect(database.opened_connections).toEqual(1);
});
