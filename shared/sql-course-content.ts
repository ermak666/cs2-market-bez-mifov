import { sqlCourse } from "../series-content/sql/course";
import type { CourseData } from "./course-types";

export const sqlCourseContent: CourseData = {
  volumes: sqlCourse.map((volume) => ({
    id: volume.id,
    title: volume.title,
    lessons: volume.lessons.map((lesson) => ({
      id: lesson.id,
      number: lesson.number,
      title: lesson.title,
      goal: lesson.goal,
      analogy: lesson.analogy,
      code: lesson.query,
      body: [
        `Цель. ${lesson.goal}`,
        `Аналогия. ${lesson.analogy}`,
        "### Запрос",
        lesson.query,
        `Разбор. ${lesson.explanation}`,
        "### Практика: сначала попробуйте сами",
        ...lesson.tasks.flatMap((task) => [`#### ${task.title}`, task.prompt, `Подсказка. ${task.hint}`, `Разбор решения. ${task.solution}`]),
      ].join("\n\n"),
    })),
  })),
};
