export type JavaScriptLesson = { id: string; number: number; stage: "junior" | "middle" | "senior" | "applied"; title: string; goal: string; analogy: string; code: string; explanation: string; tasks: { title: string; prompt: string; hint: string; solution: string }[] };
export type JavaScriptVolume = { id: JavaScriptLesson["stage"]; title: string; lessons: JavaScriptLesson[] };
type Seed = Omit<JavaScriptLesson, "id" | "number" | "stage" | "tasks">;

const make = (stage: JavaScriptLesson["stage"], number: number, seed: Seed): JavaScriptLesson => ({ ...seed, id: `js-${stage}-${number}`, number, stage, tasks: [
  { title: "Задача 1. Повтори пример", prompt: `Напиши пример для темы «${seed.title}».`, hint: "Начни с самой короткой версии и проверь одну строку за раз.", solution: seed.code },
  { title: "Задача 2. Объясни", prompt: `Своими словами объясни: ${seed.code}`, hint: "Назови, что хранится, что меняется или что выводится.", solution: seed.explanation },
  { title: "Задача 3. Сделай маленький шаг", prompt: `Измени пример для темы «${seed.title}» безопасным способом.`, hint: "Измени одно значение, а не весь код сразу.", solution: `Измените одно значение в примере и снова посмотрите учебный результат.` },
] });

