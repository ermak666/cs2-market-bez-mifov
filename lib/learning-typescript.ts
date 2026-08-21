import type { Value } from "./learning-python";

export type LearningTypeScriptResult = { output: string[]; variables: Record<string, Value>; error?: string };

function inferLiteral(value: string): "string" | "number" | "boolean" | undefined {
  const source = value.trim().replace(/;$/, "");
  if (/^['"`].*['"`]$/.test(source)) return "string";
  if (/^-?\d+(\.\d+)?$/.test(source)) return "number";
  if (/^(true|false)$/.test(source)) return "boolean";
  return undefined;
}

function literalValue(value: string): Value | undefined {
  const source = value.trim().replace(/;$/, "");
  if (/^['"`].*['"`]$/.test(source)) return source.slice(1, -1);
  if (/^-?\d+(\.\d+)?$/.test(source)) return Number(source);
  if (source === "true") return true;
  if (source === "false") return false;
  return undefined;
}

/** Проверяет безопасное учебное подмножество TypeScript: базовые аннотации и литералы. */
export function checkLearningTypeScript(code: string): LearningTypeScriptResult {
  const output: string[] = [];
  const variables: Record<string, Value> = {};
  const lines = code.replace(/\r/g, "").split("\n").map((line) => line.trim()).filter(Boolean);
  for (const line of lines) {
    const declaration = line.match(/^(?:const|let)\s+([A-Za-z_$][\w$]*)\s*:\s*(string|number|boolean)\s*=\s*(.+);?$/);
    if (declaration) {
      const [, name, expected, rawValue] = declaration;
      const actual = inferLiteral(rawValue);
      if (!actual) return { output, variables, error: `Песочница пока понимает только простые строковые, числовые и булевы значения: ${rawValue}` };
      if (actual !== expected) return { output, variables, error: `Типовая ошибка: ${name} объявлен как ${expected}, но значение имеет тип ${actual}.` };
      variables[name] = literalValue(rawValue)!;
      output.push(`✓ ${name}: ${expected}`);
      continue;
    }
    const log = line.match(/^console\.log\(([A-Za-z_$][\w$]*)\);?$/);
    if (log && log[1] in variables) {
      output.push(String(variables[log[1]]));
      continue;
    }
    return { output, variables, error: `Эта конструкция пока не проверяется в безопасной TypeScript-песочнице: ${line}` };
  }
  return { output, variables };
}
