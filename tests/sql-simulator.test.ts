import { describe, expect, it } from "vitest";

import { runSqlSimulation } from "../lib/sql-simulator";

describe("безопасная SQL-песочница", () => {
  it("возвращает настоящий учебный результат для разрешённого SELECT", () => {
    const result = runSqlSimulation("SELECT name FROM students WHERE city = 'Казань';");
    expect(result.error).toBeUndefined();
    expect(result.output.join(" ")).toContain("Аня");
    expect(result.output.join(" ")).toContain("Мира");
  });

  it("не выполняет опасные или внешние операции", () => {
    expect(runSqlSimulation("DROP TABLE students;").error).toContain("не подключается");
    expect(runSqlSimulation("ATTACH DATABASE 'secret.db' AS secret;").error).toContain("не подключается");
  });
});
