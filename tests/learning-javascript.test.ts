import { describe, expect, it } from "vitest";

import { runLearningJavaScript } from "../lib/learning-javascript";

describe("безопасная учебная JavaScript-песочница", () => {
  it("выполняет объявления, вычисление и console.log без доступа к среде", () => {
    const result = runLearningJavaScript("let score = 0;\nscore = score + 1;\nconsole.log(score)");
    expect(result.error).toBeUndefined();
    expect(result.output).toEqual(["1"]);
    expect(result.variables.score).toBe(1);
  });

  it("честно сообщает о неподдерживаемой конструкции", () => {
    const result = runLearningJavaScript("fetch('https://example.com')");
    expect(result.error).toContain("пока не выполняется");
    expect(result.output).toEqual([]);
  });
});
