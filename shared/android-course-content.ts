import type { CourseData } from "./course-types";
type Stage = "junior" | "middle" | "senior" | "applied";
type Seed = { title: string; analogy: string; code: string; focus: string };
const seeds: Record<Stage, Seed[]> = {
  junior: [
    { title: "Как устроен Android-проект", analogy: "Проект — маленький город: папки хранят планы комнат, правила и материалы.", code: "app/\n  ui/\n  data/", focus: "Держите экран, данные и навигацию в понятных местах." },
    { title: "Composable", analogy: "Composable — предмет в комнате экрана, который можно собрать из других предметов.", code: "@Composable\nfun Greeting() { Text(\"Привет\") }", focus: "Composable описывает интерфейс как функцию без ручного поиска view." },
    { title: "Text и Button", analogy: "Text — надпись на карточке, Button — понятная кнопка действия.", code: "Button(onClick = {}) { Text(\"Готово\") }", focus: "У каждой кнопки должно быть одно ясное действие и понятная подпись." },
    { title: "Modifier", analogy: "Modifier — набор наклеек: размер, отступ и поведение предмета на экране.", code: "Modifier.padding(16.dp)", focus: "Собирайте Modifier последовательно, не смешивая важные решения в одном длинном месте." },
    { title: "Column и Row", analogy: "Column ставит предметы столбиком, Row — в один ряд.", code: "Column { Text(\"A\"); Text(\"B\") }", focus: "Сначала выберите простую структуру, затем добавляйте отступы." },
    { title: "Material 3", analogy: "Material 3 — набор аккуратных строительных кубиков для понятного интерфейса.", code: "MaterialTheme { Text(\"Тема\") }", focus: "Используйте тему и семантику вместо случайных цветов и размеров." },
  ],
  middle: [
    { title: "Состояние", analogy: "Состояние — карточка, где лежит то, что экран показывает прямо сейчас.", code: "var count by remember { mutableIntStateOf(0) }", focus: "Экран меняется от состояния, а не вручную по кусочкам." },
    { title: "Поднятие состояния", analogy: "Важная карточка состояния лежит у взрослого помощника, а не в каждой маленькой игрушке.", code: "fun Counter(count: Int, onAdd: () -> Unit)", focus: "Передавайте данные вниз, а события поднимайте вверх." },
    { title: "Список", analogy: "LazyColumn — лента карточек, которая готовит только видимые предметы.", code: "LazyColumn { items(books) { Text(it.title) } }", focus: "Для длинных списков выбирайте LazyColumn и стабильные ключи." },
    { title: "Форма", analogy: "Форма — маленький бланк: поле показывает текст, событие сообщает о смене.", code: "TextField(value = query, onValueChange = onQuery)", focus: "Храните текст поля в одном понятном состоянии." },
    { title: "ViewModel", analogy: "ViewModel — спокойный помощник, который бережёт данные, пока экран поворачивается или пересобирается.", code: "class BooksViewModel : ViewModel()", focus: "ViewModel хранит состояние экрана и не держит ссылку на Activity." },
    { title: "UI state", analogy: "UI state — табличка: загрузка, данные, пусто или ошибка.", code: "sealed interface BooksUiState", focus: "Явные состояния помогают экрану честно объяснять, что происходит." },
  ],
  senior: [
    { title: "Навигация", analogy: "Навигация — таблички между комнатами приложения.", code: "navController.navigate(\"details/42\")", focus: "Передавайте только нужный идентификатор, а данные получайте из безопасного источника." },
    { title: "Аргументы маршрута", analogy: "Аргумент маршрута — номер карточки, который помогает найти нужную комнату.", code: "composable(\"details/{bookId}\")", focus: "Проверяйте аргументы и предусмотрите отсутствующее значение." },
    { title: "Побочные эффекты", analogy: "Effect — редкое письмо наружу, а не обычная часть рисунка экрана.", code: "LaunchedEffect(bookId) { }", focus: "Используйте effect для контролируемых реакций на изменение ключа." },
    { title: "Coroutine", analogy: "Coroutine — помощник, который ждёт рядом и не замораживает экран.", code: "viewModelScope.launch { loadBooks() }", focus: "Асинхронная работа живёт в ViewModel и сообщает результат через состояние." },
    { title: "Разрешения", analogy: "Разрешение — вежливая просьба открыть дверь только когда это действительно нужно.", code: "rememberPermissionState(permission)", focus: "Запрашивайте минимум разрешений, объясняйте причину и имейте вариант без них." },
    { title: "Доступность", analogy: "Доступность — сделать таблички, кнопки и дорожки понятными для каждого гостя.", code: "Modifier.semantics { contentDescription = \"Поиск\" }", focus: "Проверяйте подписи, контраст и достаточную область нажатия." },
  ],
  applied: [
    { title: "Проект: каталог книг", analogy: "Каталог — ряд карточек с названием и автором.", code: "data class Book(val id: String, val title: String)", focus: "Начните с простой модели и списка демонстрационных данных." },
    { title: "Проект: поиск", analogy: "Поиск — лупа, которая оставляет карточки с подходящим названием.", code: "books.filter { it.title.contains(query, true) }", focus: "Покажите спокойное состояние пустого результата." },
    { title: "Проект: детали", analogy: "Экран деталей — отдельная комната для одной выбранной карточки.", code: "composable(\"details/{bookId}\")", focus: "Передавайте идентификатор, а не большой объект или секретные данные." },
    { title: "Проект: ViewModel", analogy: "ViewModel держит карточку состояния экрана, пока пользователь ходит по комнатам.", code: "val uiState: StateFlow<BooksUiState>", focus: "Экран наблюдает за состоянием и не меняет его напрямую." },
    { title: "Проект: ошибка", analogy: "Ошибка — доброжелательная табличка с безопасным следующим шагом.", code: "BooksUiState.Error(\"Попробуйте ещё раз\")", focus: "Не показывайте токены, трассы или внутренние детали пользователю." },
    { title: "Проект: README", analogy: "README — карта города: экраны, состояние, запуск и ограничения.", code: "цель → экраны → state → проверка", focus: "Опишите архитектуру простыми словами и добавьте проверяемые шаги." },
  ],
};
const titles: Record<Stage, string> = { junior: "Том I · Junior: интерфейс Compose", middle: "Том II · Middle: состояние и ViewModel", senior: "Том III · Senior: навигация и качество", applied: "Том IV · Проекты и практика" };
const body = (seed: Seed) => `Цель. Понять тему «${seed.title}».\n\nАналогия. ${seed.analogy}\n\n### Пример\n\n\`\`\`kotlin\n${seed.code}\n\`\`\`\n\n### Разбор\n\n${seed.focus}\n\n### Практика\n\n#### Задача 1\nОбъясните этот Android-фрагмент своими словами.\n\nПодсказка. Найдите экран, состояние, событие или навигацию.\n\nРазбор решения. ${seed.focus}\n\n#### Задача 2\nНазовите безопасный граничный случай.\n\nПодсказка. Подумайте о пустом списке, ошибке, отсутствии разрешения или повороте экрана.\n\nРазбор решения. ${seed.analogy}\n\n#### Задача 3\nНапишите короткий похожий пример.\n\nПодсказка. Дайте действию ясную подпись и храните важные данные в состоянии.\n\nРазбор решения. Android-экран легче поддерживать, когда состояние и события описаны явно.`;
export const androidCourseContent: CourseData = { volumes: (Object.keys(seeds) as Stage[]).map((stage, stageIndex) => ({ id: stage, title: titles[stage], lessons: seeds[stage].map((seed, index) => ({ id: `android-${stage}-${stageIndex * 6 + index + 1}`, number: stageIndex * 6 + index + 1, title: seed.title, goal: `Понять тему «${seed.title}».`, analogy: seed.analogy, code: seed.code, body: body(seed) })) })) };