const junior: Seed[] = [
  { title: "JavaScript оживляет страницу", goal: "Понять роль JavaScript.", analogy: "HTML — дом, CSS — краска, а JavaScript — кнопка звонка, которая заставляет дом отвечать.", code: "console.log('Привет!')", explanation: "console.log выводит сообщение в учебную консоль." },
  { title: "Переменная let", goal: "Сохранять меняющееся значение.", analogy: "let — коробка с наклейкой: в неё можно положить новое значение.", code: "let score = 0;\nscore = score + 1;\nconsole.log(score)", explanation: "Переменная score сначала равна 0, затем увеличивается до 1." },
  { title: "Постоянная const", goal: "Отличать неизменное значение.", analogy: "const — табличка на двери: имя остаётся тем же.", code: "const course = 'JavaScript';\nconsole.log(course)", explanation: "const хранит значение, которое не нужно переназначать." },
  { title: "Строки", goal: "Работать с текстом.", analogy: "Строка — записка в кавычках.", code: "const name = 'Миша';\nconsole.log('Привет, ' + name)", explanation: "Знак + соединяет текст и значение переменной." },
  { title: "Числа и вычисления", goal: "Выполнять простые расчёты.", analogy: "Оператор — маленький калькулятор между двумя числами.", code: "const apples = 2 + 3;\nconsole.log(apples)", explanation: "JavaScript складывает числа и выводит 5." },
  { title: "Сравнение", goal: "Проверять равенство.", analogy: "=== — строгая проверка паспорта: совпасть должны и значение, и тип.", code: "console.log(5 === 5)", explanation: "Строгое сравнение возвращает true, когда значения одинаковы." },
];
const middle: Seed[] = [
  { title: "Условие if", goal: "Выбирать действие по правилу.", analogy: "if — светофор: если зелёный, можно идти.", code: "const age = 12;\nif (age >= 10) { console.log('Можно учиться дальше') }", explanation: "Код внутри if запускается, когда условие истинно." },
  { title: "else — другой путь", goal: "Обрабатывать второй вариант.", analogy: "else — запасная дорожка, если главная закрыта.", code: "const rain = true;\nif (rain) { console.log('Зонт') } else { console.log('Прогулка') }", explanation: "else выполняется, когда условие if ложно." },
  { title: "Функция", goal: "Собирать повторяемое действие.", analogy: "Функция — рецепт: дал имя, потом готовишь его столько раз, сколько нужно.", code: "function greet() { console.log('Привет!') }\ngreet()", explanation: "Функция хранит действие, а вызов greet() его запускает." },
  { title: "Параметры", goal: "Передавать функции данные.", analogy: "Параметр — пустое место в рецепте для имени гостя.", code: "function greet(name) { console.log('Привет, ' + name) }\ngreet('Аня')", explanation: "name получает значение Аня при вызове функции." },
  { title: "Массив", goal: "Хранить несколько значений.", analogy: "Массив — коробка с пронумерованными ячейками.", code: "const topics = ['let', 'if', 'function'];\nconsole.log(topics[0])", explanation: "Индексация начинается с нуля, поэтому topics[0] — let." },
  { title: "Цикл for", goal: "Повторять действие по списку.", analogy: "for — воспитатель, который по очереди называет каждого из списка.", code: "const topics = ['let', 'if'];\nfor (const topic of topics) { console.log(topic) }", explanation: "Цикл for...of берёт каждый элемент массива по очереди." },
];
const senior: Seed[] = [
  { title: "Объект", goal: "Связывать свойства одной вещи.", analogy: "Объект — карточка персонажа: имя, уровень и очки лежат вместе.", code: "const learner = { name: 'Аня', level: 1 };\nconsole.log(learner.name)", explanation: "Точка получает свойство name из объекта." },
  { title: "Метод массива map", goal: "Создавать новый список.", analogy: "map — конвейер: каждая деталь получает одинаковое преобразование.", code: "const points = [1, 2, 3];\nconsole.log(points.map((point) => point * 2))", explanation: "map создаёт новый массив [2, 4, 6]." },
  { title: "Метод filter", goal: "Оставлять подходящие элементы.", analogy: "filter — сито, через которое проходят только нужные камушки.", code: "const points = [1, 2, 3];\nconsole.log(points.filter((point) => point > 1))", explanation: "filter оставляет значения, для которых условие true." },
  { title: "Модульность", goal: "Делить код на части.", analogy: "Модуль — отдельный ящик с инструментами, а не вся мастерская сразу.", code: "export function sum(a, b) { return a + b }", explanation: "export делает функцию доступной другому файлу проекта." },
  { title: "Ошибка и проверка", goal: "Проверять входные данные.", analogy: "Проверка — охранник, который не пропускает пустой билет.", code: "function showName(name) { if (!name) return 'Нет имени'; return name }", explanation: "Ранний return безопасно завершает функцию, если значения нет." },
  { title: "Асинхронность без спешки", goal: "Понять обещание результата.", analogy: "Promise — талон в кафе: заказ уже принят, но блюдо будет позже.", code: "Promise.resolve('Готово').then(console.log)", explanation: "then получает значение после завершения обещания." },
];
const applied: Seed[] = [
  { title: "План мини-проекта", goal: "Разбить идею на шаги.", analogy: "Проект — рецепт ужина: ингредиенты, шаги и проверка готовы заранее.", code: "const tasks = ['Макет', 'Логика', 'Проверка'];\nconsole.log(tasks)", explanation: "Список шагов помогает не потерять порядок работы." },
  { title: "Счётчик", goal: "Собрать простую логику состояния.", analogy: "Счётчик — табло, которое меняет число после каждого нажатия.", code: "let count = 0;\ncount += 1;\nconsole.log(count)", explanation: "Оператор += увеличивает текущее значение." },
  { title: "Список задач", goal: "Использовать массив объектов.", analogy: "Список задач — набор карточек, у каждой есть текст и отметка.", code: "const todo = [{ title: 'Урок', done: false }];\nconsole.log(todo[0].title)", explanation: "Массив хранит карточки объектов, свойство title даёт текст задачи." },
  { title: "Фильтр задач", goal: "Показывать нужную часть списка.", analogy: "Фильтр — цветная папка, в которой видны только невыполненные дела.", code: "const todo = [{ done: false }, { done: true }];\nconsole.log(todo.filter((item) => !item.done))", explanation: "filter оставляет элементы, у которых done равно false." },
  { title: "Проверка функции", goal: "Проверять ожидаемый результат.", analogy: "Тест — контрольный вопрос после рецепта: получилось ли именно то блюдо.", code: "function add(a, b) { return a + b }\nconsole.log(add(2, 3) === 5)", explanation: "Сравнение результата с 5 проверяет функцию add." },
  { title: "Итоговый проект", goal: "Объединить логику и понятный интерфейс.", analogy: "Итоговый проект — маленькая выставка: идея, аккуратные шаги, проверка и инструкция для гостя.", code: "const project = { name: 'Трекер привычек', ready: true };\nconsole.log(project.name)", explanation: "Объект собирает главные данные мини-проекта в одном месте." },
];
const volume = (stage: JavaScriptLesson["stage"], title: string, start: number, seeds: Seed[]): JavaScriptVolume => ({ id: stage, title, lessons: seeds.map((seed, index) => make(stage, start + index, seed)) });
export const javascriptCourse: JavaScriptVolume[] = [
  volume("junior", "Том I · Junior: основы JavaScript", 1, junior),
  volume("middle", "Том II · Middle: логика и списки", 7, middle),
  volume("senior", "Том III · Senior: структура и качество", 13, senior),
  volume("applied", "Том IV · Проекты и практика", 19, applied),
];
