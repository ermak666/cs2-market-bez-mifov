import { describe, expect, it } from "vitest";
import { cs2MarketCourseContent } from "../shared/cs2-market-course-content";
import { cs2CollectionAtlas } from "../shared/cs2-collection-atlas";
import { analyzeLearningCs2Market } from "../lib/learning-cs2-market";

describe("учебник рынка предметов CS2", () => {
  it("содержит 30 уроков в четырёх учебных разделах", () => {
    expect(cs2MarketCourseContent.volumes).toHaveLength(4);
    expect(cs2MarketCourseContent.volumes.flatMap((volume) => volume.lessons)).toHaveLength(30);
  });

  it("не выдаёт торговый сигнал и блокирует секреты или внешние сделки", () => {
    expect(analyzeLearningCs2Market("Тип: AK-47\nFloat: 0.12\nРешение: наблюдать").output.length).toBeGreaterThan(0);
    expect(analyzeLearningCs2Market("Steam Guard code: 12345").error).toContain("не открывает Steam");
    expect(analyzeLearningCs2Market("https://steamcommunity.com/market").error).toContain("не открывает ссылки");
  });

  it("содержит атлас с источником, датой проверки и предупреждением", () => {
    expect(cs2CollectionAtlas.length).toBeGreaterThanOrEqual(10);
    expect(cs2CollectionAtlas.every((entry) => entry.source.startsWith("https://") && entry.verifiedAt && entry.caution.includes("не рекомендация"))).toBe(true);
  });
});
