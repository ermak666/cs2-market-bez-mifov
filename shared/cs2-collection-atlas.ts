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
  { id: "dust", name: "The Dust Collection", studyAngle: "Базовый пример исторической коллекции: изучайте происхождение, а не делайте вывод о будущей цене.", source, verifiedAt: "2026-08-21", caution },
  { id: "cobblestone", name: "The Cobblestone Collection", studyAngle: "Пример коллекции, вокруг которой часто обсуждают редкие экземпляры и сувенирные варианты.", source, verifiedAt: "2026-08-21", caution },
  { id: "norse", name: "The Norse Collection", studyAngle: "Пример современной тематической коллекции: сравнивайте точный finish, float и спрос на конкретный экземпляр.", source, verifiedAt: "2026-08-21", caution },
  { id: "st-marc", name: "The St. Marc Collection", studyAngle: "Пример коллекции с ярким визуальным языком, полезный для изучения finish и коллекционной истории.", source, verifiedAt: "2026-08-21", caution },
  { id: "canals", name: "The Canals Collection", studyAngle: "Пример того, как узнаваемость дизайна и происхождение не отменяют проверку ликвидности.", source, verifiedAt: "2026-08-21", caution },
  { id: "ancient", name: "The Ancient Collection", studyAngle: "Пример связки коллекции и карты: фиксируйте источник и дату проверки статуса.", source, verifiedAt: "2026-08-21", caution },
  { id: "control", name: "The Control Collection", studyAngle: "Пример для изучения различий между коллекцией, кейсом и вторичным рынком.", source, verifiedAt: "2026-08-21", caution },
  { id: "havoc", name: "The Havoc Collection", studyAngle: "Пример, на котором удобно тренировать проверку точного предмета и сопоставимых предложений.", source, verifiedAt: "2026-08-21", caution },
  { id: "rising-sun", name: "The Rising Sun Collection", studyAngle: "Пример исторической тематической коллекции без вывода о её будущей стоимости.", source, verifiedAt: "2026-08-21", caution },
  { id: "gods-monsters", name: "The Gods and Monsters Collection", studyAngle: "Пример для разговора о визуальном спросе и необходимости отличать факт от рекламы.", source, verifiedAt: "2026-08-21", caution },
  { id: "chop-shop", name: "The Chop Shop Collection", studyAngle: "Пример коллекции, в которой особенно важно смотреть на конкретный finish и состояние.", source, verifiedAt: "2026-08-21", caution },
  { id: "baggage", name: "The Baggage Collection", studyAngle: "Пример старой коллекции: старый источник не означает автоматическую ликвидность.", source, verifiedAt: "2026-08-21", caution },
];
