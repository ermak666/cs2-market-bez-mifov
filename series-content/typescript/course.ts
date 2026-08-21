export type TypeScriptLesson = { id: string; number: number; stage: "junior" | "middle" | "senior" | "applied"; title: string; goal: string; analogy: string; code: string; explanation: string; tasks: { title: string; prompt: string; hint: string; solution: string }[] };
export type TypeScriptVolume = { id: TypeScriptLesson["stage"]; title: string; lessons: TypeScriptLesson[] };
type Seed = Omit<TypeScriptLesson, "id" | "number" | "stage" | "tasks">;

const make = (stage: TypeScriptLesson["stage"], number: number, seed: Seed): TypeScriptLesson => ({ ...seed, id: `ts-${stage}-${number}`, number, stage, tasks: [
  { title: "Задача 1. Повтори пример", prompt: `Напиши короткий пример для темы «${seed.title}».`, hint: "Сначала напиши имя и тип, затем самое простое значение.", solution: seed.code },
  { title: "Задача 2. Объясни", prompt: `Объясни своими словами: ${seed.code}`, hint: "Скажи, какую ошибку тип помогает заметить заранее.", solution: seed.explanation },
  { title: "Задача 3. Сделай шаг", prompt: `Измени пример «${seed.title}» безопасным способом.`, hint: "Не меняй сразу всё: добавь одно поле, тип или значение.", solution: "Меняйте код маленькими шагами и сверяйте сообщение типовой песочницы." },
] });

