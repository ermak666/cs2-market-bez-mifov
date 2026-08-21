import type { PracticeVolume } from "./practice-challenges";

export type VolumeFinalTask = { volumeId: PracticeVolume; label: string; title: string; questions: VolumeFinalQuestion[] };
export type VolumeFinalQuestion = { prompt: string; code?: string; options: string[]; correctIndex: number; explanation: string };

export const volumeFinalTasks: VolumeFinalTask[] = [
  { volumeId: "junior", label: "Итоговая мини-задача · Junior", title: "Проверь первые запросы SQL", questions: [
    { prompt: "Что делает SELECT * FROM students?", options: ["Показывает все столбцы таблицы students", "Удаляет таблицу", "Создаёт индекс"], correctIndex: 0, explanation: "SELECT читает данные, а * означает все столбцы таблицы." },
    { prompt: "Зачем нужен WHERE?", options: ["Отфильтровать нужные строки", "Переименовать таблицу", "Запустить сервер"], correctIndex: 0, explanation: "WHERE оставляет только строки, подходящие под условие." },
    { prompt: "Почему UPDATE без WHERE опасен?", options: ["Может изменить все строки", "Не работает с числами", "Всегда создаёт таблицу"], correctIndex: 0, explanation: "Перед UPDATE и DELETE сначала полезно проверить SELECT с тем же WHERE." },
  ] },
  { volumeId: "middle", label: "Итоговая мини-задача · Middle", title: "Проверь таблицы и связи", questions: [
    { prompt: "Для чего нужен PRIMARY KEY?", options: ["Однозначно отличать строку", "Хранить пароль", "Сортировать текст"], correctIndex: 0, explanation: "Первичный ключ — уникальный номер строки в таблице." },
    { prompt: "Что делает JOIN?", options: ["Соединяет связанные таблицы", "Удаляет дубли", "Создаёт резервную копию"], correctIndex: 0, explanation: "JOIN показывает связанные данные из нескольких таблиц по ключам." },
    { prompt: "Зачем нужен GROUP BY?", options: ["Собирать строки в группы для подсчёта", "Менять тип столбца", "Отключать базу"], correctIndex: 0, explanation: "GROUP BY используют вместе с агрегатами, например COUNT или AVG." },
  ] },
  { volumeId: "senior", label: "Итоговая мини-задача · Senior", title: "Проверь инженерные привычки SQL", questions: [
    { prompt: "Когда индекс полезен?", options: ["При частых поисках по столбцу после измерения", "Для каждого столбца всегда", "Вместо таблицы"], correctIndex: 0, explanation: "Индекс ускоряет некоторые чтения, но имеет цену при записи и занимает место." },
    { prompt: "Зачем нужна транзакция?", options: ["Подтвердить связанные изменения как единое целое", "Скрыть запрос", "Удалить историю"], correctIndex: 0, explanation: "Если одна часть операции не прошла, транзакцию можно откатить целиком." },
    { prompt: "Что показывает EXPLAIN QUERY PLAN?", options: ["Как база собирается искать данные", "Содержимое пароля", "Результат UPDATE"], correctIndex: 0, explanation: "План запроса читают перед оптимизацией, чтобы не угадывать причину медленной работы." },
  ] },
  { volumeId: "applied", label: "Итоговая мини-задача · Проекты и практика", title: "Проверь учебный проект базы", questions: [
    { prompt: "С чего разумно начать проект базы?", options: ["С задач пользователя и схемы сущностей", "С огромной таблицы без описания", "С настоящих личных данных"], correctIndex: 0, explanation: "Сначала определяют, на какой вопрос должна отвечать база и какие сущности нужны." },
    { prompt: "Зачем нужны тестовые данные?", options: ["Проверять схему и запросы безопасно", "Хранить секреты", "Заменять документацию"], correctIndex: 0, explanation: "Небольшой понятный набор строк помогает заметить ошибку до работы с реальными данными." },
    { prompt: "Что стоит включить в README SQL-проекта?", options: ["Цель, схему, запуск и примеры запросов", "Пароли базы", "Только название"], correctIndex: 0, explanation: "Хорошая документация помогает другому человеку понять структуру проекта и запустить его безопасно." },
  ] },
];

export function getVolumeFinalTask(volumeId: string | undefined) { return volumeFinalTasks.find((task) => task.volumeId === volumeId); }
