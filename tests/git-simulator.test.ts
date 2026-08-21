import { describe, expect, it } from "vitest";

import { runGitSimulation } from "../lib/git-simulator";

describe("безопасный симулятор Git", () => {
  it("показывает учебный результат для разрешённых команд без запуска системы", () => {
    expect(runGitSimulation("git status").output[0]).toContain("ветке main");
    expect(runGitSimulation("git switch -c feature/profile").output[0]).toContain("feature/profile");
    expect(runGitSimulation("git push origin main").output.join(" ")).toContain("Настоящая сеть не используется");
  });

  it("честно отклоняет неразрешённые команды", () => {
    const result = runGitSimulation("git reset --hard");
    expect(result.error).toContain("не запускается");
    expect(result.output).toEqual([]);
  });
});
