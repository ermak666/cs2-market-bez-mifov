import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readProjectFile = (filePath: string) => readFileSync(resolve(projectRoot, filePath), "utf8");

describe("честная практика кода", () => {
  it("не оставляет аудиоплеер или кнопку озвучки в карточке урока", () => {
    const lessonPath = resolve(projectRoot, "app/lesson/[id].tsx");
    if (!existsSync(lessonPath)) return;
    const lesson = readFileSync(lessonPath, "utf8");
    expect(lesson).not.toMatch(/LessonAudio|lessonVoiceovers|lessonAudioSource|Слушать Algieba|Слушать урок/);
  });

  it("оставляет только понятный пользовательский результат запуска", () => {
    const card = readProjectFile("components/code-card.tsx");
    expect(card).toContain("runOutput && !runError");
    const practicePath = resolve(projectRoot, "app/practice.tsx");
    if (existsSync(practicePath)) {
      const practice = readFileSync(practicePath, "utf8");
      expect(practice).not.toMatch(/LessonAudio|Слушать Algieba|Озвучивание/);
    }
  });
});
