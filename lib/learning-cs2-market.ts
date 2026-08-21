import type { Value } from "./learning-python";

export interface LearningCs2MarketResult { output: string[]; variables: Record<string, Value>; error?: string }

const FORBIDDEN: Array<[RegExp, string]> = [
  [/steam(?:guard)?\s*(?:code|пароль)|password|token|api[_ -]?key|trade\s*url/i, "Учебный разбор не принимает пароли, коды Steam Guard, токены, API-ключи или trade URL. Никому не передавайте эти данные."],
  [/https?:\/\/|steamcommunity\.com|csfloat\.com/i, "Учебный разбор работает с локальной карточкой предмета и не открывает ссылки, профиль Steam или внешнюю сделку."],
  [/купить сейчас|buy now|срочно продай|гарантированн(?:о|ая).*доход/i, "Приложение не выдаёт торговые сигналы и не обещает доход. Заполните паспорт предмета, издержки и риски."],
];

export function analyzeLearningCs2Market(code: string): LearningCs2MarketResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Добавьте небольшую учебную карточку: тип, float, seed, наклейки, hold, комиссия или сопоставимые предложения." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = []; const variables: Record<string, Value> = {};
  if (/тип\s*:|type\s*:/i.test(code)) output.push("Найден тип предмета. Сначала проверьте точное имя и вариант, а затем переходите к состоянию и модификаторам.");
  if (/float\s*:|wear\s*:|\b(?:FN|MW|FT|WW|BS)\b/i.test(code)) output.push("Найдено состояние или float. Сравнивайте конкретный float с релевантными аналогами, а не только ярлык состояния.");
  if (/seed\s*:|pattern\s*:/i.test(code)) output.push("Найден seed или pattern. Он важен только у finish, где расположение рисунка действительно меняет внешний вид и спрос.");
  if (/sticker|наклейк|slot|слот/i.test(code)) output.push("Найдена наклейка или слот. Проверяйте точное имя, позицию, wear наклейки и всю композицию, не складывая цены механически.");
  if (/комисси|fee|чистая сумма|net/i.test(code)) output.push("Найдены издержки. Для учебного решения важна чистая сумма после всех известных комиссий, а не только цена листинга.");
  if (/hold|trade protected|cooldown|ограничен/i.test(code)) output.push("Найдено ограничение сделки. Проверьте правила Steam и сроки до решения; обход ограничений не рассматривается.");
  if (/аналог|comparable|listing|ордер|ликвидност|спред/i.test(code)) output.push("Найдены данные рынка. Сравнивайте только сопоставимые предметы и фиксируйте, каких данных ещё не хватает.");
  if (/риск|отказ|наблюдать|reason/i.test(code)) output.push("Найдена дисциплина решения. Безопасный вывод «наблюдать» или «отказаться» корректен, если паспорт и риски не проверены.");
  const fields = Array.from(code.matchAll(/^\s*([^:\n]{2,32})\s*:/gm)).map((match) => match[1].trim()).slice(0, 10);
  if (fields.length) variables.fields = fields;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный CS2-разбор понимает тип, float/wear, seed/pattern, наклейки, комиссии, hold, аналоги и риск. Он не открывает Steam и не советует сделку." };
  return { output, variables };
}
