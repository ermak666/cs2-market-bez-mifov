import { describe, expect, it } from "vitest";

import { getLesson, volumes } from "../shared/course-data";

describe("локальный курс Git и GitHub", () => {
  it("содержит Junior, Middle, Senior и проектный том", () => {
    expect(volumes).toHaveLength(4);
    expect(volumes.map((volume) => volume.id)).toEqual(["junior", "middle", "senior", "applied"]);
    expect(volumes.reduce((sum, volume) => sum + volume.lessons.length, 0)).toBeGreaterThanOrEqual(24);
  });

  it("даёт каждому уроку цель, аналогию, пример и три практических шага", () => {
    for (const volume of volumes) {
      for (const lesson of volume.lessons) {
        expect(lesson.goal.length).toBeGreaterThan(10);
        expect(lesson.analogy.length).toBeGreaterThan(10);
        expect(lesson.code.length).toBeGreaterThan(4);
        expect(lesson.body).toContain("Задача 1");
        expect(lesson.body).toContain("Задача 2");
        expect(lesson.body).toContain("Задача 3");
      }
    }
  });

  it("находит урок по стабильному идентификатору", () => {
    const firstLesson = volumes[0].lessons[0];
    expect(getLesson(firstLesson.id)?.title).toBe(firstLesson.title);
    expect(getLesson("no-such-lesson")).toBeUndefined();
  });
});
