import type { Value } from "./learning-python";
export interface LearningRustResult { output: string[]; variables: Record<string, Value>; error?: string }
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:std::fs|std::process|Command::new|std::net|TcpStream|UdpSocket|reqwest|tokio::fs)\b/, "Доступ к файлам, процессам и сети в учебном Rust-разборе отключён."],
  [/\bunsafe\b/, "Блок unsafe в учебном разборе не выполняется. Сначала объясните, почему безопасного Rust недостаточно."],
  [/\b(?:password|token|secret|api[_-]?key)\s*[:=]/i, "Секреты нельзя помещать в учебный Rust-пример."],
];
export function analyzeLearningRust(code: string): LearningRustResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте небольшой пример let, fn, ссылок &, struct, enum, Option, Result, trait или async." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = []; const variables: Record<string, Value> = {};
  const names = Array.from(code.matchAll(/\b(?:fn|struct|enum|trait)\s+([A-Za-z_]\w*)/g)).map((match) => match[1]).slice(0, 6);
  if (/\blet\s+(?:mut\s+)?\w+/.test(code)) output.push("Найдена переменная Rust. Изменяемость отмечается словом mut явно.");
  if (/\bfn\s+\w+\s*\(/.test(code)) output.push("Найдена функция Rust. Типы параметров и результата делают её договор понятным.");
  if (/\bmut\b/.test(code)) output.push("Найден mut. Это явное разрешение менять значение.");
  if (/\b&(?:mut\s+)?\w+|&self|&str/.test(code)) output.push("Найдена ссылка. Borrowing позволяет читать или временно менять данные без передачи владения.");
  if (/\bString::from|\.clone\(\)/.test(code)) output.push("Найдено владение строкой или явное копирование. Проверяйте, действительно ли clone нужен.");
  if (/\bstruct\s+\w+/.test(code)) output.push("Найден struct. Он объединяет связанные данные модели.");
  if (/\benum\s+\w+/.test(code)) output.push("Найден enum. Он делает набор состояний явным и проверяемым.");
  if (/\bmatch\b/.test(code)) output.push("Найден match. Он помогает обработать все варианты enum или Result.");
  if (/\bOption\b|\bSome\(|\bNone\b/.test(code)) output.push("Найден Option. Он явно показывает, что значение может отсутствовать.");
  if (/\bResult\b|\bOk\(|\bErr\(|\?/.test(code)) output.push("Найден Result или ?. Ошибку передают наверх явно, без скрытой паники.");
  if (/\btrait\s+\w+/.test(code)) output.push("Найден trait. Небольшой набор умений делает логику гибче и удобнее для тестов.");
  if (/\bimpl\b/.test(code)) output.push("Найден impl. Здесь модели получают свои методы или реализацию trait.");
  if (/\b(?:iter\(\)|into_iter\(\)|map\(|filter\()/ .test(code)) output.push("Найден iterator. Помните: iter берёт ссылки, а into_iter обычно передаёт владение.");
  if (/\basync\s+fn|\.await\b/.test(code)) output.push("Найден async. Учебный разбор ничего не запускает; у future должна быть понятная граница ожидания и ошибки.");
  if (/\#\[test\]|assert_eq!/.test(code)) output.push("Найден тест Rust. Проверяйте поведение и граничные случаи.");
  if (names.length) variables.names = names;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный Rust-разбор понимает let, mut, fn, ссылки, владение, struct, enum, match, Option, Result, trait, impl, iterator, async и тесты." };
  return { output, variables };
}
