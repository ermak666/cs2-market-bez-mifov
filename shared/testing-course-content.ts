import type { CourseData } from "./course-types";

type Stage = "junior" | "middle" | "senior" | "applied";
type Seed = { title: string; analogy: string; code: string; focus: string };

const seeds: Record<Stage, Seed[]> = {
  junior: [
    { title: "Зачем нужны тесты", analogy: "Тест — маленький робот-проверяющий: он повторяет важный шаг и не устаёт.", code: "def add(a, b): return a + b\nassert add(2, 3) == 5", focus: "Тест сравнивает фактический результат с ожидаемым." },
    { title: "Первый assert", analogy: "assert — вопрос робота: «это точно так?»", code: "assert 2 + 2 == 4", focus: "Если условие неверно, тест честно сообщает о проблеме." },
    { title: "Имя теста", analogy: "Имя теста — подпись на коробке: сразу видно, что внутри проверяют.", code: "def test_add_returns_sum():\n    assert add(2, 3) == 5", focus: "Хорошее имя описывает поведение, а не внутреннюю загадку." },
    { title: "Arrange, Act, Assert", analogy: "AAA — три полочки: подготовить, сделать, проверить.", code: "# Arrange\nvalue = 2\n# Act\nresult = double(value)\n# Assert\nassert result == 4", focus: "Три шага делают тест коротким и читаемым." },
    { title: "Падение теста", analogy: "Падение теста — лампочка на панели: это подсказка, где посмотреть, а не повод паниковать.", code: "assert format_name('лена') == 'Лена'", focus: "Сначала читайте ожидаемое и полученное значение." },
    { title: "Граница", analogy: "Граница — край тропинки: там чаще всего проверяют ноль, пустоту и крайнее значение.", code: "assert is_adult(18) is True\nassert is_adult(17) is False", focus: "Пограничные значения ловят важные ошибки правил." },
  ],
  middle: [
    { title: "pytest и запуск", analogy: "pytest — диспетчер маленьких роботов: он находит тесты и запускает их по правилам.", code: "pytest -q", focus: "pytest ищет функции с именем test_." },
    { title: "Фикстура", analogy: "Фикстура — подготовленный набор кубиков, который можно дать разным тестам.", code: "@pytest.fixture\ndef user():\n    return {'name': 'Лена'}", focus: "Фикстура уменьшает повторение подготовки." },
    { title: "Параметризация", analogy: "Параметризация — один робот с несколькими карточками примеров.", code: "@pytest.mark.parametrize('a,b,total', [(2,3,5), (0,0,0)])", focus: "Одинаковое правило проверяют несколькими входами без копирования теста." },
    { title: "Jest: test и expect", analogy: "В Jest test описывает обещание, а expect сравнивает его с результатом.", code: "test('adds numbers', () => { expect(add(2, 3)).toBe(5); });", focus: "toBe проверяет простое точное значение." },
    { title: "Jest-матчеры", analogy: "Matcher — линейка робота: выбираем подходящую линейку для числа, текста или объекта.", code: "expect(user).toEqual({ name: 'Лена' });", focus: "toEqual сравнивает структуру данных." },
    { title: "Описание сценария", analogy: "Сценарий — короткая сказка «дано → когда → тогда».", code: "it('shows error when title is empty', () => { expect(validate('')).toBe('Введите название'); });", focus: "Тест должен объяснять поведение человеку." },
  ],
  senior: [
    { title: "Mock и изоляция", analogy: "Mock — бумажный помощник: он заменяет настоящую внешнюю службу в учебном опыте.", code: "const send = vi.fn();\nsend('hello');\nexpect(send).toHaveBeenCalledWith('hello');", focus: "Mock проверяет договор с зависимостью без настоящей сети." },
    { title: "Не мокать всё", analogy: "Не нужно заменять игрушечными копиями каждую деталь: проверяйте главное правило простым способом.", code: "assert calculate_total([2, 3]) == 5", focus: "Сначала выбирают простой тест реальной логики." },
    { title: "Тест API-ответа", analogy: "Тест API стучится в учебную дверь и смотрит на статус и карточку-ответ.", code: "response = client.get('/books')\nassert response.status_code == 200", focus: "Проверяйте статус и нужные поля, не секреты." },
    { title: "Ошибочный сценарий", analogy: "Хороший робот проверяет не только ровную дорожку, но и табличку «не найдено».", code: "assert response.status_code == 404", focus: "Ошибка тоже часть ожидаемого поведения." },
    { title: "Покрытие", analogy: "Покрытие — карта, где робот уже прошёл, но не оценка качества сама по себе.", code: "coverage run -m pytest\ncoverage report", focus: "Высокий процент не заменяет смысловые сценарии." },
    { title: "Чистый тест", analogy: "Чистый тест убирает за собой кубики и не мешает следующему роботу.", code: "# каждый тест создаёт свои данные", focus: "Тесты не должны зависеть от порядка запуска." },
  ],
  applied: [
    { title: "Карта тест-пирамиды", analogy: "Пирамида — много маленьких быстрых проверок внизу и немного больших сверху.", code: "unit → integration → end-to-end", focus: "Начинайте с простых unit-тестов важной логики." },
    { title: "Тест калькулятора", analogy: "Калькулятор — маленький проект, где тесты защищают каждое простое правило.", code: "expect(divide(6, 2)).toBe(3)", focus: "Добавьте случай деления на ноль." },
    { title: "Тест формы", analogy: "Форма — бланк: тест проверяет, что пустое обязательное поле не проходит незаметно.", code: "expect(validateTitle('')).toBe('Введите название')", focus: "Проверяйте вход, ошибку и исправленный ввод." },
    { title: "Тест API-каталога", analogy: "Каталог — полка книг: тест проверяет список, одну книгу и несуществующий номер.", code: "assert client.get('/books/999').status_code == 404", focus: "Используйте изолированные учебные данные." },
    { title: "CI-проверка", analogy: "CI — ночной сторож: при каждом изменении он повторяет выбранные проверки.", code: "steps: checkout → install → test → lint", focus: "CI не хранит секреты в открытом тексте." },
    { title: "Итог и README", analogy: "README — инструкция для следующего человека: что проверяется и как это запустить.", code: "цель → команды → тесты → ограничения", focus: "Добавьте только безопасные учебные примеры." },
  ],
};

