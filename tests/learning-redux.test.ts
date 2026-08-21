import { describe, expect, it } from "vitest";

import { analyzeLearningRedux } from "../lib/learning-redux";

describe("безопасный учебный разбор Redux Toolkit", () => {
  it("объясняет slice, reducer и selector без выполнения кода", () => {
    const result = analyzeLearningRedux(`
      const tasksSlice = createSlice({
        name: 'tasks',
        initialState: [],
        reducers: { add: (state) => state },
      });
      const selectTasks = (state) => state.tasks;
    `);

    expect(result.error).toBeUndefined();
    expect(result.output.join(" ")).toContain("Slice найден");
    expect(result.output.join(" ")).toContain("Reducers найдены");
    expect(result.output.join(" ")).toContain("Selectors найдены");
  });

  it("не допускает сетевые действия", () => {
    const result = analyzeLearningRedux("fetch('https://example.com')");

    expect(result.output).toEqual([]);
    expect(result.error).toContain("Сетевые запросы");
  });
});
