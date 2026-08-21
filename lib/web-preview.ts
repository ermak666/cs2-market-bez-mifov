export type WebPreviewResult = { output: string[]; error?: string };

export function previewLearningWeb(code: string): WebPreviewResult {
  const source = code.trim();
  if (!source) return { output: [], error: "Сначала добавьте HTML или CSS-пример." };
  if (/<script|javascript:|on\w+\s*=/i.test(source)) return { output: [], error: "Учебный предпросмотр не исполняет JavaScript и обработчики событий. Он показывает только безопасные HTML и CSS-фрагменты." };
  const tags = [...source.matchAll(/<([a-z][\w-]*)\b/gi)].map((match) => match[1].toLowerCase());
  const text = source.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const selectors = [...source.matchAll(/([.#]?[a-z][\w-]*)\s*\{/gi)].map((match) => match[1]);
  const output = [
    tags.length ? `HTML: ${tags.join(" → ")}` : "CSS-правило без HTML-разметки.",
    text ? `Текст предпросмотра: ${text}` : "Текстового содержимого нет — это нормально для правила стиля.",
    selectors.length ? `CSS: применено правило для ${selectors.join(", ")}.` : "CSS: дополнительных правил в примере нет.",
    "Предпросмотр учебный: код не публикуется и не загружает внешние ресурсы.",
  ];
  return { output };
}
