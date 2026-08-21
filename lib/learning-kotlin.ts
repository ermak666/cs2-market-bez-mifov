import type { Value } from "./learning-python";
import { analyzeLearningAndroid } from "./learning-android";
import { analyzeLearningCSharpUnity } from "./learning-csharp-unity";
import { analyzeLearningGo } from "./learning-go";
import { analyzeLearningRust } from "./learning-rust";
import { analyzeLearningModding } from "./learning-modding";
import { analyzeLearningNode } from "./learning-node";
import { analyzeLearningPowerShell } from "./learning-powershell";
import { analyzeLearningCs2Market } from "./learning-cs2-market";
export interface LearningKotlinResult { output: string[]; variables: Record<string, Value>; error?: string }
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:java\.io|java\.net|ProcessBuilder|Runtime\.getRuntime|File\s*\(|URL\s*\(|Socket\s*\()/, "Доступ к файлам, сети и процессам в учебном разборе Kotlin отключён."],
  [/\b(?:eval|exec)\s*\(/, "Динамическое выполнение кода в учебном разборе Kotlin отключено."],
  [/\b(?:password|token|secret|api[_-]?key)\s*=/i, "Секреты нельзя помещать в учебный Kotlin-пример."],
];
export function analyzeLearningKotlin(code: string): LearningKotlinResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте небольшой пример val, var, fun, class, data class, nullable или coroutine." };
  if (/\b(?:float|wear|seed|pattern|sticker|hold|trade protected|cooldown|listing|комиссия|ликвидность|спред)\b|(?:Тип|Решение|Причина)\s*:/i.test(code)) return analyzeLearningCs2Market(code);
  if (/@Composable\b|\b(?:Text|Button|TextField|Scaffold|LazyColumn|ViewModel|NavHost|navController|LaunchedEffect|Modifier)\b/.test(code)) return analyzeLearningAndroid(code);
  if (/\b(?:MonoBehaviour|GameObject|Rigidbody|Debug\.Log|OnTriggerEnter|OnCollisionEnter|ScriptableObject|public|private|void|int|float)\b/.test(code)) return analyzeLearningCSharpUnity(code);
  if (/\b(?:package\s+main|func|struct|interface|goroutine|chan|context\.|http\.Handler|fmt\.)\b/.test(code)) return analyzeLearningGo(code);
  if (/\b(?:let|mut|fn|enum|Option|Result|trait|impl|async|await|Some|None|Ok|Err)\b|\#\[test\]/.test(code)) return analyzeLearningRust(code);
  if (/\b(?:mod-name|manifest|game_version|dependencies|load[-_ ]?order|backup|rollback|changelog|credits|license|mods\/|mods\\)\b/i.test(code)) return analyzeLearningModding(code);
  if (/\b(?:node:|Promise|async|await|queueMicrotask|setImmediate|process\.env|package\.json|node:test|AbortSignal|createServer|res\.writeHead)\b/.test(code)) return analyzeLearningNode(code);
  if (/\$[A-Za-z_][\w]*|\b(?:Get|Set|New|Test|Select|Where|ForEach|ConvertTo|ConvertFrom|Export|Import)-[A-Za-z]+\b|\b(?:Pester|Describe|Should|Invoke-RestMethod|Get-ExecutionPolicy)\b/.test(code)) return analyzeLearningPowerShell(code);
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = []; const variables: Record<string, Value> = {};
  const names = Array.from(code.matchAll(/\b(?:val|var|class|fun)\s+([A-Za-z_]\w*)/g)).map((match) => match[1]).slice(0, 6);
  if (/\bval\s+/.test(code)) output.push("Найдена val. Это значение, которое после создания не заменяют.");
  if (/\bvar\s+/.test(code)) output.push("Найдена var. Её используют, когда значение действительно должно меняться.");
  if (/\bfun\s+\w+\s*\(/.test(code)) output.push("Найдена функция. Пусть она делает одну маленькую понятную работу.");
  if (/\bdata\s+class\b/.test(code)) output.push("Найден data class. Он удобен для простой модели данных.");
  else if (/\bclass\s+\w+/.test(code)) output.push("Найден класс. Это чертёж объектов с данными и действиями.");
  if (/\b\w+\?\s*(?::|=)/.test(code) || /:\s*\w+\?/.test(code)) output.push("Найден nullable-тип. Знак ? просит заранее подумать о пустом значении.");
  if (/\?\.|\?:/.test(code)) output.push("Найден безопасный вызов или Elvis-оператор. Он помогает спокойно обработать null.");
  if (/\b(?:listOf|mutableListOf|map\s*\{|filter\s*\{)/.test(code)) output.push("Найдена коллекция или её обработка. Держите шаги map и filter короткими и читаемыми.");
  if (/\b(?:suspend|CoroutineScope|launch|async)\b/.test(code)) output.push("Найдена coroutine-конструкция. Учебный разбор объясняет форму кода и ничего не запускает в фоне.");
  if (/\bsealed\s+class\b/.test(code)) output.push("Найден sealed class. Он помогает явно описать закрытый набор состояний.");
  if (names.length) variables.names = names;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный разбор Kotlin понимает val, var, fun, class, data class, nullable, ?., ?:, коллекции, sealed class и coroutine-конструкции." };
  return { output, variables };
}
