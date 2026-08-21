import { javascriptCourse } from "../series-content/javascript/course";
import type { CourseData } from "./course-types";

export const javascriptCourseContent: CourseData = {
  volumes: javascriptCourse.map((volume) => ({
    id: volume.id,
    title: volume.title,
    lessons: volume.lessons.map((lesson) => ({
      id: lesson.id,
      number: lesson.number,
      title: lesson.title,
      goal: lesson.goal,
      analogy: lesson.analogy,
      code: lesson.code,
      body: [
        `Цель. ${lesson.goal}`,
        `Аналогия. ${lesson.analogy}`,
        "### Пример",
        lesson.code,
        `Разбор. ${lesson.explanation}`,
        "### Практика",
        ...lesson.tasks.flatMap((task) => [`#### ${task.title}`, task.prompt, `Подсказка. ${task.hint}`, `Разбор решения. ${task.solution}`]),
      ].join("\n\n"),
    })),
  })),
};
