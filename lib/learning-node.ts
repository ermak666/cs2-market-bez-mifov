import type { Value } from "./learning-python";
export interface LearningNodeResult { output: string[]; variables: Record<string, Value>; error?: string }
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:child_process|execSync|spawnSync|fork\(|worker_threads|process\.exit|fs\.(?:writeFile|unlink|rm|rmdir)|createServer\s*\([^)]*\)\s*\.listen|server\.listen)\b/, "Запуск процессов, изменение файлов и открытие порта отключены в учебном Node.js-разборе."],
  [/\b(?:fetch|https?\.request|net\.connect|dgram\.|WebSocket)\b/, "Сетевые обращения не выполняются в учебном Node.js-разборе. Используйте маленький локальный пример данных."],
  [/\b(?:password|token|secret|api[_-]?key)\s*[:=]/i, "Секреты нельзя помещать в учебный Node.js-пример, package.json или лог."],
];
export function analyzeLearningNode(code: string): LearningNodeResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте небольшой пример import/export, Promise, async/await, HTTP-ответа, process.env или node:test." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = []; const variables: Record<string, Value> = {};
  const names = Array.from(code.matchAll(/\b(?:function|async\s+function|const|class)\s+([A-Za-z_$][\w$]*)/g)).map((match) => match[1]).slice(0, 6);
  if (/\b(?:import\s+|export\s+)/.test(code)) output.push("Найден модуль ESM. Маленький export и точный import делают границы логики понятными.");
  if (/\brequire\s*\(/.test(code)) output.push("Найден CommonJS require. Не смешивайте форматы модулей без ясной причины.");
  if (/\bPromise\b|\.then\s*\(/.test(code)) output.push("Найден Promise. У него должен быть и успешный путь, и понятная обработка отказа.");
  if (/\basync\s+function|\bawait\b/.test(code)) output.push("Найдены async/await. Async-функция возвращает Promise, а await используют там, где результат действительно нужен.");
  if (/\b(?:queueMicrotask|setImmediate|setTimeout|nextTick)\b/.test(code)) output.push("Найдена очередь event loop. Не блокируйте обработчик долгой синхронной работой.");
  if (/\b(?:createServer|req\.method|res\.writeHead|statusCode|Content-Type)\b/.test(code)) output.push("Найден HTTP-фрагмент. Проверяйте метод и вход, возвращайте корректный статус и безопасный ответ.");
  if (/\bprocess\.env\b/.test(code)) output.push("Найдена переменная окружения. Не храните значение секрета в коде, логах или README.");
  if (/\bpackage\.json|\bdependencies\b|\blockfile\b|\bpackage-lock\.json\b/.test(code)) output.push("Найдена тема пакетов. Проверяйте имя и происхождение, фиксируйте версии и lockfile.");
  if (/\bAbortSignal\.timeout|\btimeout\b/.test(code)) output.push("Найден таймаут. Внешней операции нужен лимит времени и понятный путь отказа.");
  if (/\bnode:test\b|\bassert\.(?:equal|deepEqual|ok)\b|\btest\s*\(/.test(code)) output.push("Найден тест Node.js. Проверяйте одно небольшое обещание функции и граничный случай.");
  if (/\bconsole\.(?:log|info|error)\b/.test(code)) output.push("Найден лог. Не записывайте токены, пароли, полные тела запроса или личные данные.");
  if (names.length) variables.names = names;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный Node.js-разбор понимает import/export, Promise, async/await, event loop, HTTP, process.env, package.json, timeout, node:test и безопасные логи." };
  return { output, variables };
}
