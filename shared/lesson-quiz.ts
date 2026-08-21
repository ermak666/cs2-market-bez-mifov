import type { Lesson } from "@/shared/course-types";

export type QuizQuestion = { id: string; question: string; options: string[]; correctIndex: number; explanation: string };
type QuizBank = Record<string, QuizQuestion[]>;

const banks: QuizBank = {
  junior: [
    { id: "j-net", question: "Что важнее красивой цены листинга?", options: ["Чистая сумма после известных комиссий и риск", "Срочно подтвердить сделку", "Чужое обещание дохода"], correctIndex: 0, explanation: "Это добровольная самопроверка: листинг не равен чистому результату и не гарантирует продажу." },
    { id: "j-orders", question: "Чем buy order отличается от completed sale?", options: ["Это желание купить, а не состоявшаяся сделка", "Ничем", "Это пароль Steam"], correctIndex: 0, explanation: "Ордер, листинг и фактическая продажа — разные рыночные сигналы." },
  ],
  middle: [
    { id: "m-float", question: "Что корректно проверить вместе с wear?", options: ["Конкретный float и сопоставимые экземпляры", "Только цвет редкости", "Код Steam Guard"], correctIndex: 0, explanation: "Wear — общий диапазон; конкретный float описывает экземпляр точнее." },
    { id: "m-stickers", question: "Как смотреть на sticker craft?", options: ["Как на композицию: имя, слот, wear и вид", "Как на сумму цен всех наклеек", "Как на гарантию премии"], correctIndex: 0, explanation: "Цена неиспользованной наклейки не переносится автоматически на предмет." },
  ],
  senior: [
    { id: "s-source", question: "Как фиксировать статус коллекции?", options: ["Со ссылкой на источник и датой проверки", "По старому ролику", "Как неизменный факт"], correctIndex: 0, explanation: "Дроп и доступность меняются обновлениями, поэтому нужна дата проверки." },
    { id: "s-pattern", question: "Когда seed имеет смысл учитывать?", options: ["Когда pattern заметно меняет вид и есть подтверждённые аналоги", "Всегда", "Никогда не проверяя предмет"], correctIndex: 0, explanation: "Seed важен не для каждого finish; сначала проверяется реальный внешний вид и спрос." },
  ],
  applied: [
    { id: "a-scam", question: "Что делать при просьбе передать предмет «на проверку»?", options: ["Остановиться и не передавать предмет, код или пароль", "Спешить, чтобы не упустить шанс", "Отключить Steam Guard"], correctIndex: 0, explanation: "Настоящая защита не требует передавать доступ или предмет незнакомцу." },
    { id: "a-stop", question: "Какой вывод корректен при неполном паспорте предмета?", options: ["Наблюдать или отказаться до проверки", "Покупать на эмоциях", "Верить рекламе"], correctIndex: 0, explanation: "Безопасная дисциплина допускает отказ от решения при недостатке данных." },
  ],
};

export function getLessonQuiz(lesson: Lesson): QuizQuestion { const volumeId = lesson.id.split("-")[1] ?? "junior"; const bank = banks[volumeId] ?? banks.junior; return bank[(Math.max(lesson.number, 1) - 1) % bank.length]; }
