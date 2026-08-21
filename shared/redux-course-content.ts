import type { CourseData } from "./course-types";

type Stage = "junior" | "middle" | "senior" | "applied";
const lessons: Record<Stage, string[]> = {
  junior: ["Зачем нужен общий store", "State и action", "Reducer как правило", "Первый slice", "dispatch действия", "Чтение через selector"],
  middle: ["configureStore", "createSlice", "Payload action", "Несколько slices", "useSelector", "useDispatch"],
  senior: ["Нормализация данных", "Memoized selector", "createAsyncThunk", "Статусы загрузки", "Ошибки и отмена", "Тест reducer"],
  applied: ["Карта состояния", "Slice задач", "Фильтры", "Асинхронный запрос", "Экран статистики", "Итоговый проект"],
};
const explanations: Record<Stage, string> = {
  junior: "Store — общий шкаф данных. Action — записка с просьбой, а reducer — правило, как изменить нужный ящик.",
  middle: "Redux Toolkit убирает лишние повторения: slice хранит данные, правила и actions в одном понятном месте.",
  senior: "Большое состояние держат маленькими предсказуемыми частями, а асинхронные действия показывают загрузку и ошибку честно.",
  applied: "Итоговый проект соединяет store, slices, selectors, тесты и понятный интерфейс.",
};
const titles: Record<Stage, string> = { junior: "Том I · Junior: общий store", middle: "Том II · Middle: slices и React", senior: "Том III · Senior: асинхронность и качество", applied: "Том IV · Проекты и практика" };
export const reduxCourseContent: CourseData = { volumes: (Object.keys(lessons) as Stage[]).map((stage, stageIndex) => ({ id: stage, title: titles[stage], lessons: lessons[stage].map((title, index) => {
  const number = stageIndex * 6 + index + 1;
  const code = stage === "junior" ? "const action = { type: 'tasks/add', payload: 'Урок' };" : stage === "middle" ? "const tasksSlice = createSlice({ name: 'tasks', initialState: [], reducers: {} });" : stage === "senior" ? "const loadTasks = createAsyncThunk('tasks/load', async () => []);" : "const visibleTasks = useSelector(selectVisibleTasks);";
  const explanation = explanations[stage];
  return { id: `redux-${stage}-${number}`, number, title, goal: `Понять шаг «${title}».`, analogy: explanation, code, body: `Цель. Понять шаг «${title}».\n\nАналогия. ${explanation}\n\n### Пример\n\n${code}\n\nРазбор. ${explanation}\n\n### Практика\n\n#### Задача 1\nПовторите маленький пример.\n\nПодсказка. Назовите store, action, reducer или selector.\n\nРазбор решения. ${explanation}\n\n#### Задача 2\nОбъясните его своими словами.\n\nПодсказка. Сначала скажите, где лежат данные.\n\nРазбор решения. ${explanation}\n\n#### Задача 3\nСделайте безопасное изменение в примере.\n\nПодсказка. Меняйте только одно значение.\n\nРазбор решения. ${explanation}` };
}) })) };
