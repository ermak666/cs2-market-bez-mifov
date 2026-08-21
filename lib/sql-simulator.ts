type Student = { id: number; name: string; city: string | null; score: number; school_id: number };

const students: Student[] = [
  { id: 1, name: "Аня", city: "Казань", score: 5, school_id: 1 },
  { id: 2, name: "Илья", city: "Москва", score: 4, school_id: 2 },
  { id: 3, name: "Мира", city: "Казань", score: 5, school_id: 1 },
  { id: 4, name: "Саша", city: null, score: 3, school_id: 2 },
];

const schools = [{ id: 1, title: "Школа кода" }, { id: 2, title: "Техлицей" }];

export type SqlSimulationResult = { output: string[]; error?: string };

const denied = "Учебная песочница принимает только разрешённые запросы к встроенным таблицам. Она не подключается к файлам, сети, серверам или вашим настоящим данным.";
const table = (headers: string[], rows: Array<Array<string | number | null>>) => [headers.join(" | "), ...rows.map((row) => row.map((value) => value ?? "NULL").join(" | "))];

export function runSqlSimulation(query: string): SqlSimulationResult {
  const normalized = query.trim().replace(/\s+/g, " ").replace(/;$/, "");
  const upper = normalized.toUpperCase();
  if (!normalized) return { output: [], error: "Сначала напишите учебный SQL-запрос." };
  if (/\b(DROP|ATTACH|DETACH|PRAGMA|VACUUM|LOAD_EXTENSION|COPY)\b/i.test(normalized)) return { output: [], error: denied };
  if (/^SELECT \* FROM students$/i.test(normalized)) return { output: table(["id", "name", "city", "score", "school_id"], students.map((row) => [row.id, row.name, row.city, row.score, row.school_id])) };
  if (/^SELECT name, city FROM students$/i.test(normalized)) return { output: table(["name", "city"], students.map((row) => [row.name, row.city])) };
  if (/^SELECT name FROM students WHERE city = 'Казань'$/i.test(normalized)) return { output: table(["name"], students.filter((row) => row.city === "Казань").map((row) => [row.name])) };
  if (/^SELECT name FROM students WHERE city IS NULL$/i.test(normalized)) return { output: table(["name"], students.filter((row) => row.city === null).map((row) => [row.name])) };
  if (/^SELECT name, score FROM students ORDER BY score DESC LIMIT 3$/i.test(normalized)) return { output: table(["name", "score"], [...students].sort((a, b) => b.score - a.score).slice(0, 3).map((row) => [row.name, row.score])) };
  if (/COUNT\(\*\).*AVG\(score\).*FROM students/i.test(normalized)) return { output: table(["total", "average_score"], [[students.length, (students.reduce((sum, row) => sum + row.score, 0) / students.length).toFixed(2)]]) };
  if (/GROUP BY city/i.test(normalized) && /FROM students/i.test(normalized)) {
    const groups = [...new Set(students.map((row) => row.city ?? "NULL"))].map((city) => [city, students.filter((row) => (row.city ?? "NULL") === city).length] as [string, number]);
    return { output: table(["city", "total"], groups) };
  }
  if (/FROM lessons JOIN courses/i.test(normalized)) return { output: table(["lesson_title", "course_title"], [["SELECT и фильтры", "SQL Junior"], ["JOIN таблиц", "SQL Middle"]]) };
  if (/FROM students JOIN schools/i.test(normalized)) return { output: table(["name", "school"], students.map((student) => [student.name, schools.find((school) => school.id === student.school_id)?.title ?? "—"])) };
  if (/FROM courses LEFT JOIN enrollments/i.test(normalized)) return { output: table(["title", "learners"], [["SQL Junior", 2], ["SQL Middle", 1], ["SQL Senior", 0]]) };
  if (/^INSERT INTO /i.test(normalized)) return { output: ["Учебная строка подготовлена во встроенной песочнице.", "Настоящие данные пользователя не менялись."] };
  if (/^UPDATE students SET score = 5 WHERE name = 'Аня'$/i.test(normalized)) return { output: ["В учебной таблице обновлена 1 строка: Аня → score 5.", "Изменение существует только в текущем учебном примере."] };
  if (/^CREATE TABLE /i.test(normalized) || /^CREATE INDEX /i.test(normalized) || /^CREATE VIEW /i.test(normalized) || /^ALTER TABLE /i.test(normalized)) return { output: ["Схема учебной базы проверена. Настоящие файлы базы не создавались."] };
  if (upper.startsWith("BEGIN") && upper.includes("COMMIT")) return { output: ["Учебная транзакция собрана: все изменения подтверждаются как единое целое."] };
  if (upper.startsWith("EXPLAIN QUERY PLAN")) return { output: ["QUERY PLAN", "SEARCH students USING учебный индекс idx_students_city (city=?)"] };
  return { output: [], error: denied };
}
