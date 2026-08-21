import type { CourseData } from "./course-types";

type Stage = "junior" | "middle" | "senior" | "applied";

type LessonSeed = {
  title: string;
  goal: string;
  analogy: string;
  code: string;
  points: string[];
};

const seeds: Record<Stage, LessonSeed[]> = {
  junior: [
    { title: "Angular и первый компонент", goal: "Понять, из каких маленьких частей собирается Angular-приложение.", analogy: "Компонент — это одна комната в доме приложения. У комнаты есть имя, вид и свои маленькие правила.", code: "@Component({ selector: 'app-hello', template: '<h1>Привет!</h1>' })\nexport class HelloComponent {}", points: ["Компонент — класс с декоратором @Component.", "selector — имя, которым компонент зовут в шаблоне.", "template — то, что увидит человек."] },
    { title: "Шаблон и интерполяция", goal: "Показать значение класса на экране.", analogy: "Шаблон — табличка на двери комнаты. {{ name }} — окошко, в которое подставляется имя.", code: "@Component({ template: '<p>Привет, {{ name }}!</p>' })\nexport class HelloComponent { name = 'Маша'; }", points: ["{{ }} показывает значение из класса.", "Свойство name хранит обычную строку.", "Не нужно собирать HTML вручную."] },
    { title: "Привязка свойств", goal: "Передать значение в свойство HTML-элемента.", analogy: "[disabled] — это выключатель: если условие true, кнопка отдыхает и не нажимается.", code: "@Component({ template: '<button [disabled]=\"isBusy\">Сохранить</button>' })\nexport class SaveComponent { isBusy = false; }", points: ["Квадратные скобки связывают свойство элемента с кодом.", "Значение справа читается из класса.", "Так интерфейс не расходится с данными."] },
    { title: "События и счётчик", goal: "Реагировать на нажатие кнопки.", analogy: "(click) — это звонок в дверь. Метод countUp открывает дверь и меняет число.", code: "@Component({ template: '<button (click)=\"countUp()\">+1</button><p>{{ count }}</p>' })\nexport class CounterComponent { count = 0; countUp() { this.count += 1; } }", points: ["Круглые скобки слушают событие.", "Метод вызывается после нажатия.", "Интерполяция покажет обновлённое число."] },
    { title: "Условия с @if", goal: "Показывать кусочек интерфейса только когда он нужен.", analogy: "@if — как шторка: она открывается только при нужном условии.", code: "@Component({ template: '@if (isLoggedIn) { <p>Вы внутри!</p> }' })\nexport class ProfileComponent { isLoggedIn = true; }", points: ["@if читает логическое значение.", "Внутри фигурных скобок находится видимый блок.", "Условие делает экран спокойнее и понятнее."] },
    { title: "Списки с @for", goal: "Аккуратно показать несколько одинаковых элементов.", analogy: "@for — помощник, который раскладывает каждый предмет из коробки по отдельной полочке.", code: "@Component({ template: '@for (task of tasks; track task) { <p>{{ task }}</p> }' })\nexport class TasksComponent { tasks = ['Урок', 'Практика']; }", points: ["@for проходит по массиву.", "task — один элемент списка.", "track помогает Angular узнавать элементы."] },
  ],
  middle: [
    { title: "Входные данные @Input", goal: "Передать данные от родителя к ребёнку-компоненту.", analogy: "@Input — кармашек на двери детской комнаты: родитель кладёт туда нужную вещь.", code: "@Component({ selector: 'app-card', template: '<p>{{ title }}</p>' })\nexport class CardComponent { title = input.required<string>(); }", points: ["input.required сообщает, что значение обязательно.", "Дочерний компонент получает данные, но не угадывает их.", "Компоненты остаются маленькими и переиспользуемыми."] },
    { title: "События ребёнка", goal: "Сообщить родительскому компоненту о действии.", analogy: "output — это маленький колокольчик: ребёнок звенит, а родитель решает, что делать.", code: "@Component({ template: '<button (click)=\"done.emit()\">Готово</button>' })\nexport class TaskComponent { done = output<void>(); }", points: ["output создаёт событие компонента.", "emit отправляет короткое сообщение.", "Родитель не обязан лезть внутрь ребёнка."] },
    { title: "Сервисы и зависимости", goal: "Вынести общее правило из компонента в сервис.", analogy: "Сервис — помощник в коридоре дома: к нему могут обратиться разные комнаты.", code: "@Injectable({ providedIn: 'root' })\nexport class GreetingService { make(name: string) { return `Привет, ${name}`; } }", points: ["@Injectable отмечает сервис.", "providedIn: root делает один общий сервис.", "Компоненту не нужно хранить всё самому."] },
    { title: "Внедрение через inject", goal: "Получить сервис в компоненте.", analogy: "inject — как попросить помощника принести нужный инструмент, а не мастерить его заново.", code: "export class HomeComponent {\n  private greeting = inject(GreetingService);\n  message = this.greeting.make('Лена');\n}", points: ["inject получает готовую зависимость.", "Сервис можно менять и тестировать отдельно.", "Компонент остаётся про экран, а сервис — про правило."] },
    { title: "Наблюдаемые потоки RxJS", goal: "Понять Observable как данные, которые могут прийти позже.", analogy: "Observable — это почтовая труба: письмо может появиться позже, но труба уже готова.", code: "const name$ = of('Аня');\nname$.subscribe(name => console.log(name));", points: ["Символ $ напоминает: это поток.", "of создаёт маленький учебный поток.", "subscribe получает пришедшее значение."] },
    { title: "Маршрутизация", goal: "Переходить между экранами по понятным адресам.", analogy: "Маршруты — таблички в доме: /lessons ведёт к урокам, /progress — к прогрессу.", code: "export const routes: Routes = [\n  { path: 'lessons', component: LessonsComponent },\n  { path: '', redirectTo: 'lessons', pathMatch: 'full' },\n];", points: ["path — часть адреса.", "component — экран для этого адреса.", "redirectTo задаёт стартовый путь."] },
  ],
  senior: [
    { title: "Реактивное состояние signals", goal: "Хранить небольшое состояние, которое само обновляет экран.", analogy: "signal — магнитная доска: меняешь записку, и все смотрящие сразу видят новое.", code: "export class CounterComponent {\n  count = signal(0);\n  countUp() { this.count.update(value => value + 1); }\n}", points: ["signal хранит реактивное значение.", "update меняет значение по безопасному правилу.", "В шаблоне signal читают как count()."] },
    { title: "Вычисляемые значения computed", goal: "Получать новое значение из существующих без копирования данных.", analogy: "computed — калькулятор на столе: он сам пересчитывает ответ, когда меняются числа.", code: "export class CartComponent {\n  price = signal(100);\n  count = signal(2);\n  total = computed(() => this.price() * this.count());\n}", points: ["computed не хранит лишнюю копию результата.", "Он зависит от сигналов внутри.", "Так меньше шансов забыть пересчитать итог."] },
    { title: "Производительность OnPush", goal: "Проверять интерфейс бережнее.", analogy: "OnPush — внимательный охранник: он осматривает комнату, когда туда действительно принесли что-то новое.", code: "@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: '<p>{{ title }}</p>'\n})\nexport class CardComponent { title = input(''); }", points: ["OnPush уменьшает лишние проверки.", "Нужно передавать новые значения честно.", "Signals хорошо сочетаются с таким подходом."] },
    { title: "Реактивные формы", goal: "Проверять данные формы понятными правилами.", analogy: "Форма — бланк, а validators — добрые подсказки у полей: что нужно заполнить.", code: "profile = new FormGroup({\n  name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),\n});", points: ["FormControl хранит одно поле.", "Validators.required отмечает обязательное значение.", "Форма даёт состояние valid и errors."] },
    { title: "Тест компонента", goal: "Проверить важное правило без ручного нажатия каждый раз.", analogy: "Тест — маленький робот-проверяющий: он повторяет один и тот же шаг и не устаёт.", code: "it('увеличивает счётчик', () => {\n  const component = fixture.componentInstance;\n  component.countUp();\n  expect(component.count()).toBe(1);\n});", points: ["Тест описывает ожидаемое поведение.", "expect сравнивает реальность с ожиданием.", "Короткие тесты легче чинить."] },
    { title: "NgRx: общее состояние", goal: "Понять, когда данные нужны многим экранам.", analogy: "NgRx store — школьная доска объявлений: многие классы могут прочитать важную запись в одном месте.", code: "export const tasksFeature = createFeature({\n  name: 'tasks',\n  reducer: createReducer(initialState),\n});", points: ["NgRx нужен не для каждого маленького поля.", "Feature собирает часть общего состояния.", "Сначала выбирают простое локальное состояние, затем усложняют при необходимости."] },
  ],
  applied: [
    { title: "Карта приложения задач", goal: "Спланировать маленькое приложение до написания кода.", analogy: "Карта проекта — как план домика из кубиков: сначала видно, какие комнаты и двери нужны.", code: "type Task = { id: number; title: string; done: boolean };\nconst screens = ['Список', 'Новая задача', 'Прогресс'];", points: ["Сначала называют данные.", "Затем выбирают маленькие экраны.", "План снижает путаницу в середине проекта."] },
    { title: "Компонент карточки задачи", goal: "Сделать переиспользуемый элемент списка.", analogy: "Карточка — одна аккуратная наклейка на коробке задачи: её можно приклеить много раз.", code: "@Component({ selector: 'app-task-card', template: '<button (click)=\"toggle.emit()\">{{ task().title }}</button>' })\nexport class TaskCardComponent { task = input.required<Task>(); toggle = output<void>(); }", points: ["Компонент получает одну задачу.", "Он сообщает о нажатии через output.", "Список не дублирует одинаковую разметку."] },
    { title: "Сервис хранилища задач", goal: "Собрать правила работы с задачами в одном месте.", analogy: "Сервис — кладовщик: он знает, где лежат карточки и как их добавить или отметить.", code: "@Injectable({ providedIn: 'root' })\nexport class TasksService {\n  tasks = signal<Task[]>([]);\n  add(title: string) { this.tasks.update(items => [...items, { id: Date.now(), title, done: false }]); }\n}", points: ["Сервис хранит правила работы со списком.", "update создаёт новый массив, а не портит старый.", "Компоненты только показывают и вызывают действия."] },
    { title: "Фильтр и поиск", goal: "Показать только нужные задачи.", analogy: "Фильтр — сито: оно оставляет на столе только задачи с нужным признаком.", code: "visible = computed(() => this.tasks().filter(task => !this.onlyOpen() || !task.done));", points: ["computed выводит список из исходных данных.", "Фильтр не уничтожает все задачи.", "Условие можно объяснить простыми словами до кода."] },
    { title: "Доступность и состояния", goal: "Сделать экран понятным не только глазам.", analogy: "Доступность — добрые подписи на каждой двери, чтобы путь мог найти каждый человек.", code: "<button [attr.aria-label]=\"'Отметить: ' + task().title\" (click)=\"toggle.emit()\">Готово</button>", points: ["aria-label объясняет кнопку экранному диктору.", "У кнопки должен быть понятный текст или подпись.", "Состояние загрузки и ошибки показывают честно."] },
    { title: "Итоговый проект и проверка", goal: "Соединить компоненты, сервисы, маршруты и тесты в один маленький продукт.", analogy: "Итоговый проект — собранный домик: каждая комната работает отдельно, а двери соединяют его в целое.", code: "const checklist = ['Компоненты маленькие', 'Сервис проверен', 'Маршруты понятны', 'Есть тест важного правила'];", points: ["Проверьте один главный путь пользователя.", "Уберите лишнее до добавления нового.", "Тестируйте правило, которое может сломать обучение."] },
  ],
};

