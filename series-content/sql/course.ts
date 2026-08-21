export type SqlLesson = {
  id: string;
  number: number;
  stage: "junior" | "middle" | "senior" | "applied";
  title: string;
  goal: string;
  analogy: string;
  query: string;
  explanation: string;
  tasks: { title: string; prompt: string; hint: string; solution: string }[];
};

export type SqlVolume = { id: SqlLesson["stage"]; title: string; lessons: SqlLesson[] };
type Seed = Omit<SqlLesson, "id" | "number" | "stage" | "tasks"> & { practice: string; hint: string };

const lesson = (stage: SqlLesson["stage"], number: number, seed: Seed): SqlLesson => ({
  id: `sql-${stage}-${number}`,
  number,
  stage,
  title: seed.title,
  goal: seed.goal,
  analogy: seed.analogy,
  query: seed.query,
  explanation: seed.explanation,
  tasks: [
    { title: "Задача 1. Напиши запрос", prompt: seed.practice, hint: seed.hint, solution: seed.query },
    { title: "Задача 2. Объясни своими словами", prompt: `Объясни, что вернёт или изменит этот запрос: ${seed.query}`, hint: "Скажи, из какой таблицы берутся данные, какие строки подходят и какие поля будут видны.", solution: seed.explanation },
    { title: "Задача 3. Проверь порядок", prompt: `Расставь понятный порядок работы с темой «${seed.title}».`, hint: "Сначала выбери цель и проверь запрос на маленьких учебных данных, потом читай результат.", solution: `Безопасный порядок: определить нужные данные → написать ${seed.query} → проверить результат на учебной таблице.` },
  ],
});

const junior: Seed[] = [
  { title: "Что такое SQL", goal: "Понять, зачем базе данных нужен язык запросов.", analogy: "SQL — это вежливая записка библиотекарю: ты говоришь, что найти, а не перебираешь все полки сам.", query: "SELECT * FROM students;", explanation: "SELECT просит показать данные, * означает все столбцы, а FROM указывает таблицу students.", practice: "Попроси показать все записи из таблицы students.", hint: "Начни с SELECT *, затем напиши FROM и имя таблицы." },
  { title: "Столбцы вместо всего", goal: "Выбирать только нужные данные.", analogy: "Если нужен только номер книги, не надо просить библиотекаря принести всю полку.", query: "SELECT name, city FROM students;", explanation: "Запрос показывает только столбцы name и city из таблицы students.", practice: "Выбери имя и город каждого ученика.", hint: "Перечисли нужные столбцы после SELECT через запятую." },
  { title: "WHERE: фильтр", goal: "Находить только подходящие строки.", analogy: "WHERE — сито: через него проходят только карточки с нужным признаком.", query: "SELECT name FROM students WHERE city = 'Казань';", explanation: "Запрос оставляет учеников из Казани и показывает их имена.", practice: "Найди имена учеников из Казани.", hint: "После WHERE напиши условие city = 'Казань'." },
  { title: "ORDER BY и LIMIT", goal: "Упорядочивать результат и брать небольшую часть.", analogy: "Сначала разложи карточки по росту, затем возьми первые три.", query: "SELECT name, score FROM students ORDER BY score DESC LIMIT 3;", explanation: "Результат сортируется по убыванию score; LIMIT оставляет только три первые строки.", practice: "Покажи трёх учеников с наибольшим score.", hint: "Используй ORDER BY score DESC и LIMIT 3." },
  { title: "INSERT: добавить строку", goal: "Добавлять данные в учебную таблицу.", analogy: "INSERT — это аккуратно заполнить новую карточку и поставить её на нужную полку.", query: "INSERT INTO students (name, city, score) VALUES ('Аня', 'Казань', 5);", explanation: "Запрос создаёт одну строку: значения идут в том же порядке, что и перечисленные столбцы.", practice: "Добавь учебную запись об Ане.", hint: "После имени таблицы перечисли столбцы, затем VALUES со значениями." },
  { title: "UPDATE и DELETE осторожно", goal: "Менять и удалять строки только с точным условием.", analogy: "Перед тем как стереть карточку, дважды проверь её номер — без WHERE можно затронуть всю полку.", query: "UPDATE students SET score = 5 WHERE name = 'Аня';", explanation: "UPDATE меняет score только у строк, подходящих под WHERE. Сначала полезно проверить их SELECT-запросом.", practice: "Измени score Ани на 5, не затрагивая остальных.", hint: "Обязательно добавь WHERE name = 'Аня'." },
];

