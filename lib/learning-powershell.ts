import type { Value } from "./learning-python";
export interface LearningPowerShellResult { output: string[]; variables: Record<string, Value>; error?: string }
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:Remove-Item|Clear-Content|Set-Content|Add-Content|Copy-Item|Move-Item|Rename-Item|Start-Process|Stop-Process|Restart-Computer|Stop-Computer|Invoke-Expression|iex\b|Invoke-Command|Enter-PSSession|New-PSSession)\b/i, "Изменение файлов, запуск процессов, удалённые сессии и выполнение произвольных команд отключены в учебном PowerShell-разборе."],
  [/\b(?:Invoke-RestMethod|Invoke-WebRequest|curl\b|wget\b|WebClient|HttpClient)\b/i, "Сетевые обращения не выполняются в учебном PowerShell-разборе. Разбирайте только безопасную модель запроса без реального URL и токена."],
  [/\b(?:password|token|secret|api[_-]?key|authorization)\s*[:=]/i, "Секреты нельзя помещать в учебный PowerShell-пример, заголовки, переменные или лог."],
  [/\b(?:Set-ExecutionPolicy\s+(?:Bypass|Unrestricted)|Unblock-File)\b/i, "Учебник не советует отключать защитные механизмы ради запуска неизвестного сценария. Сначала прочитайте и проверьте код."],
];
export function analyzeLearningPowerShell(code: string): LearningPowerShellResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте небольшой пример переменной, cmdlet, pipeline, функции, объекта, REST-модели, Pester или $env: переменной." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = []; const variables: Record<string, Value> = {};
  const names = Array.from(code.matchAll(/\$([A-Za-z_][\w]*)/g)).map((match) => match[1]).slice(0, 8);
  if (/\$[A-Za-z_][\w]*\s*=/.test(code)) output.push("Найдена переменная PowerShell. Дайте ей понятное имя и не храните в ней секрет.");
  if (/\b(?:Get|Set|New|Test|Select|Where|ForEach|ConvertTo|ConvertFrom|Export|Import)-[A-Za-z]+\b/.test(code)) output.push("Найден cmdlet. Имя из глагола и существительного помогает понять действие и объект.");
  if (/\|/.test(code)) output.push("Найден pipeline. Он передаёт объекты; сначала фильтруйте данные, затем выбирайте свойства.");
  if (/\bWhere-Object\b/.test(code)) output.push("Найдено сито Where-Object. Если источник умеет фильтровать параметром, фильтруйте ещё раньше.");
  if (/\bSelect-Object\b/.test(code)) output.push("Найден Select-Object. Выбирайте нужные свойства после условий, чтобы не потерять данные для фильтрации.");
  if (/\bfunction\s+[A-Za-z][\w-]*\b|\bparam\s*\(/i.test(code)) output.push("Найдена функция или параметры. Пусть входы будут явными, проверяемыми и без побочных действий.");
  if (/\[pscustomobject\]|@\{/.test(code)) output.push("Найден объект или хэш-таблица. Это удобная модель конфигурации, заголовков или безопасного результата.");
  if (/\b(?:ConvertTo-Json|ConvertFrom-Json)\b/.test(code)) output.push("Найден JSON. Проверяйте форму данных до преобразования и не сериализуйте секреты в логи.");
  if (/\b(?:Invoke-RestMethod|Method\s*=|Uri\s*=|Headers\s*=|TimeoutSec)\b/i.test(code)) output.push("Найдена REST-модель. Проверяйте HTTPS, метод, таймаут и не используйте реальный токен в учебном примере.");
  if (/\$env:[A-Za-z_][\w]*/i.test(code)) output.push("Найдена переменная окружения. Не выводите её чувствительное значение и предусмотрите понятную ошибку при отсутствии.");
  if (/\b(?:Describe|Context|It|Should)\b/.test(code)) output.push("Найден Pester-тест. Проверяйте небольшую чистую функцию и граничный сценарий без внешних действий.");
  if (/\bGet-ExecutionPolicy\b/.test(code)) output.push("Найдена execution policy. Это помощь от случайного запуска, а не замена проверке неизвестного сценария.");
  if (names.length) variables.names = names;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный PowerShell-разбор понимает переменные, cmdlet, pipeline, объекты, функции, JSON, REST-модель, $env:, Pester и execution policy." };
  return { output, variables };
}