const stageTitles: Record<Stage, string> = {
  junior: "Том I · Junior: компоненты и шаблоны",
  middle: "Том II · Middle: сервисы, RxJS и маршруты",
  senior: "Том III · Senior: состояние, качество и производительность",
  applied: "Том IV · Проекты и практика",
};

function lessonBody(seed: LessonSeed) {
  const points = seed.points.map((point) => `- ${point}`).join("\n");
  return `Цель. ${seed.goal}\n\nАналогия. ${seed.analogy}\n\n### Пример\n\n\`\`\`ts\n${seed.code}\n\`\`\`\n\n### Разбор\n\n${points}\n\n### Практика\n\n#### Задача 1\nОбъясните простыми словами, какую работу делает этот фрагмент.\n\nПодсказка. Представьте, что код — это комнатка в домике приложения.\n\nРазбор решения. ${seed.analogy}\n\n#### Задача 2\nИзмените одно имя или значение так, чтобы пример оставался понятным.\n\nПодсказка. Меняйте только одну маленькую часть за раз.\n\nРазбор решения. ${seed.points[0]}\n\n#### Задача 3\nНазовите правило, которое поможет не запутаться в этом коде.\n\nПодсказка. Посмотрите, где лежат данные, а где описан вид экрана.\n\nРазбор решения. ${seed.points.slice(1).join(" ")}`;
}

export const angularCourseContent: CourseData = {
  volumes: (Object.keys(seeds) as Stage[]).map((stage, stageIndex) => ({
    id: stage,
    title: stageTitles[stage],
    lessons: seeds[stage].map((seed, index) => {
      const number = stageIndex * 6 + index + 1;
      return {
        id: `angular-${stage}-${number}`,
        number,
        title: seed.title,
        goal: seed.goal,
        analogy: seed.analogy,
        code: seed.code,
        body: lessonBody(seed),
      };
    }),
  })),
};
