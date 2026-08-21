import type { CourseData } from "./course-types";
type Stage = "junior" | "middle" | "senior" | "applied";
type Seed = { title: string; analogy: string; code: string; focus: string };
const guardrail = "Граница безопасности: работайте только с разрешёнными модами и инструментами, храните резервную копию, не обходите DRM, античит, лицензии и сетевые ограничения.";
const seeds: Record<Stage, Seed[]> = {
  junior: [
    { title: "Что такое законный мод", analogy: "Мод — съёмная наклейка на папке, а не попытка переписать саму папку.", code: "mod-name: " + "\"ui-color-pack\"\nversion: \"1.0.0\"", focus: "Проверяйте правила игры и площадки; используйте только материалы, на которые есть права." },
    { title: "Резервная копия", analogy: "Резервная копия — фотография комнаты до перестановки мебели.", code: "backup/\n  original-state.txt\n  created-at.txt", focus: "Перед изменениями фиксируйте исходную версию игры и путь отката." },
    { title: "Папка мода", analogy: "Папка мода — отдельный прозрачный конверт рядом с оригинальной папкой.", code: "mods/\n  ui-color-pack/\n    manifest.toml", focus: "Не смешивайте файлы мода с оригинальными файлами без явного разрешения игры." },
    { title: "Manifest", analogy: "Manifest — этикетка коробки: что внутри и для какой версии.", code: "name = \"ui-color-pack\"\ngame_version = \"1.2\"", focus: "Название, версия и совместимость должны быть честными и короткими." },
    { title: "Включить и отключить", analogy: "Переключатель мода — выключатель лампы: должно быть легко вернуть всё как было.", code: "enabled: false\nreason: \"compatibility check\"", focus: "Первый запуск мода делают обратимым и с понятным отключением." },
    { title: "Журнал изменений", analogy: "Changelog — дневник: что поменяли и почему.", code: "## 1.0.1\n- исправлена подпись кнопки", focus: "Небольшие записи упрощают поиск ошибки и откат." },
  ],
  middle: [
    { title: "Версии", analogy: "Версия — номер детали: неподходящая деталь может не встать на место.", code: "game: \"1.2.0\"\nmod: \"1.0.0\"", focus: "Указывайте проверенную версию игры и мода; не обещайте совместимость без проверки." },
    { title: "Зависимости", analogy: "Зависимость — деталь конструктора, без которой другая деталь не держится.", code: "dependencies:\n  - base-ui >= 2.0", focus: "Записывайте минимальную версию и источник разрешённой зависимости." },
    { title: "Порядок загрузки", analogy: "Load order — очередь коробок: поздняя коробка может перекрыть раннюю.", code: "load-order:\n  - base-ui\n  - ui-color-pack", focus: "Меняйте порядок по одному шагу и фиксируйте результат." },
    { title: "Конфликт", analogy: "Конфликт — две наклейки на одном и том же месте папки.", code: "conflict: \"two mods change the same label\"", focus: "Не смешивайте конфликтующие изменения; отключайте один мод и проверяйте отдельно." },
    { title: "Логи", analogy: "Лог — блокнот наблюдателя, который говорит, где процесс остановился.", code: "[mod] loaded ui-color-pack\n[mod] missing dependency", focus: "Лог читают без публикации личных путей, ключей или чужих данных." },
    { title: "Тестовый профиль", analogy: "Тестовый профиль — отдельный стол для черновика, не основная коллекция.", code: "profile: \"testing\"\nmods: [\"ui-color-pack\"]", focus: "Проверяйте новый мод в изолированном профиле и добавляйте по одному." },
  ],
  senior: [
    { title: "Матрица совместимости", analogy: "Матрица — таблица, где видно, какие детали дружат.", code: "game 1.2 | base-ui 2.1 | color-pack 1.0 | pass", focus: "Записывайте реальные проверки, а не предположения." },
    { title: "Минимальный воспроизводимый набор", analogy: "Минимальный набор — одна наклейка и одна папка, чтобы понять проблему.", code: "enabled-mods:\n  - base-ui\n  - ui-color-pack", focus: "Для диагностики отключайте лишние моды и добавляйте их по одному." },
    { title: "Безопасное описание ошибки", analogy: "Хороший отчёт — аккуратная записка без личных данных.", code: "steps:\n  - start testing profile\n  - enable ui-color-pack\nexpected: \"theme loads\"", focus: "Опишите версию, шаги, ожидаемый и фактический результат, но не публикуйте личные данные." },
    { title: "Лицензия и авторство", analogy: "Лицензия — табличка на работе автора: что можно делать и как поблагодарить.", code: "credits:\n  - original author: Example\nlicense: \"see source terms\"", focus: "Не перезаливайте чужие файлы и сборки без разрешения автора." },
    { title: "Публикация", analogy: "Публикация — витрина: у модификации должны быть ясная этикетка и инструкция.", code: "summary: \"changes UI colors only\"\ninstall: \"copy to approved mods folder\"", focus: "Указывайте функцию мода, совместимость, установку, откат и известные ограничения." },
    { title: "Граница онлайн-режима", analogy: "Онлайн-режим — чужая площадка с правилами хозяина.", code: "online-mode: \"do not use unless explicitly allowed\"", focus: "Не используйте моды там, где правила игры, сервера или античита это запрещают." },
  ],
  applied: [
    { title: "Проект: тема интерфейса", analogy: "Начните с безопасной наклейки: изменить подписи и цвета без затрагивания логики.", code: "name = \"calm-ui-theme\"\nchanges = [\"colors\", \"labels\"]", focus: "Проект меняет только разрешённые данные и всегда имеет откат." },
    { title: "Проект: manifest", analogy: "Manifest — паспорт мода.", code: "name = \"calm-ui-theme\"\nversion = \"0.1.0\"\ngame_version = \"1.2\"", focus: "Не скрывайте версию, автора, зависимость и ограничения." },
    { title: "Проект: план теста", analogy: "План теста — маршрут: сначала резервная копия, затем один спокойный шаг.", code: "1. backup\n2. testing profile\n3. enable mod\n4. verify\n5. disable", focus: "Каждый шаг должен быть обратимым и наблюдаемым." },
    { title: "Проект: отчёт", analogy: "Отчёт — письмо будущему себе и пользователю.", code: "tested: game 1.2\nknown-limit: base-ui 2.0+\nrollback: disable and remove folder", focus: "Добавьте версию, зависимости, известные ограничения и путь отката." },
    { title: "Проект: README", analogy: "README — инструкция на коробке.", code: "purpose → compatibility → install → test → rollback → credits", focus: "README не должен содержать чужие файлы, ключи или инструкций обхода защиты." },
    { title: "Проект: публикация", analogy: "Публикация — обещание сообществу быть понятным и уважительным.", code: "rights: \"own work or permitted assets\"\ncontent-rating: \"appropriate\"", focus: "Публикуйте только контент, на который у вас есть права, и следуйте правилам конкретной площадки." },
  ],
};
const titles: Record<Stage, string> = { junior: "Том I · Junior: безопасный старт", middle: "Том II · Middle: совместимость и диагностика", senior: "Том III · Senior: качество и публикация", applied: "Том IV · Законные проекты" };
const body = (seed: Seed) => `Цель. Понять тему «${seed.title}».\n\nАналогия. ${seed.analogy}\n\n### Безопасный пример\n\n\`\`\`text\n${seed.code}\n\`\`\`\n\n### Разбор\n\n${seed.focus}\n\n> ${guardrail}\n\n### Практика\n\n#### Задача 1\nОбъясните, как этот пример помогает сделать изменение обратимым.\n\nПодсказка. Найдите версию, зависимость, папку мода, резервную копию или путь отката.\n\nРазбор решения. ${seed.focus}\n\n#### Задача 2\nНазовите безопасный граничный случай.\n\nПодсказка. Подумайте о несовместимой версии, конфликте двух модов или отсутствующей зависимости.\n\nРазбор решения. ${seed.analogy}\n\n#### Задача 3\nСоставьте короткую запись changelog или README для такого изменения.\n\nПодсказка. Укажите версию, проверенный сценарий и откат.\n\nРазбор решения. Понятная документация помогает пользователю остановиться и вернуть исходное состояние.`;
export const moddingCourseContent: CourseData = { volumes: (Object.keys(seeds) as Stage[]).map((stage, stageIndex) => ({ id: stage, title: titles[stage], lessons: seeds[stage].map((seed, index) => ({ id: `modding-${stage}-${stageIndex * 6 + index + 1}`, number: stageIndex * 6 + index + 1, title: seed.title, goal: `Понять тему «${seed.title}».`, analogy: seed.analogy, code: seed.code, body: body(seed) })) })) };