const middle: Seed[] = [
  { title: "Типы данных и схема", goal: "Описывать, какие данные разрешены в столбцах.", analogy: "Схема — наклейки на ящиках: в одном хранят числа, в другом — подписи, чтобы всё не смешалось.", query: "CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT NOT NULL);", explanation: "Таблица courses получает числовой ключ id и обязательное текстовое название title.", practice: "Создай таблицу courses с id и обязательным title.", hint: "Используй INTEGER PRIMARY KEY и TEXT NOT NULL." },
  { title: "Первичный ключ", goal: "Понимать уникальный номер строки.", analogy: "Первичный ключ — номер карточки в библиотеке: двух одинаковых номеров быть не должно.", query: "SELECT id, title FROM courses;", explanation: "id помогает однозначно отличить одну строку courses от другой.", practice: "Выбери id и title всех курсов.", hint: "Перечисли оба столбца после SELECT." },
  { title: "Связи и внешний ключ", goal: "Связывать таблицы безопасно.", analogy: "Внешний ключ — стрелка с карточки занятия на карточку нужного курса.", query: "SELECT lessons.title, courses.title FROM lessons JOIN courses ON lessons.course_id = courses.id;", explanation: "JOIN соединяет lessons с courses там, где course_id совпадает с id курса.", practice: "Покажи название урока и его курса.", hint: "Свяжи lessons.course_id с courses.id." },
  { title: "COUNT и AVG", goal: "Считать строки и средние значения.", analogy: "Агрегатные функции — калькулятор библиотекаря: он считает карточки без ручного пересчёта.", query: "SELECT COUNT(*) AS total, AVG(score) AS average_score FROM students;", explanation: "COUNT считает строки, AVG считает среднее числовое значение score.", practice: "Посчитай число учеников и средний score.", hint: "Используй COUNT(*) и AVG(score)." },
  { title: "GROUP BY", goal: "Собирать данные в группы.", analogy: "GROUP BY раскладывает карточки по коробкам: сначала по городам, потом считает каждую коробку.", query: "SELECT city, COUNT(*) AS total FROM students GROUP BY city;", explanation: "Строки группируются по city, и для каждой группы считается количество учеников.", practice: "Посчитай учеников в каждом городе.", hint: "Выбери city, COUNT(*) и добавь GROUP BY city." },
  { title: "NULL и неизвестное", goal: "Не путать пустое значение с нулём или пустой строкой.", analogy: "NULL — это не пустая карточка, а карточка с пометкой «пока неизвестно».", query: "SELECT name FROM students WHERE city IS NULL;", explanation: "IS NULL ищет неизвестные значения. Сравнение city = NULL для этого не подходит.", practice: "Найди учеников, у которых не указан город.", hint: "Пиши IS NULL, а не = NULL." },
];

const senior: Seed[] = [
  { title: "Нормализация", goal: "Убирать дублирование и противоречия из схемы.", analogy: "Не записывай телефон школы на каждой карточке ученика: создай одну карточку школы и свяжи остальных с ней.", query: "SELECT students.name, schools.title FROM students JOIN schools ON students.school_id = schools.id;", explanation: "Связь отдельных таблиц уменьшает дублирование и помогает менять данные в одном месте.", practice: "Соедини учеников со школами по school_id.", hint: "JOIN использует равенство students.school_id и schools.id." },
  { title: "Индексы", goal: "Понимать, когда поиск в большой таблице можно ускорить.", analogy: "Индекс похож на алфавитный указатель в книге: он помогает быстрее найти нужную страницу.", query: "CREATE INDEX idx_students_city ON students(city);", explanation: "Индекс может ускорить частые поиски по city, но добавляет стоимость записи и место.", practice: "Создай индекс для частых поисков по городу.", hint: "Напиши CREATE INDEX, имя индекса, ON students(city)." },
  { title: "Транзакции", goal: "Группировать связанные изменения в единое целое.", analogy: "Транзакция — как перевод двух коробок сразу: если вторую перенести нельзя, первая тоже остаётся на месте.", query: "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;", explanation: "BEGIN начинает группу действий, COMMIT подтверждает её. При ошибке используют ROLLBACK.", practice: "Оформи учебный перевод между двумя счетами как транзакцию.", hint: "Начни BEGIN и заверши COMMIT; обе операции должны быть внутри." },
  { title: "Представления", goal: "Сохранять часто используемый запрос под понятным именем.", analogy: "VIEW — это сохранённая витрина: она показывает нужные карточки без копирования всей базы.", query: "CREATE VIEW top_students AS SELECT name, score FROM students WHERE score >= 4;", explanation: "Представление хранит определение запроса и помогает повторно использовать его как виртуальную таблицу.", practice: "Создай представление учеников со score не меньше 4.", hint: "Используй CREATE VIEW имя AS SELECT ... WHERE ..." },
  { title: "План запроса", goal: "Понимать, как база собирается искать данные.", analogy: "План — маршрут библиотекаря: по нему видно, идёт ли он к индексу или перебирает всю полку.", query: "EXPLAIN QUERY PLAN SELECT * FROM students WHERE city = 'Казань';", explanation: "EXPLAIN QUERY PLAN показывает стратегию запроса; его читают до оптимизации, а не угадывают.", practice: "Посмотри учебный план поиска учеников по городу.", hint: "Добавь EXPLAIN QUERY PLAN перед SELECT." },
  { title: "Миграции", goal: "Менять схему базы постепенно и воспроизводимо.", analogy: "Миграция — нумерованная инструкция, как переделать полки одинаково у всех членов команды.", query: "ALTER TABLE students ADD COLUMN email TEXT;", explanation: "ALTER TABLE меняет схему; в настоящем проекте такой шаг хранится в миграции и проверяется на копии данных.", practice: "Добавь учебный столбец email в таблицу students.", hint: "Используй ALTER TABLE ... ADD COLUMN ... TEXT." },
];

