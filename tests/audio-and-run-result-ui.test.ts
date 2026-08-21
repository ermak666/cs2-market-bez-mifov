import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const readProjectFile = (path: string) => readFileSync(resolve(projectRoot, path), "utf8");

describe("аудиоуправление и результат учебного запуска", () => {
  it("озвучивает реальный текст урока через системный голос и останавливает предыдущую запись", () => {
    const player = readProjectFile("lib/lesson-audio.tsx");
    expect(player).toContain('import * as Speech from "expo-speech"');
    expect(player).toContain('language: "ru-RU"');
    expect(player).toContain("await Speech.stop()");
    expect(player).toContain("Speech.speak(normalizedText");
    expect(player).toContain("const pause = useCallback");
    expect(player).toContain("const resume = useCallback");
    expect(player).toContain("const stop = useCallback");
  });

  it("показывает управление воспроизведением и не выводит успех поверх ошибки", () => {
    const lesson = readProjectFile("app/lesson/[id].tsx");
    const codeCard = readProjectFile("components/code-card.tsx");
    const practice = readProjectFile("app/practice.tsx");
    expect(lesson).toContain("▶ Слушать урок");
    expect(lesson).toContain("playLesson(lesson.id, `${lesson.title}. ${lesson.goal}. ${lesson.analogy}`)");
    expect(lesson).not.toContain("lessonVoiceovers");
    expect(lesson).toContain("■ Стоп");
    expect(codeCard).toContain("runOutput && !runError");
    expect(codeCard).toContain("КОМАНДА НЕ ВЫПОЛНЕНА");
    expect(practice).toContain("runOutput && !runError");
  });

  it("сохраняет светлый текст на постоянных тёмных карточках тренажёра", () => {
    const practice = readProjectFile("app/practice.tsx");
    expect(practice).toContain('bg-[#2E2413] p-5');
    expect(practice).toContain('text-foreground">{challenge.title}');
    expect(practice).toContain('text-foreground">ИИ-помощник по SQL');
  });
});
