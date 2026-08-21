import type { Value } from "./learning-python";

export interface LearningDockerResult {
  output: string[];
  variables: Record<string, Value>;
  error?: string;
}

const FORBIDDEN: Array<[RegExp, string]> = [
  [/\bdocker\s+(?:run|build|compose\s+(?:up|down|build)|push|pull|exec|rm|rmi|system\s+prune)\b/i, "Команда может запускать контейнеры, менять образы или обращаться к сети. Учебная песочница её не исполняет."],
  [/\b(?:curl|wget|ssh|scp|sudo|apt|apk)\b/i, "Сетевые, системные и пакетные действия в учебном разборе Docker отключены."],
  [/\b(?:password|token|secret|api[_-]?key)\s*[:=]/i, "Секреты нельзя помещать в Dockerfile, Compose-файл или учебный пример."],
];

export function analyzeLearningDocker(code: string): LearningDockerResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте маленький Dockerfile или фрагмент docker compose с образом, сервисом, volume или network." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = [];
  const variables: Record<string, Value> = {};
  const images = Array.from(code.matchAll(/\bFROM\s+([^\s]+)/gi)).map((match) => match[1]);
  const services = Array.from(code.matchAll(/^\s{2}([\w-]+):\s*$/gm)).map((match) => match[1]).filter((name) => !["services", "volumes", "networks", "environment", "healthcheck"].includes(name));
  if (/^\s*FROM\s+/mi.test(code)) output.push("Найден FROM. Он выбирает исходный образ для нового Docker-образа.");
  if (/^\s*WORKDIR\s+/mi.test(code)) output.push("Найден WORKDIR. Он задаёт понятную рабочую папку внутри контейнера.");
  if (/^\s*COPY\s+/mi.test(code)) output.push("Найден COPY. Копируйте только нужные файлы и используйте .dockerignore для лишнего.");
  if (/^\s*CMD\s+/mi.test(code)) output.push("Найден CMD. Он задаёт стандартную команду старта контейнера.");
  if (/^\s*EXPOSE\s+/mi.test(code)) output.push("Найден EXPOSE. Он документирует ожидаемый порт, но не открывает его сам по себе.");
  if (/^\s*USER\s+/mi.test(code)) output.push("Найден USER. Непривилегированный пользователь уменьшает последствия ошибки в контейнере.");
  if (/\.dockerignore|node_modules|^\.env$/mi.test(code)) output.push("Найдена тема .dockerignore. Не включайте зависимости, секреты и историю Git в контекст сборки.");
  if (/\bservices:\s*$/mi.test(code)) output.push("Найден docker compose. Он описывает несколько связанных сервисов в одном читаемом файле.");
  if (/\bvolumes:\s*$/mi.test(code)) output.push("Найден volume. Он хранит нужные данные отдельно от жизненного цикла контейнера.");
  if (/\bnetworks:\s*$/mi.test(code)) output.push("Найдена network. Она помогает сервисам общаться по именам и не открывать лишние порты.");
  if (/\bhealthcheck:\s*$/mi.test(code)) output.push("Найден healthcheck. Он описывает признак готовности сервиса без выполнения самой проверки в учебной песочнице.");
  if (images.length) variables.images = images;
  if (services.length) variables.services = services;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный разбор Docker понимает FROM, WORKDIR, COPY, CMD, EXPOSE, USER, .dockerignore, services, volumes, networks и healthcheck." };
  return { output, variables };
}
