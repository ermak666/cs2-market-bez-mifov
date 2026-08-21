import { gitGithubCourse } from "../series-content/git-github/course";
import type { CourseData } from "./course-types";

export const gitCourseContent: CourseData = {
  volumes: gitGithubCourse.map((volume) => ({
    id: volume.id,
    title: volume.title,
    lessons: volume.lessons.map((lesson) => ({
      id: lesson.id,
      number: lesson.number,
      title: lesson.title,
      goal: lesson.goal,
      analogy: lesson.analogy,
      code: lesson.command,
      body: [
        `Цель. ${lesson.goal}`,
        `Аналогия. ${lesson.analogy}`,
        "### Команда или шаг",
        lesson.command,
        `Разбор. ${lesson.explanation}`,
        "### Практика: сначала попробуйте сами",
        ...lesson.tasks.flatMap((task) => [`#### ${task.title}`, task.prompt, `Подсказка. ${task.hint}`, `Разбор решения. ${task.solution}`]),
      ].join("\n\n"),
    })),
  })),
};