const applied: Seed[] = [
  { title: "Выбираем задачу базы", goal: "Начинать проект с понятной реальной сущности.", analogy: "Сначала реши, какие карточки нужны библиотеке, а потом строй полки.", query: "SELECT name, city FROM students;", explanation: "Учебный проект начинается с простого вопроса к данным и описания пользователей, которым нужен ответ.", practice: "Сформулируй запрос для каталога учебных курсов.", hint: "Назови таблицу и два нужных столбца." },
  { title: "Рисуем схему", goal: "Разделять сущности и связи до написания запросов.", analogy: "Схема — карта комнат: по ней видно, где живут курсы, уроки и записи ученика.", query: "CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER);", explanation: "Таблица связей помогает описать, какие ученики записаны на какие курсы.", practice: "Создай заготовку таблицы enrolments с двумя идентификаторами.", hint: "Укажи student_id и course_id как INTEGER." },
  { title: "Тестовые данные", goal: "Проверять запросы на маленьком понятном наборе.", analogy: "Тестовые данные — игрушечный город: на нём удобно проверить маршрут до поездки в большой город.", query: "INSERT INTO courses (id, title) VALUES (1, 'SQL Junior');", explanation: "Небольшие осмысленные строки помогают быстро заметить ошибку в JOIN или фильтре.", practice: "Добавь один учебный курс в таблицу courses.", hint: "Перечисли id и title, затем VALUES." },
  { title: "Полезный отчёт", goal: "Собрать запрос, который отвечает на вопрос пользователя.", analogy: "Отчёт — не куча карточек, а короткий ответ: сколько учеников в каждом курсе.", query: "SELECT course_id, COUNT(*) AS total FROM enrollments GROUP BY course_id;", explanation: "GROUP BY собирает записи по course_id, а COUNT показывает размер каждой группы.", practice: "Посчитай записи в каждом курсе.", hint: "Выбери course_id и COUNT(*), затем GROUP BY course_id." },
  { title: "Безопасность данных", goal: "Не хранить секреты и личные данные без необходимости.", analogy: "База — шкаф с личными карточками: доступ даётся только тем, кому он нужен для конкретной работы.", query: "SELECT id, title FROM courses;", explanation: "Для учебных экранов выбирай только нужные столбцы и используй обезличенные тестовые данные.", practice: "Выбери из courses только id и title без личных данных.", hint: "Не используй SELECT *, если все поля не нужны." },
  { title: "Итоговый проект: каталог курсов", goal: "Собрать базу, схему, запросы и документацию в цельный мини-проект.", analogy: "Это коробка конструктора с инструкцией: внутри схема, тестовые карточки, запросы и объяснение, как всё собрать.", query: "SELECT courses.title, COUNT(enrollments.student_id) AS learners FROM courses LEFT JOIN enrollments ON courses.id = enrollments.course_id GROUP BY courses.id;", explanation: "Итоговый запрос показывает курсы и число записей, включая курсы без учеников благодаря LEFT JOIN.", practice: "Собери итоговый отчёт по курсам и числу учеников.", hint: "Начни с courses, добавь LEFT JOIN enrollments и GROUP BY courses.id." },
];

const toVolume = (stage: SqlVolume["id"], title: string, start: number, seeds: Seed[]): SqlVolume => ({ id: stage, title, lessons: seeds.map((seed, index) => lesson(stage, start + index, seed)) });

export const sqlCourse: SqlVolume[] = [
  toVolume("junior", "Том I · Junior: первые запросы", 1, junior),
  toVolume("middle", "Том II · Middle: таблицы и связи", 7, middle),
  toVolume("senior", "Том III · Senior: надёжная база", 13, senior),
  toVolume("applied", "Том IV · Проекты и практика", 19, applied),
];
