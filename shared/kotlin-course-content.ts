import type { CourseData } from "./course-types";
type Stage = "junior" | "middle" | "senior" | "applied";
type Seed = { title: string; analogy: string; code: string; focus: string };
const seeds: Record<Stage, Seed[]> = {
  junior: [
    { title: "val и var", analogy: "val — коробка с наклейкой «не менять», var — коробка, которую можно заменить.", code: "val name = \"Лена\"", focus: "Начинайте с val; var используйте только когда значение действительно меняется." },
    { title: "Типы", analogy: "Тип — подпись на коробке: число, текст или правда/ложь.", code: "val age: Int = 18", focus: "Kotlin часто умеет угадать тип, но явная подпись помогает в сложных местах." },
    { title: "Строки", analogy: "Строка — бусинки текста, которые можно аккуратно соединять.", code: "val message = \"Привет, $name\"", focus: "Шаблон $name подставляет значение в строку." },
    { title: "Условие if", analogy: "if — дорожная развилка с понятным вопросом.", code: "if (age >= 18) println(\"Можно\")", focus: "Условие выбирает один из безопасных путей программы." },
    { title: "when", analogy: "when — шкафчик с несколькими подписанными ящиками.", code: "when (day) { 1 -> \"Пн\" else -> \"Другой\" }", focus: "when удобно описывает несколько понятных вариантов." },
    { title: "Функция", analogy: "Функция — маленькая машинка: получает вход и возвращает результат.", code: "fun add(a: Int, b: Int) = a + b", focus: "Хорошая функция делает одну понятную работу." },
  ],
  middle: [
    { title: "Класс", analogy: "Класс — чертёж игрушки, по которому создают похожие экземпляры.", code: "class User(val name: String)", focus: "Класс объединяет данные и связанные с ними действия." },
    { title: "data class", analogy: "data class — карточка данных, которая сама умеет аккуратно сравниваться и печататься.", code: "data class Book(val title: String)", focus: "Используйте data class для простых моделей данных." },
    { title: "Списки", analogy: "List — полка с предметами в заданном порядке.", code: "val names = listOf(\"Лена\", \"Миша\")", focus: "listOf создаёт неизменяемый список; mutableListOf — изменяемый." },
    { title: "map и filter", analogy: "map меняет каждую карточку, filter оставляет нужные.", code: "names.filter { it.length > 3 }", focus: "Коллекции читаются легче, когда шаги маленькие и понятные." },
    { title: "Nullable", analogy: "Тип String? — коробка, которая иногда может оказаться пустой.", code: "val city: String? = null", focus: "Знак ? заставляет подумать о пустом значении заранее." },
    { title: "Безопасный вызов", analogy: "?. — мягкая страховка: если коробка пуста, не пытаемся взять содержимое.", code: "val length = city?.length", focus: "Безопасный вызов возвращает null вместо падения." },
  ],
  senior: [
    { title: "Elvis ?: ", analogy: "Elvis — запасная игрушка, если первой коробки нет.", code: "val label = city ?: \"Не указан\"", focus: "?: даёт понятное значение по умолчанию для null." },
    { title: "sealed class", analogy: "sealed class — закрытый набор карточек, все варианты которого известны заранее.", code: "sealed class State", focus: "Подходит для состояния загрузки, успеха и ошибки." },
    { title: "Extension", analogy: "Extension — новая наклейка с умением для уже знакомой игрушки.", code: "fun String.initial() = firstOrNull()", focus: "Расширение добавляет удобную функцию без изменения исходного класса." },
    { title: "Лямбда", analogy: "Лямбда — короткая инструкция, которую можно передать другой функции.", code: "val square = { n: Int -> n * n }", focus: "Лямбды удобны для коллекций и небольших обработчиков." },
    { title: "Coroutine", analogy: "Coroutine — помощник, который может ждать и не блокировать всю комнату.", code: "suspend fun loadTitle(): String", focus: "suspend отмечает функцию, которая может приостановиться." },
    { title: "Состояние ошибки", analogy: "Ошибка — отдельная карточка состояния, а не молчаливый провал.", code: "data class Error(val message: String)", focus: "Показывайте понятную безопасную ошибку без секретных деталей." },
  ],
  applied: [
    { title: "Проект: список книг", analogy: "Список книг — полка, где каждая карточка имеет название и автора.", code: "data class Book(val title: String, val author: String)", focus: "Начните с data class и простого списка." },
    { title: "Проект: фильтр", analogy: "Фильтр — сито, которое оставляет книги с подходящим названием.", code: "books.filter { it.title.contains(query, true) }", focus: "Проверяйте пустой запрос и отсутствие результатов." },
    { title: "Проект: состояние", analogy: "Экран умеет быть пустым, загружаться, показывать данные или ошибку.", code: "sealed class ScreenState", focus: "Явные состояния упрощают экран и тестирование." },
    { title: "Проект: coroutine", analogy: "Загрузка идёт рядом, не замораживая кнопку пользователя.", code: "suspend fun loadBooks()", focus: "Не делайте сеть в учебной песочнице; разбирайте только форму кода." },
    { title: "Проект: ошибка", analogy: "Сообщение об ошибке — табличка, которая объясняет следующий безопасный шаг.", code: "Error(\"Попробуйте ещё раз\")", focus: "Не показывайте пользователю токены, трассы и технические секреты." },
    { title: "Проект: README", analogy: "README — карта проекта: модели, состояние, запуск и ограничения.", code: "цель → модель → состояние → проверка", focus: "Опишите структуру и проверку без личных данных и ключей." },
  ],
};
const titles: Record<Stage, string> = { junior: "Том I · Junior: основы Kotlin", middle: "Том II · Middle: классы и null-safety", senior: "Том III · Senior: состояние и coroutines", applied: "Том IV · Проекты и практика" };
const body = (seed: Seed) => `Цель. Понять тему «${seed.title}».\n\nАналогия. ${seed.analogy}\n\n### Пример\n\n\`\`\`kotlin\n${seed.code}\n\`\`\`\n\n### Разбор\n\n${seed.focus}\n\n### Практика\n\n#### Задача 1\nОбъясните этот Kotlin-фрагмент своими словами.\n\nПодсказка. Найдите данные, действие или безопасную проверку.\n\nРазбор решения. ${seed.focus}\n\n#### Задача 2\nНазовите безопасный граничный случай.\n\nПодсказка. Подумайте о пустом тексте, null или пустом списке.\n\nРазбор решения. ${seed.analogy}\n\n#### Задача 3\nНапишите короткий похожий пример.\n\nПодсказка. Дайте понятное имя и сделайте один маленький шаг.\n\nРазбор решения. Kotlin-код легче читать, когда он небольшой и явно описывает состояние.`;
export const kotlinCourseContent: CourseData = { volumes: (Object.keys(seeds) as Stage[]).map((stage, stageIndex) => ({ id: stage, title: titles[stage], lessons: seeds[stage].map((seed, index) => ({ id: `kotlin-${stage}-${stageIndex * 6 + index + 1}`, number: stageIndex * 6 + index + 1, title: seed.title, goal: `Понять тему «${seed.title}».`, analogy: seed.analogy, code: seed.code, body: body(seed) })) })) };
