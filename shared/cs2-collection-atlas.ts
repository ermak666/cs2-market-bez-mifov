export type CollectionAtlasEntry = {
  id: string;
  name: string;
  studyAngle: string;
  source: string;
  verifiedAt: string;
  caution: string;
};

const source = "https://www.csgodatabase.com/collections/";
const caution = "Атлас объясняет происхождение и язык коллекционеров. Перед любым действием проверьте актуальный статус дропа, точный предмет, правила площадки и сопоставимые предложения; это не рекомендация покупать или продавать.";

export const cs2CollectionAtlas: CollectionAtlasEntry[] = [
  { id: "dust", name: "The Dust Collection", studyAngle: "Тренажёр происхождения: зафиксируйте источник и дату статуса, затем отдельно проверьте обычные продажи и срок выхода. Историчность не доказывает спрос.", source, verifiedAt: "2026-08-21", caution },
  { id: "cobblestone", name: "The Cobblestone Collection", studyAngle: "Тренажёр различия базового предмета, сувенирного варианта и premium за свойства. Сравнивайте только совпадающий вариант и не переносите цену редкого лота на обычный.", source, verifiedAt: "2026-08-21", caution },
  { id: "norse", name: "The Norse Collection", studyAngle: "Тренажёр паспорта экземпляра: exact finish, float, вид конкретного предмета и 3–5 релевантных аналогов до обсуждения premium.", source, verifiedAt: "2026-08-21", caution },
  { id: "st-marc", name: "The St. Marc Collection", studyAngle: "Тренажёр визуального спроса: узнаваемый дизайн — лишь гипотеза; проверьте исполненные продажи, спред и время продажи вместо оценок красоты.", source, verifiedAt: "2026-08-21", caution },
  { id: "canals", name: "The Canals Collection", studyAngle: "Тренажёр ликвидности: происхождение и узнаваемость не отменяют узкий спрос. Запишите число лотов, сопоставимые сделки и допустимый срок выхода.", source, verifiedAt: "2026-08-21", caution },
  { id: "ancient", name: "The Ancient Collection", studyAngle: "Тренажёр статуса источника: свяжите коллекцию с картой, добавьте дату и первичный источник; любое обновление может изменить вывод.", source, verifiedAt: "2026-08-21", caution },
  { id: "control", name: "The Control Collection", studyAngle: "Тренажёр supply: отличите коллекцию, кейс и вторичный рынок, затем проверьте, существует ли trade-up-сценарий, не называя расчётный максимум прогнозом.", source, verifiedAt: "2026-08-21", caution },
  { id: "havoc", name: "The Havoc Collection", studyAngle: "Тренажёр сравнения: сначала exact item и свойства, затем только такие же аналоги; один высокий листинг не становится ценой всей коллекции.", source, verifiedAt: "2026-08-21", caution },
  { id: "rising-sun", name: "The Rising Sun Collection", studyAngle: "Тренажёр границы вывода: старый источник объясняет происхождение, но не говорит, насколько быстро конкретный предмет можно продать после издержек.", source, verifiedAt: "2026-08-21", caution },
  { id: "gods-monsters", name: "The Gods and Monsters Collection", studyAngle: "Тренажёр проверки истории: отделите факт о коллекции от рекламы и слуха, найдите дату первичного источника и альтернативное объяснение спроса.", source, verifiedAt: "2026-08-21", caution },
  { id: "chop-shop", name: "The Chop Shop Collection", studyAngle: "Тренажёр premium: сравнивайте один finish и близкий wear; float, pattern, StatTrak и наклейки меняют предмет и делают аналог другим.", source, verifiedAt: "2026-08-21", caution },
  { id: "baggage", name: "The Baggage Collection", studyAngle: "Тренажёр решения «наблюдать»: если источник понятен, но нет понятных продаж, спреда или срока выхода, безопасный вывод — не делать сделку.", source, verifiedAt: "2026-08-21", caution },
];
