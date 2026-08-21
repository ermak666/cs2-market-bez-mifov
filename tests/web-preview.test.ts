import { describe, expect, it } from "vitest";
import { previewLearningWeb } from "../lib/web-preview";

describe("безопасный предпросмотр HTML и CSS", () => {
  it("объясняет структуру встроенного HTML-примера", () => {
    const result = previewLearningWeb("<h1>Привет</h1>");
    expect(result.error).toBeUndefined();
    expect(result.output.join(" ")).toContain("h1");
    expect(result.output.join(" ")).toContain("Привет");
  });
  it("не выполняет JavaScript", () => {
    expect(previewLearningWeb("<script>alert('x')</script>").error).toContain("не исполняет JavaScript");
  });
});
