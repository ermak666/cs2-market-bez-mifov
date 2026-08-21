import type { Value } from "./learning-python";

export interface LearningBackendResult {
  output: string[];
  variables: Record<string, Value>;
  error?: string;
}

const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:requests|httpx)\.(?:get|post|put|patch|delete)\s*\(/, "Сетевые действия в учебном разборе backend-кода отключены."],
  [/\b(?:socket|subprocess|os\.system|open)\s*\(/, "Доступ к сети, процессам и файлам в учебном разборе backend-кода отключён."],
  [/\b(?:connect|execute|cursor)\s*\(/, "Подключение к настоящей базе данных в учебном разборе отключено."],
  [/\bimport\s+(?!typing\b|dataclasses\b)|\bfrom\s+\w+\s+import\b/m, "Подключение внешних модулей в учебном разборе backend-кода отключено."],
];

function matches(code: string, pattern: RegExp) {
  return Array.from(code.matchAll(pattern)).map((match) => match[1]).filter(Boolean);
}

export function analyzeLearningBackend(code: string): LearningBackendResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте маленький пример FastAPI-маршрута, Pydantic-схемы, Django-модели, ORM-запроса или view." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };

  const output: string[] = [];
  const variables: Record<string, Value> = {};
  const paths = matches(code, /@app\.(?:get|post|put|patch|delete)\s*\(\s*['"]([^'"]+)['"]/g);
  const models = matches(code, /class\s+(\w+)\s*\(\s*models\.Model\s*\)/g);
  const schemas = matches(code, /class\s+(\w+)\s*\(\s*BaseModel\s*\)/g);
  const views = matches(code, /def\s+(\w+)\s*\(\s*request\s*\)/g);

  if (/@app\.(?:get|post|put|patch|delete)\s*\(/.test(code)) output.push(paths.length ? `FastAPI-маршруты найдены: ${paths.join(", ")}. Маршрут соединяет адрес, метод и понятную функцию-ответ.` : "Найден FastAPI-маршрут. Он связывает адрес и функцию-ответ.");
  if (/\{\w+\}/.test(code)) output.push("Найден параметр пути. Он помогает попросить один конкретный ресурс по его номеру.");
  if (/class\s+\w+\s*\(\s*BaseModel\s*\)/.test(code)) output.push(schemas.length ? `Pydantic-схемы найдены: ${schemas.join(", ")}. Схема проверяет форму входных или выходных данных.` : "Найдена Pydantic-схема. Она проверяет, что данные похожи на понятный бланк.");
  if (/status_code\s*=\s*201/.test(code)) output.push("Найден 201 Created. Сервер честно сообщает, что учебная запись создана.");
  if (/HTTPException\s*\(/.test(code)) output.push("Найдена HTTPException. Ошибка должна иметь честный статус и короткое объяснение без секретов.");
  if (/class\s+\w+\s*\(\s*models\.Model\s*\)/.test(code)) output.push(models.length ? `Django-модели найдены: ${models.join(", ")}. Модель описывает аккуратную карточку данных.` : "Найдена Django-модель. Она описывает поля, которые приложение хранит.");
  if (/models\.(?:CharField|IntegerField|BooleanField|ForeignKey|DateTimeField)\s*\(/.test(code)) output.push("Найдены поля Django-модели. Каждое поле должно соответствовать одному понятному свойству данных.");
  if (/Book\.objects\.(?:get|filter|create|all)\s*\(/.test(code)) output.push("Найден ORM-запрос. ORM помогает описать поиск или создание записи понятным Python-кодом.");
  if (/path\s*\(\s*['"]/.test(code)) output.push("Найден Django URL. Он связывает адрес с view, которая подготовит ответ.");
  if (/def\s+\w+\s*\(\s*request\s*\)/.test(code)) output.push(views.length ? `Django views найдены: ${views.join(", ")}. View получает запрос и готовит ответ.` : "Найдена Django view. Она получает запрос и готовит безопасный ответ.");
  if (/JsonResponse\s*\(/.test(code)) output.push("Найден JsonResponse. Django вернёт данные как JSON, а не будет притворяться HTML-страницей.");
  if (/\b(?:assert|TestClient|client\.(?:get|post|patch|delete))\b/.test(code)) output.push("Найден учебный тест API. Он проверяет статус и важный кусочек ответа без настоящей сети.");
  if (/\b(?:password|token|secret)\b/i.test(code)) output.push("Обратите внимание: секреты не должны попадать в учебные ответы, код и логи. Используйте только вымышленные значения.");

  if (!output.length) return { output: [], variables: {}, error: "Пока учебный разбор backend-кода понимает FastAPI-маршруты, Pydantic-схемы, Django-модели, ORM, URL, views, JSON-ответы и тестовые проверки." };
  if (paths.length) variables.routes = paths;
  if (schemas.length) variables.schemas = schemas;
  if (models.length) variables.models = models;
  if (views.length) variables.views = views;
  return { output, variables };
}
