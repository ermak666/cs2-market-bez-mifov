import { describe, expect, it } from "vitest";

import { analyzeLearningReact } from "../lib/learning-react";

describe("безопасный учебный React-разбор", () => {
  it("объясняет компонент, JSX и состояние без выполнения кода", () => {
    const result = analyzeLearningReact("function Counter() { const [count, setCount] = useState(0); return <button onClick={() => setCount(count + 1)}>{count}</button>; }");
    expect(result.error).toBeUndefined();
    expect(result.output.join(" ")).toContain("React-компонент");
    expect(result.output.join(" ")).toContain("useState");
  });

  it("отклоняет сеть и внешние действия", () => {
    const result = analyzeLearningReact("fetch('https://example.com')");
    expect(result.error).toContain("запрещены");
  });
});
