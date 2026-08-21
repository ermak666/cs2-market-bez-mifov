import { describe, expect, it } from "vitest";

import { checkLearningTypeScript } from "../lib/learning-typescript";

describe("безопасная учебная TypeScript-песочница", () => {
  it("проверяет допустимую базовую аннотацию и показывает результат", () => {
    const result = checkLearningTypeScript("const course: string = 'TypeScript';\nconsole.log(course)");
    expect(result.error).toBeUndefined();
    expect(result.output).toEqual(["✓ course: string", "TypeScript"]);
    expect(result.variables.course).toBe("TypeScript");
  });

  it("объясняет несовместимость объявленного и фактического типа", () => {
    const result = checkLearningTypeScript("const score: number = 'пять';");
    expect(result.error).toContain("Типовая ошибка");
    expect(result.error).toContain("number");
  });
});
