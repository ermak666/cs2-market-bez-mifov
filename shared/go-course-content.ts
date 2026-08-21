import type { CourseData } from "./course-types";
type Stage = "junior" | "middle" | "senior" | "applied";
type Seed = { title: string; analogy: string; code: string; focus: string };
const seeds: Record<Stage, Seed[]> = {
  junior: [
    { title: "Пакет и main", analogy: "package main — табличка на входе в мастерскую, а main — первая команда дня.", code: "package main\n\nfunc main() { }", focus: "Программа начинается с понятной точки входа." },
    { title: "Переменные", analogy: "Переменная — подписанная коробка с числом, словом или ответом да/нет.", code: "name := \"Лена\"", focus: "Короткое объявление := удобно внутри функции, когда тип понятен." },
    { title: "Функция", analogy: "Функция — станок, который делает одну небольшую работу.", code: "func add(a, b int) int { return a + b }", focus: "Ясное имя и один смысл делают функцию удобной." },
    { title: "Условия", analogy: "if — развилка в коридоре мастерской.", code: "if score >= 10 { fmt.Println(\"Уровень\") }", focus: "Условие выбирает путь программы без скрытой магии." },
    { title: "Цикл for", analogy: "for — помощник, который спокойно повторяет один шаг.", code: "for i := 0; i < 3; i++ { }", focus: "В Go один понятный цикл for покрывает основные повторения." },
    { title: "Ошибки", analogy: "error — карточка: работа либо получилась, либо нужно объяснить, что пошло не так.", code: "value, err := parse(input)", focus: "Проверяйте err рядом с местом, где он появился." },
  ],
  middle: [
    { title: "Struct", analogy: "struct — карточка изделия с полями: названием, ценой и состоянием.", code: "type Book struct { Title string; Pages int }", focus: "Struct объединяет связанные данные в одну понятную модель." },
    { title: "Метод", analogy: "Метод — умение конкретного изделия из struct.", code: "func (b Book) Label() string { return b.Title }", focus: "Receiver показывает, к какой модели относится действие." },
    { title: "Указатель", analogy: "Указатель — адрес коробки: позволяет менять именно её, а не копию.", code: "func (b *Book) Rename(title string) { b.Title = title }", focus: "Используйте указатель осознанно, когда нужно изменение или избегание крупной копии." },
    { title: "Slice", analogy: "Slice — гибкая лента карточек, которую можно расширять.", code: "books := []Book{}", focus: "Slice удобен для упорядоченных наборов данных." },
    { title: "Map", analogy: "Map — шкаф с ячейками по ключу.", code: "scores := map[string]int{}", focus: "Проверяйте, есть ли ключ, когда отсутствие важно." },
    { title: "Interface", analogy: "Interface — обещание умений, а не строгий чертёж объекта.", code: "type Saver interface { Save() error }", focus: "Небольшой interface проще реализовать и тестировать." },
  ],
  senior: [
    { title: "Goroutine", analogy: "goroutine — помощник, который делает маленькую независимую работу.", code: "go loadTitle()", focus: "Не запускайте фоновые задачи без понятного завершения и результата." },
    { title: "Channel", analogy: "channel — безопасная трубка, по которой помощники передают записки.", code: "done := make(chan struct{})", focus: "Channel выражает передачу данных или сигнал завершения." },
    { title: "select", analogy: "select — диспетчер, который ждёт первую доступную записку.", code: "select { case value := <-results: _ = value }", focus: "select помогает работать с несколькими channel без блокировки интерфейса." },
    { title: "Context", analogy: "context — вежливый сигнал: пора остановиться, время закончилось или задача отменена.", code: "ctx, cancel := context.WithCancel(parent)", focus: "Передавайте context первым параметром долгой операции и обязательно вызывайте cancel." },
    { title: "Тест", analogy: "Тест — маленький проверяющий: дал вход, сравнил результат, объяснил расхождение.", code: "func TestAdd(t *testing.T) { }", focus: "Тестируйте поведение и граничные случаи, а не детали реализации." },
    { title: "Гонки данных", analogy: "Гонка — когда два помощника одновременно переписывают одну карточку.", code: "var mu sync.Mutex", focus: "Либо передавайте данные по channel, либо защищайте общее состояние." },
  ],
  applied: [
    { title: "Проект: каталог", analogy: "Каталог книг — маленькая мастерская с понятной моделью и списком.", code: "type Book struct { ID string; Title string }", focus: "Начните с модели и простого набора данных." },
    { title: "Проект: интерфейс хранилища", analogy: "Интерфейс — обещание: каталог умеет сохранить и найти книгу, независимо от места хранения.", code: "type BookStore interface { Find(id string) (Book, error) }", focus: "Маленький interface отделяет логику от детали хранения." },
    { title: "Проект: HTTP-обработчик", analogy: "Handler — окно выдачи: получает аккуратный запрос и возвращает понятный ответ.", code: "func booksHandler(w http.ResponseWriter, r *http.Request) { }", focus: "Проверяйте метод, вход и ошибку; не показывайте внутренние детали." },
    { title: "Проект: context", analogy: "Context не даёт долгой работе продолжаться, когда посетитель уже ушёл.", code: "ctx := r.Context()", focus: "Передавайте context вниз в операции, которые могут ждать." },
    { title: "Проект: тест handler", analogy: "Тест handler — репетиция запроса без настоящего сервера.", code: "req := httptest.NewRequest(\"GET\", \"/books\", nil)", focus: "Проверяйте статус, ответ и граничные сценарии." },
    { title: "Проект: README", analogy: "README — карта мастерской: запуск, маршруты, тесты и ограничения.", code: "цель → пакеты → маршруты → тесты", focus: "Опишите проект простыми проверяемыми шагами." },
  ],
};
const titles: Record<Stage, string> = { junior: "Том I · Junior: основы Go", middle: "Том II · Middle: модели и интерфейсы", senior: "Том III · Senior: конкурентность и качество", applied: "Том IV · Web-проекты" };
const body = (seed: Seed) => `Цель. Понять тему «${seed.title}».\n\nАналогия. ${seed.analogy}\n\n### Пример\n\n\`\`\`go\n${seed.code}\n\`\`\`\n\n### Разбор\n\n${seed.focus}\n\n### Практика\n\n#### Задача 1\nОбъясните этот Go-фрагмент своими словами.\n\nПодсказка. Найдите данные, функцию, ошибку, goroutine или channel.\n\nРазбор решения. ${seed.focus}\n\n#### Задача 2\nНазовите безопасный граничный случай.\n\nПодсказка. Подумайте о пустом вводе, ошибке, отмене context или закрытом channel.\n\nРазбор решения. ${seed.analogy}\n\n#### Задача 3\nНапишите короткий похожий пример.\n\nПодсказка. Сделайте один небольшой шаг и верните понятную ошибку при необходимости.\n\nРазбор решения. Go-код легче поддерживать, когда ошибки и границы конкурентной работы описаны явно.`;
export const goCourseContent: CourseData = { volumes: (Object.keys(seeds) as Stage[]).map((stage, stageIndex) => ({ id: stage, title: titles[stage], lessons: seeds[stage].map((seed, index) => ({ id: `go-${stage}-${stageIndex * 6 + index + 1}`, number: stageIndex * 6 + index + 1, title: seed.title, goal: `Понять тему «${seed.title}».`, analogy: seed.analogy, code: seed.code, body: body(seed) })) })) };
