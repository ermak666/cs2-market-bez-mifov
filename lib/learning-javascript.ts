import type { Value } from "./learning-python";

export type LearningJavaScriptResult = {
  output: string[];
  variables: Record<string, Value>;
  error?: string;
};

function readValue(source: string, variables: Record<string, Value>): Value | undefined {
  const value = source.trim().replace(/;$/, "");
  if (/^['"`].*['"`]$/.test(value)) return value.slice(1, -1);
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value === "true") return true;
  if (value === "false") return false;
  if (value in variables) return variables[value];

  const math = value.match(/^([A-Za-z_$][\w$]*|-?\d+(?:\.\d+)?)\s*([+*])\s*([A-Za-z_$][\w$]*|-?\d+(?:\.\d+)?)$/);
  if (math) {
    const left = readValue(math[1], variables);
    const right = readValue(math[3], variables);
    if (typeof left === "number" && typeof right === "number") return math[2] === "+" ? left + right : left * right;
    if (math[2] === "+" && typeof left === "string" && right !== undefined) return left + String(right);
  }
  const concatenation = value.split("+").map((part) => readValue(part, variables));
  if (concatenation.length > 1 && concatenation.every((part) => part !== undefined)) return concatenation.map(String).join("");
  return undefined;
}

/** Безопасный учебный интерпретатор: только объявления, присваивания и console.log. */
export function runLearningJavaScript(code: string): LearningJavaScriptResult {
  const output: string[] = [];
  const variables: Record<string, Value> = {};
  const statements = code.replace(/\r/g, "").split(/[\n;]/).map((item) => item.trim()).filter(Boolean);

  for (const statement of statements) {
    const declaration = statement.match(/^(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*(.+)$/);
    if (declaration) {
      const value = readValue(declaration[2], variables);
      if (value === undefined) return { output, variables, error: `Учебный запуск пока не понимает выражение: ${declaration[2]}` };
      variables[declaration[1]] = value;
      continue;
    }
    const increment = statement.match(/^([A-Za-z_$][\w$]*)\s*\+=\s*(\d+)$/);
    if (increment && typeof variables[increment[1]] === "number") {
      variables[increment[1]] = Number(variables[increment[1]]) + Number(increment[2]);
      continue;
    }
    const assignment = statement.match(/^([A-Za-z_$][\w$]*)\s*=\s*(.+)$/);
    if (assignment) {
      const value = readValue(assignment[2], variables);
      if (value === undefined) return { output, variables, error: `Учебный запуск пока не понимает выражение: ${assignment[2]}` };
      variables[assignment[1]] = value;
      continue;
    }
    const log = statement.match(/^console\.log\((.+)\)$/);
    if (log) {
      const value = readValue(log[1], variables);
      if (value === undefined) return { output, variables, error: `Учебный запуск пока не понимает выражение в console.log: ${log[1]}` };
      output.push(typeof value === "string" ? value : JSON.stringify(value));
      continue;
    }
    return { output, variables, error: `Эта конструкция JavaScript пока не выполняется в безопасной песочнице: ${statement}` };
  }
  return { output, variables };
}
