import type { CourseData } from "./course-types";
type Stage = "junior" | "middle" | "senior" | "applied";
type Seed = { title: string; analogy: string; code: string; focus: string };
const seeds: Record<Stage, Seed[]> = {
  junior: [
    { title: "let и изменяемость", analogy: "let — подписанная карточка; mut — пометка, что её содержимое разрешено менять.", code: "let mut score = 0;", focus: "Rust просит явно сказать, что значение будет меняться." },
    { title: "Функция", analogy: "fn — маленький станок с входом и понятным результатом.", code: "fn add(a: i32, b: i32) -> i32 { a + b }", focus: "Типы параметров и результата делают договор функции ясным." },
    { title: "if как выражение", analogy: "if может не только выбрать дорогу, но и вернуть нужную карточку.", code: "let label = if score > 0 { \"Есть\" } else { \"Нет\" };", focus: "Ветви if должны возвращать совместимые типы." },
    { title: "Цикл", analogy: "for — помощник, который бережно проходит по каждой карточке.", code: "for item in items { println!(\"{item}\"); }", focus: "Выбирайте владение или ссылку на элементы осознанно." },
    { title: "Ownership", analogy: "У каждой книги есть один ответственный владелец.", code: "let title = String::from(\"Rust\");", focus: "Когда владелец уходит, Rust безопасно освобождает данные." },
    { title: "Borrowing", analogy: "& — временно посмотреть книгу, не забирая её себе.", code: "fn length(text: &str) -> usize { text.len() }", focus: "Ссылка позволяет читать данные без передачи владения." },
  ],
  middle: [
    { title: "Struct", analogy: "struct — карточка сущности с честно названными полями.", code: "struct Book { title: String, pages: u32 }", focus: "Struct объединяет связанные данные в понятную модель." },
    { title: "impl и метод", analogy: "impl — раздел умений, которые относятся к конкретной модели.", code: "impl Book { fn label(&self) -> &str { &self.title } }", focus: "&self берёт ссылку на модель для чтения." },
    { title: "Enum", analogy: "enum — выбор одной карточки из закрытого набора состояний.", code: "enum LoadState { Ready, Loading, Failed }", focus: "Enum помогает явно описать возможные состояния." },
    { title: "match", analogy: "match — аккуратный распределитель, который обрабатывает каждую карточку enum.", code: "match state { LoadState::Ready => {} _ => {} }", focus: "Обрабатывайте все варианты или осознанно используйте _." },
    { title: "Option", analogy: "Option — коробка, в которой предмет либо есть, либо его нет.", code: "let title: Option<String> = None;", focus: "Option заменяет опасное пустое значение явным вариантом None." },
    { title: "Result", analogy: "Result — конверт: успех с данными или понятная ошибка.", code: "fn parse_id(text: &str) -> Result<u32, String> { Ok(1) }", focus: "Возвращайте и обрабатывайте ошибку явно, не скрывайте её." },
  ],
  senior: [
    { title: "Trait", analogy: "trait — обещание умений, которое могут выполнить разные модели.", code: "trait Save { fn save(&self) -> Result<(), String>; }", focus: "Небольшой trait делает код гибче и проще для тестов." },
    { title: "Generics", analogy: "Generic — форма для разных, но похожих карточек.", code: "fn first<T>(items: &[T]) -> Option<&T> { items.first() }", focus: "Параметр типа помогает переиспользовать безопасную логику." },
    { title: "Iterator", analogy: "Iterator — спокойная лента, которая выдаёт элементы по одному.", code: "let names = books.iter().map(|b| &b.title);", focus: "iter берёт ссылки, а into_iter обычно забирает владение." },
    { title: "Ошибки с ?", analogy: "? — вежливый курьер: если есть ошибка, сразу вернуть её выше.", code: "let id = text.parse::<u32>()?;", focus: "? сокращает путь ошибки, сохраняя её явной в Result." },
    { title: "async", analogy: "async — обещание работы, которую можно спокойно ждать без блокировки всего стола.", code: "async fn load_title() -> Result<String, String> { Ok(String::new()) }", focus: "Async-функция возвращает future; её запуск и отмену продумывают отдельно." },
    { title: "Тест", analogy: "Тест — маленький библиотекарь, который проверяет правило на примерах.", code: "#[test]\nfn adds_numbers() { assert_eq!(add(2, 3), 5); }", focus: "Проверяйте поведение и граничные случаи." },
  ],
  applied: [
    { title: "Проект: модель", analogy: "Список дел начинается с карточки задачи, а не с большого сервера.", code: "struct Task { id: u32, title: String, done: bool }", focus: "Модель задаёт общий словарь проекта." },
    { title: "Проект: состояние", analogy: "enum показывает, где находится задача: новая, в работе или готова.", code: "enum TaskState { New, Done }", focus: "Явные состояния уменьшают путаницу в логике." },
    { title: "Проект: хранилище", analogy: "Trait хранилища обещает найти и сохранить задачу без привязки к конкретному месту.", code: "trait TaskStore { fn find(&self, id: u32) -> Option<Task>; }", focus: "Trait отделяет доменную логику от детали хранения." },
    { title: "Проект: Result", analogy: "Ошибка проекта — понятная записка пользователю, а не паника.", code: "fn validate(title: &str) -> Result<(), String> { Ok(()) }", focus: "Показывайте безопасную причину и следующий шаг, не внутренние детали." },
    { title: "Проект: async граница", analogy: "Async-граница — дверь, за которой ожидание не мешает остальным делам.", code: "async fn load_tasks() -> Result<Vec<Task>, String> { Ok(vec![]) }", focus: "Держите async на границе ввода-вывода и передавайте ошибки выше." },
    { title: "Проект: README", analogy: "README — карта библиотеки: модули, запуск, тесты и ограничения.", code: "цель → модули → Result → тесты", focus: "Опишите проект простыми проверяемыми шагами." },
  ],
};
const titles: Record<Stage, string> = { junior: "Том I · Junior: основы и владение", middle: "Том II · Middle: модели и ошибки", senior: "Том III · Senior: trait, iterator и async", applied: "Том IV · Проекты" };
const body = (seed: Seed) => `Цель. Понять тему «${seed.title}».\n\nАналогия. ${seed.analogy}\n\n### Пример\n\n\`\`\`rust\n${seed.code}\n\`\`\`\n\n### Разбор\n\n${seed.focus}\n\n### Практика\n\n#### Задача 1\nОбъясните этот Rust-фрагмент своими словами.\n\nПодсказка. Найдите владельца, ссылку, вариант enum, Option или Result.\n\nРазбор решения. ${seed.focus}\n\n#### Задача 2\nНазовите безопасный граничный случай.\n\nПодсказка. Подумайте о пустой строке, None, Err или конкурирующей изменяемой ссылке.\n\nРазбор решения. ${seed.analogy}\n\n#### Задача 3\nНапишите короткий похожий пример.\n\nПодсказка. Сделайте один небольшой шаг и верните Result, когда операция может не получиться.\n\nРазбор решения. Rust-код легче поддерживать, когда владение, границы данных и ошибки описаны явно.`;
export const rustCourseContent: CourseData = { volumes: (Object.keys(seeds) as Stage[]).map((stage, stageIndex) => ({ id: stage, title: titles[stage], lessons: seeds[stage].map((seed, index) => ({ id: `rust-${stage}-${stageIndex * 6 + index + 1}`, number: stageIndex * 6 + index + 1, title: seed.title, goal: `Понять тему «${seed.title}».`, analogy: seed.analogy, code: seed.code, body: body(seed) })) })) };
