import type { Value } from "./learning-python";

export interface LearningAngularResult {
  output: string[];
  variables: Record<string, Value>;
  error?: string;
}

const FORBIDDEN_PATTERNS: Array<[RegExp, string]> = [
  [/\bfetch\s*\(/, "Сетевые запросы в учебном разборе Angular отключены."],
  [/\bXMLHttpRequest\b|\bWebSocket\b/, "Сетевые соединения в учебном разборе Angular отключены."],
  [/\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b/, "Хранилища браузера в учебном разборе Angular отключены."],
  [/\bdocument\b|\bwindow\b|\bglobalThis\b/, "Доступ к DOM и глобальному окружению в учебном разборе Angular отключён."],
  [/\brequire\s*\(|\bimport\s+.+from\s+['"]/m, "Подключение внешних модулей в учебном разборе Angular отключено."],
];

function matches(code: string, pattern: RegExp) {
  return Array.from(code.matchAll(pattern)).map((match) => match[1]).filter(Boolean);
}

export function analyzeLearningAngular(code: string): LearningAngularResult {
  if (!code.trim()) {
    return { output: [], variables: {}, error: "Сначала добавьте маленький пример Angular-компонента, сервиса, шаблона, маршрута или RxJS." };
  }

  for (const [pattern, message] of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) return { output: [], variables: {}, error: message };
  }

  const output: string[] = [];
  const variables: Record<string, Value> = {};
  const components = matches(code, /export\s+class\s+([A-Za-z_$][\w$]*Component)\b/g);
  const services = matches(code, /export\s+class\s+([A-Za-z_$][\w$]*Service)\b/g);
  const routes = matches(code, /path\s*:\s*['"]([^'"]*)['"]/g);
  const signals = matches(code, /(?:const|readonly|\b)\s*([A-Za-z_$][\w$]*)\s*=\s*signal\s*\(/g);
  const outputs = matches(code, /(?:const|readonly|\b)\s*([A-Za-z_$][\w$]*)\s*=\s*output\s*(?:<[^>]+>)?\s*\(/g);

  if (/@Component\s*\(/.test(code)) {
    output.push(components.length ? `Компонент найден: ${components.join(", ")}. Это отдельная комната приложения со своим видом и правилами.` : "Найден @Component(). Компонент отвечает за маленькую часть интерфейса.");
  }
  if (/\bselector\s*:/.test(code)) output.push("Найден selector. Это имя, которым компонент можно поставить в шаблон родителя.");
  if (/\btemplate\s*:|templateUrl\s*:/.test(code)) output.push("Найден шаблон. Шаблон описывает, что человек увидит на экране.");
  if (/\{\{[^}]+\}\}/.test(code)) output.push("Найдена интерполяция {{ }}. Она показывает значение из класса компонента.");
  if (/\[[A-Za-z-]+\]\s*=/.test(code)) output.push("Найдена привязка свойства [..]. Она передаёт значение из кода в элемент интерфейса.");
  if (/\([A-Za-z]+\)\s*=/.test(code)) output.push("Найдена обработка события (..). Нажатие или другое действие вызовет метод компонента.");
  if (/@if\s*\(|\*ngIf\s*=/.test(code)) output.push("Найдено условие. Angular покажет блок только когда условие истинно.");
  if (/@for\s*\(|\*ngFor\s*=/.test(code)) output.push("Найден список. Angular повторит аккуратный кусочек шаблона для каждого элемента.");
  if (/\binput(?:\.required)?\s*(?:<[^>]+>)?\s*\(|@Input\b/.test(code)) output.push("Найден входной параметр. Родитель передаёт ребёнку нужные данные через понятный кармашек.");
  if (/\boutput\s*(?:<[^>]+>)?\s*\(|@Output\b/.test(code)) output.push(outputs.length ? `Найдены события ребёнка: ${outputs.join(", ")}. Они сообщают родителю о действии.` : "Найден output. Ребёнок сообщает родителю о важном действии.");
  if (/@Injectable\s*\(/.test(code)) output.push(services.length ? `Сервис найден: ${services.join(", ")}. Сервис хранит общее правило, а не разметку экрана.` : "Найден @Injectable(). Сервис хранит общую работу, чтобы компоненты не повторялись.");
  if (/\binject\s*\(/.test(code)) output.push("Найден inject(). Компонент получает готового помощника-сервис, а не создаёт его сам.");
  if (/\b(?:of|map|filter|switchMap|pipe|subscribe)\s*\(/.test(code)) output.push("Найден RxJS-паттерн. Поток — это письмо, которое может прийти сейчас или немного позже.");
  if (/\bRoutes\b|\bRouterOutlet\b|\brouterLink\b/.test(code)) output.push(routes.length ? `Маршруты найдены: ${routes.map((route) => `/${route}`).join(", ")}. Они ведут пользователя к нужным экранам.` : "Найдено средство маршрутизации. Маршруты — это таблички между экранами приложения.");
  if (/\bsignal\s*\(/.test(code)) output.push(signals.length ? `Signals найдены: ${signals.join(", ")}. Изменение сигнала помогает интерфейсу увидеть свежие данные.` : "Найден signal(). Это маленькое реактивное хранилище значения.");
  if (/\bcomputed\s*\(/.test(code)) output.push("Найден computed(). Он вычисляет новое значение из сигналов, не создавая лишнюю копию данных.");
  if (/ChangeDetectionStrategy\.OnPush/.test(code)) output.push("Найден OnPush. Angular будет проверять этот компонент бережнее, когда данные действительно изменились.");
  if (/\bForm(?:Group|Control)\b|\bValidators\b/.test(code)) output.push("Найдена реактивная форма. Она хранит поля, ошибки и правила проверки в одном понятном месте.");
  if (/\b(createFeature|provideStore|Store)\b/.test(code)) output.push("Найдено общее состояние. Такое решение полезно, когда одинаковые данные нужны нескольким экранам.");

  if (!output.length) {
    return { output: [], variables: {}, error: "Пока учебный разбор Angular понимает @Component, шаблоны, привязки, @Injectable, inject, RxJS, маршруты, signals, формы и NgRx-паттерны." };
  }

  if (components.length) variables.components = components;
  if (services.length) variables.services = services;
  if (routes.length) variables.routes = routes;
  if (signals.length) variables.signals = signals;
  if (outputs.length) variables.outputs = outputs;
  return { output, variables };
}