const junior: Seed[] = [
  { title: "Зачем нужен TypeScript", goal: "Понять роль типов.", analogy: "Тип — наклейка на коробке: она заранее говорит, что можно положить внутрь.", code: "const course: string = 'TypeScript';", explanation: "Аннотация string сообщает, что course хранит текст." },
  { title: "Тип string", goal: "Описывать текст.", analogy: "string — коробка только для записок.", code: "let name: string = 'Аня';", explanation: "Переменная name может хранить текст." },
  { title: "Тип number", goal: "Описывать число.", analogy: "number — коробка для счётчика.", code: "let score: number = 0;", explanation: "score хранит число и не должен стать строкой." },
  { title: "Тип boolean", goal: "Описывать да или нет.", analogy: "boolean — переключатель света: включено или выключено.", code: "const ready: boolean = true;", explanation: "ready может быть только true или false." },
  { title: "Вывод типа", goal: "Понять, когда тип угадывается.", analogy: "Иногда наклейку пишет сам помощник, если коробка уже заполнена.", code: "const lessons = 24;", explanation: "TypeScript выводит number из значения 24." },
  { title: "Массив строк", goal: "Типизировать список.", analogy: "Это полка, на которой лежат только записки.", code: "const topics: string[] = ['types', 'functions'];", explanation: "string[] запрещает положить число в список тем." },
];
const middle: Seed[] = [
  { title: "Тип функции", goal: "Описать вход и результат.", analogy: "Рецепт подписывает и ингредиенты, и готовое блюдо.", code: "function add(a: number, b: number): number { return a + b; }", explanation: "Функция принимает два числа и возвращает число." },
  { title: "Необязательный параметр", goal: "Делать часть данных необязательной.", analogy: "Знак вопроса говорит: эту коробку можно оставить пустой.", code: "function greet(name?: string) { return name ?? 'Гость'; }", explanation: "name может отсутствовать, поэтому выбран запасной текст." },
  { title: "Объектный тип", goal: "Описать форму объекта.", analogy: "Карточка ученика заранее перечисляет все нужные поля.", code: "type Learner = { name: string; level: number };", explanation: "Тип Learner описывает форму данных ученика." },
  { title: "Interface", goal: "Создать договор для объекта.", analogy: "interface — бланк, который заполняют одинаковые карточки.", code: "interface Course { title: string; lessons: number }", explanation: "Интерфейс задаёт обязательные свойства объекта." },
  { title: "Union", goal: "Разрешить несколько вариантов.", analogy: "Union — пропуск в одну из двух дверей, но не куда угодно.", code: "let theme: 'dark' | 'system' = 'dark';", explanation: "theme принимает только два перечисленных значения." },
  { title: "Проверка union", goal: "Сужать тип через условие.", analogy: "Проверка — фонарик, который помогает выбрать нужную дверь.", code: "function print(value: string | number) { if (typeof value === 'string') return value.toUpperCase(); return value; }", explanation: "typeof уточняет, с каким вариантом union работает код." },
];
const senior: Seed[] = [
  { title: "Generics", goal: "Сохранять тип данных.", analogy: "Generic — универсальная коробка, которая не теряет подпись вещи внутри.", code: "function first<T>(items: T[]): T | undefined { return items[0]; }", explanation: "T сохраняет тип элемента массива." },
  { title: "Readonly", goal: "Защитить данные от изменения.", analogy: "readonly — пломба на коробке: посмотреть можно, менять нельзя.", code: "type Config = { readonly apiUrl: string };", explanation: "apiUrl нельзя переназначить после создания объекта." },
  { title: "Partial", goal: "Сделать поля временно необязательными.", analogy: "Partial — черновик карточки, в котором можно заполнить не всё сразу.", code: "type Draft = Partial<{ title: string; done: boolean }>;", explanation: "Partial делает каждое поле необязательным." },
  { title: "Record", goal: "Описать словарь.", analogy: "Record — шкаф: у каждой подписанной ячейки есть значение одного типа.", code: "const scores: Record<string, number> = { anya: 5 };", explanation: "Ключи — строки, а значения — числа." },
  { title: "Unknown", goal: "Безопасно принять неизвестные данные.", analogy: "unknown — запечатанная посылка: сначала нужно проверить содержимое.", code: "function isText(value: unknown): value is string { return typeof value === 'string'; }", explanation: "unknown заставляет проверить значение до использования." },
  { title: "Ошибки типов", goal: "Читать сообщение компилятора.", analogy: "Ошибка типа — добрый редактор, который показывает место путаницы до выпуска.", code: "const level: number = 1;", explanation: "Если присвоить level текст, проверка типа остановит ошибку заранее." },
];
const applied: Seed[] = [
  { title: "Модель задачи", goal: "Описать данные мини-проекта.", analogy: "Модель — бланк карточки задачи.", code: "interface Task { id: string; title: string; done: boolean }", explanation: "Все задачи проекта будут иметь одинаковую понятную форму." },
  { title: "Тип состояния", goal: "Зафиксировать состояние интерфейса.", analogy: "Состояние — табло, на котором заранее понятны возможные надписи.", code: "type Status = 'idle' | 'loading' | 'done' | 'error';", explanation: "Status не даст случайно написать неизвестное состояние." },
  { title: "Тип ответа API", goal: "Проверять данные сервера.", analogy: "Это договор с курьером: какие поля он обязан принести.", code: "type ApiResult<T> = { data: T; error?: string };", explanation: "Generic ApiResult работает с разными данными, не теряя их тип." },
  { title: "Фильтр задач", goal: "Создать типизированную функцию.", analogy: "Фильтр — сито, которое знает форму каждой карточки.", code: "function openTasks(tasks: Task[]): Task[] { return tasks.filter((task) => !task.done); }", explanation: "Вход и результат функции оба остаются списком Task." },
  { title: "Проверка формы", goal: "Проверять ввод до использования.", analogy: "Проверка формы — охранник у входа в проект.", code: "function hasTitle(value: unknown): value is { title: string } { return typeof value === 'object' && value !== null && 'title' in value; }", explanation: "Проверка уточняет unknown перед обращением к title." },
  { title: "Итоговый проект", goal: "Собрать типизированный мини-проект.", analogy: "Итог — аккуратная витрина: модели, функции, проверки и понятный README.", code: "const project: { name: string; ready: boolean } = { name: 'Трекер задач', ready: true };", explanation: "Тип проекта защищает его главные данные от путаницы." },
];
const volume = (stage: TypeScriptLesson["stage"], title: string, start: number, seeds: Seed[]): TypeScriptVolume => ({ id: stage, title, lessons: seeds.map((seed, index) => make(stage, start + index, seed)) });
export const typescriptCourse: TypeScriptVolume[] = [volume("junior", "Том I · Junior: базовые типы", 1, junior), volume("middle", "Том II · Middle: формы данных", 7, middle), volume("senior", "Том III · Senior: безопасные модели", 13, senior), volume("applied", "Том IV · Проекты и практика", 19, applied)];
