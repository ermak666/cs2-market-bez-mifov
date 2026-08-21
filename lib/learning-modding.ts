import type { Value } from "./learning-python";
export interface LearningModdingResult { output: string[]; variables: Record<string, Value>; error?: string }
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:inject|injector|dll\s*inject|bypass|anti[- ]?cheat|cheat|crack|keygen|drm|decrypt|dump|patcher|memory\s*edit)\b/i, "Учебник не разбирает инжекторы, обход защит, античит, DRM, патчеры или изменение памяти игры."],
  [/\b(?:delete|remove|overwrite|replace|copy)\s+(?:game|original|install|exe|\.exe)\b/i, "Учебный разбор не изменяет оригинальные файлы игры. Используйте отдельную папку мода, резервную копию и обратимый откат."],
  [/\b(?:password|token|secret|api[_-]?key)\s*[:=]/i, "Секреты нельзя помещать в пример мода или его конфигурацию."],
];
export function analyzeLearningModding(code: string): LearningModdingResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте небольшой manifest, структуру папок, зависимость, порядок загрузки, log или план отката." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = []; const variables: Record<string, Value> = {};
  const names = Array.from(code.matchAll(/^\s*(?:name|mod-name|profile|game_version|version)\s*[=:]\s*["']?([^\n"']+)/gmi)).map((match) => match[1].trim()).slice(0, 6);
  if (/\b(?:name|mod-name)\s*[=:]/i.test(code)) output.push("Найдено имя мода. Оно должно честно описывать небольшое изменение без обещаний, которые мод не выполняет.");
  if (/\b(?:version|game_version|compatible)\s*[=:]/i.test(code)) output.push("Найдена совместимость по версии. Записывайте только реально проверенные версии игры и зависимостей.");
  if (/\b(?:dependencies|requires|depends)\b/i.test(code)) output.push("Найдены зависимости. Указывайте источник, минимальную версию и понятный сценарий, если зависимость отсутствует.");
  if (/\b(?:load[-_ ]?order|priority|after|before)\b/i.test(code)) output.push("Найден порядок загрузки. Меняйте его по одному шагу и фиксируйте результат в changelog.");
  if (/\b(?:backup|restore|rollback|disable|enabled)\b/i.test(code)) output.push("Найдена резервная копия или откат. У мода всегда должен быть понятный путь вернуть исходное состояние.");
  if (/\b(?:mods\/|mods\\|manifest\.(?:toml|json|yaml)|profile)\b/i.test(code)) output.push("Найдена структура мода или тестовый профиль. Не смешивайте файлы мода с оригинальными файлами игры без явного разрешения.");
  if (/\b(?:conflict|incompatible|missing dependency)\b/i.test(code)) output.push("Найдена диагностика конфликта. Отключайте лишнее и проверяйте минимальный воспроизводимый набор.");
  if (/\b(?:log|changelog|tested|steps|expected|actual)\b/i.test(code)) output.push("Найден журнал или отчёт. Укажите версии, шаги, ожидаемый результат и безопасный откат без личных данных.");
  if (/\b(?:credits|license|rights|author)\b/i.test(code)) output.push("Найдены авторство или лицензия. Публикуйте только собственные материалы или контент с явным разрешением.");
  if (/\b(?:online|multiplayer|server)\b/i.test(code)) output.push("Найдена тема онлайн-режима. Не используйте моды там, где правила игры, сервера или античита это запрещают.");
  if (names.length) variables.names = names;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный разбор моддинга понимает manifest, папки модов, версии, зависимости, load order, backup, rollback, конфликты, логи, лицензию и онлайн-границы." };
  return { output, variables };
}
