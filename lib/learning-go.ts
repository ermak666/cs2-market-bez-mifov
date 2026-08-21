import type { Value } from "./learning-python";
export interface LearningGoResult { output: string[]; variables: Record<string, Value>; error?: string }
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:os\.(?:Open|Create|ReadFile|WriteFile|Remove)|exec\.Command|net\.(?:Dial|Listen)|http\.(?:Get|Post)|filepath\.)\b/, "Доступ к файлам, процессам и сети в учебном Go-разборе отключён."],
  [/\b(?:password|token|secret|api[_-]?key)\s*[:=]/i, "Секреты нельзя помещать в учебный Go-пример."],
  [/\bgo\s+func\s*\(\)\s*\{[^}]*for\s*\{/s, "Бесконечную goroutine в учебном разборе не запускают. Объясните её остановку через context или channel."],
];
export function analyzeLearningGo(code: string): LearningGoResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте небольшой пример func, struct, interface, error, goroutine, channel или context." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = []; const variables: Record<string, Value> = {};
  const names = Array.from(code.matchAll(/\b(?:func|type)\s+([A-Za-z_]\w*)/g)).map((match) => match[1]).slice(0, 6);
  if (/\bpackage\s+main\b/.test(code)) output.push("Найден package main. Это точка входа обычной Go-программы.");
  if (/\bfunc\s+\w+\s*\(/.test(code)) output.push("Найдена функция Go. Пусть она делает один небольшой понятный шаг.");
  if (/:=/.test(code) || /\bvar\s+\w+/.test(code)) output.push("Найдена переменная. Go часто выводит тип из понятного значения.");
  if (/\bif\b/.test(code)) output.push("Найдено условие. Оно выбирает явный путь выполнения.");
  if (/\bfor\b/.test(code)) output.push("Найден for. В Go он покрывает основные виды повторения.");
  if (/\berr\b|\berror\b/.test(code)) output.push("Найдена обработка ошибки. Проверяйте err рядом с операцией и возвращайте понятный контекст.");
  if (/\btype\s+\w+\s+struct\b/.test(code)) output.push("Найден struct. Он объединяет связанные данные в модель.");
  if (/\btype\s+\w+\s+interface\b/.test(code)) output.push("Найден interface. Небольшое обещание умений упрощает тестирование и замену деталей.");
  if (/\b\*\w+/.test(code)) output.push("Найден указатель. Он нужен, когда меняют исходную структуру или избегают большой копии.");
  if (/\bgo\s+\w+\s*\(/.test(code)) output.push("Найдена goroutine. Учебный разбор ничего не запускает; для реальной работы нужен понятный результат и завершение.");
  if (/\b(?:chan|make\s*\(\s*chan|<-)/.test(code)) output.push("Найден channel. Он передаёт данные или сигнал между goroutine.");
  if (/\b(?:context\.|Context|WithCancel|WithTimeout)\b/.test(code)) output.push("Найден context. Он сообщает об отмене и ограничении времени долгой операции.");
  if (/\b(?:http\.Handler|http\.ResponseWriter|http\.Request)\b/.test(code)) output.push("Найден HTTP-handler. Проверяйте метод, вход и ошибку; не показывайте внутренние детали.");
  if (names.length) variables.names = names;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный Go-разбор понимает package main, func, переменные, if, for, error, struct, interface, указатели, goroutine, channel, context и HTTP-handler." };
  return { output, variables };
}
