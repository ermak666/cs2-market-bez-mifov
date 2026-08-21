export type PracticeVolume = "junior" | "middle" | "senior" | "applied";
export type PracticeFormat = "Проверить карточку" | "Сравнить предложения" | "Оценить риск" | "Объяснить решение";
export type PracticeChallenge = { id: string; volume: PracticeVolume; format: PracticeFormat; title: string; level: string; task: string; hint: string; solution: string; check: (answer: string) => boolean };
export const practiceVolumeLabels: Record<PracticeVolume, string> = { junior: "Том I · Основа рынка", middle: "Том II · Аналитик предмета", senior: "Том III · Коллекционер", applied: "Том IV · Операционная дисциплина" };

type Seed = { title: string; level: string; key: string; hint: string; solution: string };
const cases: Record<PracticeVolume, Seed[]> = {
  junior: [
    { title: "Цена и комиссия", level: "Основа", key: "чист", hint: "Сравните цену листинга и сумму после комиссии.", solution: "Верное рассуждение: нужна чистая сумма после комиссии, а не только цена листинга." },
    { title: "Ордер и листинг", level: "Основа", key: "разн", hint: "Buy order, lowest listing и completed sale — разные вещи.", solution: "Верное рассуждение: ордер показывает желание купить, а не состоявшуюся сделку." },
    { title: "Ликвидность", level: "Основа", key: "ликвид", hint: "Посмотрите на скорость и глубину предложений.", solution: "Верное рассуждение: редкий предмет может быть дорогим, но плохо ликвидным." },
    { title: "Steam Guard", level: "Безопасность", key: "guard", hint: "Защита аккаунта важнее быстрой сделки.", solution: "Верное решение: не отключать защиту и учитывать ограничения Steam." },
    { title: "Недостаточно данных", level: "Дисциплина", key: "данн", hint: "Без полного паспорта предмета безопасно отложить решение.", solution: "Верное решение: наблюдать или отказаться до проверки данных." },
  ],
  middle: [
    { title: "Float", level: "Паспорт предмета", key: "float", hint: "Состояние и конкретный float — не одно и то же.", solution: "Верное рассуждение: сравнивайте точный float с релевантными аналогами." },
    { title: "Pattern и seed", level: "Паспорт предмета", key: "seed", hint: "Seed важен только для части finish.", solution: "Верное рассуждение: сначала проверьте, меняет ли рисунок внешний вид." },
    { title: "Наклейки", level: "Паспорт предмета", key: "слот", hint: "Укажите точное имя, слот и состояние наклейки.", solution: "Верное рассуждение: цена неиспользованной наклейки не равна премии craft." },
    { title: "Сопоставимые предложения", level: "Сравнение", key: "аналог", hint: "Сравнивайте одинаковый предмет и ключевые свойства.", solution: "Верное решение: выбрать 3–5 сопоставимых экземпляров." },
    { title: "Факт и гипотеза", level: "Сравнение", key: "гипотез", hint: "Ценник продавца сам по себе не доказывает цену.", solution: "Верное рассуждение: записать тезис, доказательства и причины отказаться." },
  ],
  senior: [
    { title: "Источник коллекции", level: "Коллекции", key: "источник", hint: "Отделите активный дроп, операцию, armory и вторичный рынок.", solution: "Верное решение: описать цепочку происхождения предмета." },
    { title: "Статус коллекции", level: "Коллекции", key: "дата", hint: "Статус дропа может измениться обновлением Valve.", solution: "Верное решение: указать дату проверки и источник статуса." },
    { title: "Supply и trade-up", level: "Коллекции", key: "10:1", hint: "Теоретический максимум через контракты не равен фактическому выпуску.", solution: "Верное рассуждение: подтвердить источник и механику, отделить доступные lower-tier предметы от математического максимума." },
    { title: "Float и pattern premium", level: "Коллекционер", key: "аналог", hint: "Нужны inspect, вид конкретного экземпляра и 3–5 сопоставимых вариантов.", solution: "Верное решение: не называть premium без релевантных аналогов и подтверждённого спроса." },
    { title: "Sticker craft и брелок", level: "Коллекционер", key: "detachment", hint: "Нужны slot, scrape, композиция, базовая цена и стоимость Charm Detachment.", solution: "Верное рассуждение: не складывать цены наклеек и не отделять брелок без проверки итоговой суммы и аналогов." },
  ],
  applied: [
    { title: "Чек-лист до решения", level: "Дисциплина", key: "паспор", hint: "Нужны паспорт, аналоги, издержки, срок и риск.", solution: "Верное решение: отложить действие, если ключевое поле не проверено." },
    { title: "Четыре площадки", level: "Издержки", key: "итог", hint: "Сравнивайте exact item, итоговую сумму, регион, KYC, hold, вывод и срок только на CSFloat, CS.MONEY, Lis-Skins и BUFF163.", solution: "Верное решение: не выбирать площадку по одному листингу или старому проценту комиссии; если итог неясен, отказаться." },
    { title: "Trade Protection", level: "Правила Steam", key: "7", hint: "У CS2-предметов есть защитный период после trade.", solution: "Верное рассуждение: учитывать 7-дневную защиту и последствия reversal." },
    { title: "Ложный репорт", level: "Антискам", key: "скам", hint: "Поддержка Steam не просит передавать код или предмет на проверку.", solution: "Верное решение: прекратить диалог, не передавать данные и использовать официальный Steam Support." },
    { title: "Подмена предмета", level: "Антискам", key: "провер", hint: "Сверьте каждый предмет перед подтверждением оффера.", solution: "Верное решение: не торопиться и проверить exact name, quality и свойства." },
    { title: "Слух и первоисточник", level: "Проверка фактов", key: "первоист", hint: "Найдите автора, дату, официальный текст и область действия правила.", solution: "Верное решение: считать слух неподтверждённым, пока нет первоисточника и альтернативных причин движения рынка." },
    { title: "Журнал решения", level: "Дисциплина", key: "риск", hint: "Запишите тезис, факт, издержки, риск и вывод.", solution: "Верное решение: учиться на записи решения, а не на эмоции после него." },
  ],
};

const formats: PracticeFormat[] = ["Проверить карточку", "Сравнить предложения", "Оценить риск", "Объяснить решение"];
export const practiceChallenges: PracticeChallenge[] = (Object.keys(cases) as PracticeVolume[]).flatMap((volume) => cases[volume].map((seed, index) => ({ id: `cs2-${volume}-${index + 1}`, volume, format: formats[index % formats.length], title: seed.title, level: seed.level, task: `Учебный кейс «${seed.title}»: дайте безопасный вывод по карточке и объясните его без обещаний дохода.`, hint: seed.hint, solution: seed.solution, check: (answer) => answer.trim().toLowerCase().includes(seed.key.toLowerCase()) })));
export function evaluatePractice(challenge: PracticeChallenge, answer: string) {
  if (!answer.trim()) return { correct: false, message: "Сначала напишите короткое безопасное объяснение решения." };
  if (challenge.check(answer)) return { correct: true, message: "Верно. Вы заметили ключевой признак; сравните ответ с разбором кейса." };
  return { correct: false, message: "Пока не совпало. Вернитесь к подсказке и проверьте, какого факта или риска не хватает." };
}
