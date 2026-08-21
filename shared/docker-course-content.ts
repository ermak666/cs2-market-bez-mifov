import type { CourseData } from "./course-types";

type Stage = "junior" | "middle" | "senior" | "applied";
type Seed = { title: string; analogy: string; code: string; focus: string };
const seeds: Record<Stage, Seed[]> = {
  junior: [
    { title: "Зачем Docker", analogy: "Docker — набор одинаковых коробок: у каждого компьютера лежит одна и та же инструкция.", code: "docker --version", focus: "Docker помогает описать среду приложения повторяемо." },
    { title: "Образ и контейнер", analogy: "Образ — чертёж коробки, контейнер — коробка, которую уже открыли и используют.", code: "image → container", focus: "Образ неизменяемо описывает основу, контейнер — отдельный запуск." },
    { title: "Первый Dockerfile", analogy: "Dockerfile — рецепт для коробки с программой.", code: "FROM python:3.12-slim", focus: "FROM выбирает исходную основу образа." },
    { title: "WORKDIR", analogy: "WORKDIR — подписанный стол внутри коробки.", code: "WORKDIR /app", focus: "Рабочая папка делает следующие шаги Dockerfile понятными." },
    { title: "COPY", analogy: "COPY — положить нужные учебные материалы в коробку.", code: "COPY . /app", focus: "Копируйте только нужные файлы и используйте .dockerignore." },
    { title: "CMD", analogy: "CMD — записка: что коробка должна делать при старте.", code: "CMD [\"python\", \"app.py\"]", focus: "CMD задаёт стандартную команду запуска контейнера." },
  ],
  middle: [
    { title: "Сборка образа", analogy: "build — собрать коробку по рецепту Dockerfile.", code: "docker build -t demo .", focus: "Тег даёт образу понятное имя; учебная песочница не выполняет сборку." },
    { title: "Порты", analogy: "Порт — номер двери, через которую приложения договариваются.", code: "EXPOSE 8000", focus: "EXPOSE документирует ожидаемый порт; сам по себе не публикует сервис." },
    { title: "Переменные окружения", analogy: "ENV — маленькая подписанная настройка коробки, но не место для секретов.", code: "ENV APP_ENV=development", focus: "Секреты не пишут в образ и не показывают в уроках." },
    { title: "Volume", analogy: "Volume — отдельная полка для данных, которая переживает замену коробки.", code: "volumes:\n  - data:/app/data", focus: "Volume хранит нужные данные отдельно от жизненного цикла контейнера." },
    { title: "Network", analogy: "Network — безопасный коридор, по которому коробки находят друг друга по именам.", code: "networks:\n  app-net:", focus: "Контейнеры связывают через явную сеть и не открывают лишние порты." },
    { title: "Docker Compose", analogy: "Compose — список коробок, которые нужно собрать и включить вместе.", code: "services:\n  app:\n    build: .", focus: "Compose держит настройки нескольких сервисов в одном читаемом файле." },
  ],
  senior: [
    { title: "Многоступенчатая сборка", analogy: "Одна комната собирает игрушку, другая оставляет только готовый результат.", code: "FROM node:22 AS build", focus: "Multi-stage build уменьшает итоговый образ и убирает лишние инструменты." },
    { title: ".dockerignore", analogy: "dockerignore — список вещей, которые не надо класть в коробку.", code: "node_modules\n.env\n.git", focus: "Не включайте зависимости, секреты и историю Git в build context." },
    { title: "Healthcheck", analogy: "Healthcheck — короткий вопрос коробке: «ты действительно готова?»", code: "HEALTHCHECK CMD curl -f http://localhost/ || exit 1", focus: "Проверка здоровья описывает готовность сервиса, но в уроке не запускается." },
    { title: "Не root", analogy: "Не запускать всё от главного ключа — правило аккуратной мастерской.", code: "USER app", focus: "Отдельный непривилегированный пользователь уменьшает последствия ошибки." },
    { title: "Кэш слоёв", analogy: "Слои — полки рецепта: часто меняющиеся вещи кладут ниже.", code: "COPY package*.json ./\nRUN npm ci\nCOPY . .", focus: "Стабильные шаги раньше помогают Docker повторно использовать кэш." },
    { title: "Логи контейнера", analogy: "Логи — дневник коробки: ищем причину спокойно, без секретов.", code: "docker logs <container>", focus: "Логи наблюдают за сервисом; не вставляйте в них токены и личные данные." },
  ],
  applied: [
    { title: "Проект: API в контейнере", analogy: "Одна коробка содержит маленький API и понятный рецепт запуска.", code: "FROM python:3.12-slim\nWORKDIR /app", focus: "Начинайте с минимального образа и прозрачного Dockerfile." },
    { title: "Проект: app + db", analogy: "Две коробки дружат через Compose и отдельную сеть.", code: "services:\n  app:\n  db:", focus: "Названия сервисов помогают им находить друг друга внутри Compose." },
    { title: "Проект: данные", analogy: "Данные базы лежат на отдельной полке-volume.", code: "volumes:\n  db-data:", focus: "Volume уменьшает риск потерять данные при пересоздании контейнера." },
    { title: "Проект: переменные", analogy: "Настройки хранятся отдельно от рецепта, а секреты не попадают в Git.", code: "environment:\n  APP_ENV: development", focus: "Используйте нейтральные значения-примеры и документируйте нужные переменные." },
    { title: "Проект: healthcheck", analogy: "Перед открытием дверей проект проверяет, что сервис проснулся.", code: "healthcheck:\n  test: [\"CMD\", \"check\"]", focus: "Healthcheck описывает сигнал готовности сервиса." },
    { title: "Проект: README", analogy: "README — карта коробок: что есть, как безопасно собрать и как проверить.", code: "цель → build → compose → проверка", focus: "Опишите порты, переменные, тома и ограничения без секретов." },
  ],
};
const titles: Record<Stage, string> = { junior: "Том I · Junior: образы и контейнеры", middle: "Том II · Middle: Compose, сети и данные", senior: "Том III · Senior: безопасность и оптимизация", applied: "Том IV · Проекты и практика" };
const body = (seed: Seed) => `Цель. Понять тему «${seed.title}».\n\nАналогия. ${seed.analogy}\n\n### Пример\n\n\`\`\`dockerfile\n${seed.code}\n\`\`\`\n\n### Разбор\n\n${seed.focus}\n\n### Практика\n\n#### Задача 1\nОбъясните этот фрагмент Docker своими словами.\n\nПодсказка. Найдите, что описывается: образ, контейнер, данные или сеть.\n\nРазбор решения. ${seed.focus}\n\n#### Задача 2\nНазовите безопасную проверку перед изменением конфигурации.\n\nПодсказка. Проверьте имя, порт, путь или наличие секрета.\n\nРазбор решения. ${seed.analogy}\n\n#### Задача 3\nПридумайте один граничный случай для этой конфигурации.\n\nПодсказка. Подумайте об отсутствии файла, свободном порте или перезапуске контейнера.\n\nРазбор решения. Сначала прочитайте конфигурацию и уточните безопасный следующий шаг.`;
export const dockerCourseContent: CourseData = { volumes: (Object.keys(seeds) as Stage[]).map((stage, stageIndex) => ({ id: stage, title: titles[stage], lessons: seeds[stage].map((seed, index) => ({ id: `docker-${stage}-${stageIndex * 6 + index + 1}`, number: stageIndex * 6 + index + 1, title: seed.title, goal: `Понять тему «${seed.title}».`, analogy: seed.analogy, code: seed.code, body: body(seed) })) })) };
