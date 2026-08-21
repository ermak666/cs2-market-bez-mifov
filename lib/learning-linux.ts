import type { Value } from "./learning-python";

export interface LearningLinuxResult {
  output: string[];
  variables: Record<string, Value>;
  error?: string;
}

const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:rm|rmdir|mv|cp|chmod|chown|kill|pkill|sudo|apt|dnf|yum|curl|wget|ssh|scp)\b/, "Эта команда может менять систему, файлы, процессы, пакеты или сеть. Учебная песочница её не исполняет и просит разобрать только безопасный пример."],
  [/\$\(|`[^`]+`|\beval\b|\bexec\b/, "Подстановка или выполнение команд в учебной песочнице отключены."],
  [/>\s*(?!&)/, "Перенаправление в файл может изменить данные. Учебная песочница его не исполняет."],
];

export function analyzeLearningLinux(code: string): LearningLinuxResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте маленький пример пути, ls, cd, mkdir, grep, прав или pipe." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };

  const output: string[] = [];
  const variables: Record<string, Value> = {};
  const paths = Array.from(code.matchAll(/(?:^|\s)(\/?(?:[\w.-]+\/)*[\w.-]+)(?=\s|$)/gm)).map((match) => match[1]).filter((path) => path.includes("/")).slice(0, 4);

  if (/\bpwd\b/.test(code)) output.push("Найдена pwd. Команда показывает текущую папку и ничего не меняет.");
  if (/\bls\b/.test(code)) output.push("Найдена ls. Она читает список имён в папке; -l добавляет детали, -a показывает скрытые имена.");
  if (/\bcd\b/.test(code)) output.push("Найдена cd. Она меняет текущую папку; сначала полезно уточнить путь через pwd.");
  if (/\bmkdir\b/.test(code)) output.push("Найдена mkdir. Она создаёт папку, поэтому в учебном разборе объясняется без выполнения.");
  if (/\bcat\b/.test(code)) output.push("Найдена cat. Она показывает текстовый файл; сначала убедитесь, что файл небольшой и путь верный.");
  if (/\bgrep\b/.test(code)) output.push("Найдена grep. Это лупа для поиска текста в строках; -n помогает увидеть номера строк.");
  if (/\|/.test(code)) output.push("Найден pipe |. Он передаёт текстовый результат одной команды следующей маленькой команде.");
  if (/\b(?:chmod|rwx|r--|rw-)\b/.test(code)) output.push("Найдена тема прав. r — читать, w — менять, x — запускать; права дают только тем, кому они нужны.");
  if (/\b(?:ps|top|tail)\b/.test(code)) output.push("Найдена команда наблюдения. Она помогает посмотреть процессы или последние строки лога без изменения системы.");
  if (/\b(?:if|then|fi|echo)\b/.test(code)) output.push("Найден маленький shell-сценарий. Пусть он будет коротким, понятным и не содержит скрытых опасных действий.");
  if (paths.length) variables.paths = paths;

  if (!output.length) return { output: [], variables: {}, error: "Пока учебный разбор Linux понимает пути, pwd, ls, cd, mkdir, cat, grep, pipe, права, процессы, логи и простые shell-конструкции." };
  return { output, variables };
}
