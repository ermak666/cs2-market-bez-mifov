export type LearningReactResult = { output: string[]; error?: string };

/** Безопасно объясняет учебное подмножество React, не исполняя JSX или пользовательский код. */
export function analyzeLearningReact(code: string): LearningReactResult {
  if (/\b(?:fetch|axios|require\(|import\s+|eval\(|document\.|window\.|localStorage)\b/.test(code)) return { output: [], error: "В учебной React-песочнице запрещены сеть, внешние модули, DOM и доступ к данным устройства." };
  const output: string[] = [];
  if (/function\s+[A-Z][\w]*/.test(code)) output.push("✓ Найден React-компонент с именем с большой буквы.");
  if (/<[A-Za-z][^>]*>/.test(code) || /<\w+\s*\/>/.test(code)) output.push("✓ JSX описывает будущий интерфейс.");
  if (/useState\s*\(/.test(code)) output.push("✓ useState хранит меняющееся состояние компонента.");
  if (/onClick\s*=/.test(code)) output.push("✓ onClick связывает действие пользователя с обработчиком.");
  if (/\.map\s*\(/.test(code)) output.push("✓ map строит список элементов; добавьте понятный key.");
  if (/useEffect\s*\(/.test(code)) output.push("✓ useEffect описывает действие после обновления интерфейса.");
  if (!output.length) return { output: [], error: "Песочница пока понимает учебные примеры компонентов, JSX, useState, событий, списков и useEffect." };
  return { output };
}
