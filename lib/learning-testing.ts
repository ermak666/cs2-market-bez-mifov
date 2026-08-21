import type { Value } from "./learning-python";

export interface LearningTestingResult {
  output: string[];
  variables: Record<string, Value>;
  error?: string;
}

const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:requests|httpx|fetch)\s*(?:\.|\()/, "Сетевые действия в учебном разборе тестов отключены."],
  [/\b(?:subprocess|os\.system|open|socket)\s*\(/, "Доступ к процессам, сети и файлам в учебном разборе тестов отключён."],
  [/\b(?:eval|exec)\s*\(/, "Выполнение динамического кода в учебном разборе тестов отключено."],
];

export function analyzeLearningTesting(code: string): LearningTestingResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте маленький пример assert, pytest, Jest, mock или CI-проверки." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };

  const output: string[] = [];
  const variables: Record<string, Value> = {};
  const testNames = Array.from(code.matchAll(/(?:def\s+|(?:it|test)\s*\(\s*['"])(test_[A-Za-z0-9_]+|[^'"]+)/g)).map((match) => match[1]).filter(Boolean);

  if (/\bassert\b/.test(code)) output.push("Найден assert. Тест сравнивает результат с ожидаемым и честно сообщает о несовпадении.");
  if (/def\s+test_[A-Za-z0-9_]+\s*\(/.test(code)) output.push(testNames.length ? `pytest-тесты найдены: ${testNames.join(", ")}. Имя теста объясняет проверяемое поведение.` : "Найден pytest-тест. Функция test_ описывает одно обещание кода.");
  if (/pytest\.fixture|@fixture/.test(code)) output.push("Найдена фикстура. Она аккуратно готовит повторяемые учебные данные для тестов.");
  if (/pytest\.mark\.parametrize/.test(code)) output.push("Найдена параметризация. Одно правило проверяется несколькими примерами без копирования теста.");
  if (/\b(?:it|test)\s*\(\s*['"]/.test(code)) output.push("Найден Jest/Vitest-сценарий. Он описывает ожидаемое поведение короткой фразой.");
  if (/\bexpect\s*\(/.test(code)) output.push("Найден expect(). Matcher сравнивает фактический результат с ожиданием.");
  if (/\b(?:toBe|toEqual|toHaveLength|toThrow)\s*\(/.test(code)) output.push("Найден matcher. Подбирайте matcher под число, объект, длину или ошибку.");
  if (/\b(?:vi|jest)\.fn\s*\(/.test(code)) output.push("Найден mock-функция. Она заменяет внешнюю зависимость в изолированном учебном сценарии.");
  if (/\b(?:client\.(?:get|post|patch|delete)|TestClient)\b/.test(code)) output.push("Найден тест API. Проверяйте статус и нужные поля ответа без настоящей сети.");
  if (/\b(?:coverage|pytest|npm test|pnpm test|lint)\b/i.test(code)) output.push("Найдена команда качества. CI повторяет выбранные проверки для каждого изменения.");

  if (!output.length) return { output: [], variables: {}, error: "Пока учебный разбор тестов понимает assert, pytest-тесты, фикстуры, параметризацию, Jest/Vitest, matchers, mocks, API-проверки и CI-команды." };
  if (testNames.length) variables.tests = testNames;
  return { output, variables };
}