const titles: Record<Stage, string> = { junior: "Том I · Junior: assert и сценарии", middle: "Том II · Middle: pytest и Jest", senior: "Том III · Senior: mock, API и качество", applied: "Том IV · Проекты и CI" };

function body(seed: Seed) {
  return `Цель. Понять тему «${seed.title}».\n\nАналогия. ${seed.analogy}\n\n### Пример\n\n\`\`\`python\n${seed.code}\n\`\`\`\n\n### Разбор\n\n${seed.focus}\n\n### Практика\n\n#### Задача 1\nОбъясните, что обещает этот тест.\n\nПодсказка. Найдите ожидаемый результат.\n\nРазбор решения. ${seed.focus}\n\n#### Задача 2\nИзмените одно безопасное учебное значение и сохраните смысл проверки.\n\nПодсказка. Меняйте только один вход или ожидаемый ответ.\n\nРазбор решения. ${seed.analogy}\n\n#### Задача 3\nНазовите граничный или ошибочный сценарий для этого правила.\n\nПодсказка. Подумайте о пустом, нуле или несуществующем значении.\n\nРазбор решения. Тест проверяет не только счастливый путь, но и важные ограничения.`;
}

export const testingCourseContent: CourseData = {
  volumes: (Object.keys(seeds) as Stage[]).map((stage, stageIndex) => ({ id: stage, title: titles[stage], lessons: seeds[stage].map((seed, index) => ({ id: `testing-${stage}-${stageIndex * 6 + index + 1}`, number: stageIndex * 6 + index + 1, title: seed.title, goal: `Понять тему «${seed.title}».`, analogy: seed.analogy, code: seed.code, body: body(seed) })) })),
};
