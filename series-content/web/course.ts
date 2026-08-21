export type WebLesson = { id: string; number: number; stage: "junior" | "middle" | "senior" | "applied"; title: string; goal: string; analogy: string; code: string; explanation: string; tasks: { title: string; prompt: string; hint: string; solution: string }[] };
export type WebVolume = { id: WebLesson["stage"]; title: string; lessons: WebLesson[] };
type Seed = Omit<WebLesson, "id" | "number" | "stage" | "tasks">;
const make = (stage: WebLesson["stage"], number: number, seed: Seed): WebLesson => ({ ...seed, id: `web-${stage}-${number}`, number, stage, tasks: [
  { title: "Задача 1. Собери пример", prompt: `Повтори фрагмент: ${seed.title}.`, hint: "Сначала назови, что создаёт HTML, затем добавь CSS только для внешнего вида.", solution: seed.code },
  { title: "Задача 2. Объясни", prompt: `Объясни, что делает этот фрагмент: ${seed.code}`, hint: "Скажи, какой элемент появится и какое правило его меняет.", solution: seed.explanation },
  { title: "Задача 3. Проверь", prompt: `Назови безопасный порядок работы с темой «${seed.title}».`, hint: "Сначала простая разметка, затем маленькое правило CSS, потом проверка на узком экране.", solution: `Порядок: HTML-структура → CSS-правило → учебный предпросмотр → проверка читаемости.` },
] });
const junior: Seed[] = [
  { title: "HTML — скелет страницы", goal: "Понять роль HTML.", analogy: "HTML — каркас дома: он говорит, где заголовок, текст и кнопка.", code: "<h1>Моя страница</h1>", explanation: "h1 создаёт главный заголовок страницы." },
  { title: "Абзацы и смысл", goal: "Добавлять читаемый текст.", analogy: "p — отдельная мысль в тетради.", code: "<p>Я учусь создавать сайты.</p>", explanation: "Тег p создаёт абзац текста." },
  { title: "Ссылки", goal: "Связывать страницы.", analogy: "Ссылка — дверь к другой комнате сайта.", code: "<a href=\"/about\">О проекте</a>", explanation: "a создаёт ссылку, а href задаёт адрес." },
  { title: "Изображения и описание", goal: "Добавлять картинку с альтернативным текстом.", analogy: "alt — подпись к рисунку для того, кто его не видит.", code: "<img src=\"cat.png\" alt=\"Рыжий кот\" />", explanation: "alt помогает доступности и показывает смысл изображения." },
  { title: "Списки", goal: "Группировать пункты.", analogy: "ul — список покупок, li — одна покупка.", code: "<ul><li>HTML</li><li>CSS</li></ul>", explanation: "ul хранит маркированный список, li — его пункт." },
  { title: "Первый CSS", goal: "Понять правило стиля.", analogy: "CSS — инструкция художнику, как раскрасить готовый каркас.", code: "h1 { color: teal; }", explanation: "Правило выбирает h1 и меняет цвет текста." },
];
const middle: Seed[] = [
  { title: "Классы", goal: "Повторно использовать стиль.", analogy: "class — наклейка, по которой одинаковые предметы получают общий стиль.", code: "<p class=\"note\">Важно</p>\n.note { color: #5de2d2; }", explanation: "Класс связывает элемент с CSS-правилом через точку." },
  { title: "Box model", goal: "Отличать содержимое, отступы и рамку.", analogy: "Коробка имеет вещь внутри, мягкую упаковку и границу.", code: ".card { padding: 16px; border: 1px solid #5de2d2; }", explanation: "padding даёт внутренний воздух, border рисует границу." },
  { title: "Flexbox", goal: "Выстраивать элементы в ряд.", analogy: "Flexbox — полка, которая аккуратно раскладывает карточки.", code: ".row { display: flex; gap: 12px; }", explanation: "display:flex создаёт гибкий контейнер, gap добавляет расстояние." },
  { title: "Выравнивание", goal: "Распределять элементы.", analogy: "justify-content решает, где на полке будут стоять коробки.", code: ".row { display: flex; justify-content: space-between; }", explanation: "space-between раздвигает крайние элементы к краям." },
  { title: "Grid", goal: "Создавать сетку карточек.", analogy: "Grid — лист в клетку для ровной раскладки блоков.", code: ".grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }", explanation: "Сетка создаёт две равные колонки с расстоянием." },
  { title: "Селекторы", goal: "Точно выбирать элементы.", analogy: "Селектор — адрес на конверте для правила CSS.", code: ".card h2 { margin: 0; }", explanation: "Правило действует только на h2 внутри .card." },
];
const senior: Seed[] = [
  { title: "Адаптивность", goal: "Делать страницу удобной на телефоне.", analogy: "Media query — правило для маленькой комнаты: мебель переставляется, чтобы всем хватило места.", code: "@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }", explanation: "На узком экране сетка превращается в одну колонку." },
  { title: "Доступная кнопка", goal: "Создавать понятные действия.", analogy: "Кнопка должна быть как большая подписанная ручка двери.", code: "<button type=\"button\">Сохранить</button>", explanation: "button сообщает браузеру и экранному диктору, что это действие." },
  { title: "Фокус клавиатуры", goal: "Не прятать активный элемент.", analogy: "Focus — свет фонарика, который показывает, где сейчас находится пользователь.", code: "button:focus-visible { outline: 3px solid #ff9ccb; }", explanation: "Видимый outline помогает управлять страницей без мыши." },
  { title: "CSS-переменные", goal: "Хранить цвета в одном месте.", analogy: "Переменная — баночка с краской: меняешь её один раз, и цвет обновляется везде.", code: ":root { --accent: #5de2d2; }\n.button { color: var(--accent); }", explanation: "var использует значение переменной --accent." },
  { title: "Состояния", goal: "Давать кнопке понятную обратную связь.", analogy: "Hover и focus — маленький кивок страницы: «я заметила твой выбор».", code: ".button:hover { opacity: .85; }", explanation: "hover меняет вид элемента, когда над ним указатель." },
  { title: "Производительность", goal: "Не перегружать первый экран.", analogy: "Не тащи все игрушки в маленький рюкзак: возьми нужное сейчас.", code: "<img src=\"hero.webp\" alt=\"Учебный проект\" loading=\"lazy\" />", explanation: "loading=lazy откладывает загрузку изображения, пока оно не понадобится." },
];
const applied: Seed[] = [
  { title: "Структура лендинга", goal: "Спланировать разделы страницы.", analogy: "Лендинг — экскурсия: сначала встреча, затем польза, потом действие.", code: "<main><section><h1>Курс</h1></section><section><h2>Темы</h2></section></main>", explanation: "main хранит основное содержание, section разделяет смысловые блоки." },
  { title: "Карточка проекта", goal: "Собрать повторно используемый блок.", analogy: "Карточка — визитка проекта: название, короткое описание и действие.", code: "<article class=\"card\"><h2>Проект</h2><p>Описание</p></article>", explanation: "article подходит для самостоятельного смыслового блока." },
  { title: "Тёмная палитра", goal: "Соблюдать контраст.", analogy: "На тёмной доске мел должен быть светлым, иначе текст потеряется.", code: "body { background: #10131d; color: #f7f9ff; }", explanation: "Светлый текст на тёмном фоне делает чтение понятнее." },
  { title: "Форма", goal: "Делать поля понятными.", analogy: "label — подпись на ящике: без неё непонятно, что положить внутрь.", code: "<label for=\"email\">Email</label><input id=\"email\" type=\"email\" />", explanation: "label связывается с input через for и id." },
  { title: "Портфолио", goal: "Оформить страницу проекта.", analogy: "Портфолио — витрина: несколько аккуратных работ говорят больше, чем много случайных.", code: "<a href=\"https://github.com/example\">Исходный код</a>", explanation: "Ссылка на исходный код помогает показать, как устроен проект." },
  { title: "Итоговый сайт", goal: "Собрать адаптивную страницу целиком.", analogy: "Это генеральная репетиция: каркас, оформление, проверка на телефоне и понятная инструкция.", code: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />", explanation: "Viewport помогает странице правильно подстроиться под ширину телефона." },
];
const volume = (stage: WebLesson["stage"], title: string, start: number, seeds: Seed[]): WebVolume => ({ id: stage, title, lessons: seeds.map((seed, i) => make(stage, start + i, seed)) });
export const webCourse: WebVolume[] = [volume("junior", "Том I · Junior: страница и стиль", 1, junior), volume("middle", "Том II · Middle: раскладка", 7, middle), volume("senior", "Том III · Senior: адаптивность", 13, senior), volume("applied", "Том IV · Проекты и практика", 19, applied)];
