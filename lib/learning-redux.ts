import type { Value } from "./learning-python";

export interface LearningReduxResult {
  output: string[];
  variables: Record<string, Value>;
  error?: string;
}

const FORBIDDEN_PATTERNS: Array<[RegExp, string]> = [
  [/\bfetch\s*\(/, "Сетевые запросы в учебном разборе Redux Toolkit отключены."],
  [/\bXMLHttpRequest\b/, "Сетевые запросы в учебном разборе Redux Toolkit отключены."],
  [/\blocalStorage\b|\bsessionStorage\b/, "Хранилище браузера в учебном разборе Redux Toolkit отключено."],
  [/\bdocument\b|\bwindow\b/, "Доступ к DOM и window в учебном разборе Redux Toolkit отключён."],
  [/\brequire\s*\(|\bimport\s+.+from\s+['"]/m, "Подключение внешних модулей в учебном разборе Redux Toolkit отключено."],
];

function collectMatches(code: string, pattern: RegExp) {
  return Array.from(code.matchAll(pattern)).map((match) => match[1]).filter(Boolean);
}

export function analyzeLearningRedux(code: string): LearningReduxResult {
  const trimmed = code.trim();
  if (!trimmed) {
    return { output: [], variables: {}, error: "Сначала добавьте пример store, slice, action или selector." };
  }

  for (const [pattern, message] of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) {
      return { output: [], variables: {}, error: message };
    }
  }

  const output: string[] = [];
  const variables: Record<string, Value> = {};

  const sliceNames = collectMatches(code, /name\s*:\s*['"]([A-Za-z0-9_-]+)['"]/g);
  const reducerNames = collectMatches(code, /(\w+)\s*:\s*\(state/g);
  const selectors = collectMatches(code, /(?:const|function)\s+(select[A-Z][A-Za-z0-9_]*)/g);
  const storeNames = collectMatches(code, /(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*configureStore\s*\(/g);
  const thunks = collectMatches(code, /(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*createAsyncThunk\s*\(/g);

  if (/createSlice\s*\(/.test(code)) {
    output.push(sliceNames.length
      ? `Slice найден: ${sliceNames.join(", ")}. Slice хранит имя, состояние и reducers в одном месте.`
      : "Найден createSlice(). Slice объединяет имя, состояние и reducers в одном месте.");
  }

  if (/configureStore\s*\(/.test(code)) {
    output.push(storeNames.length
      ? `Store найден: ${storeNames.join(", ")}. Store собирает slices в общий шкаф данных.`
      : "Найден configureStore(). Store собирает slices в общий шкаф данных.");
  }

  if (/reducers\s*:\s*\{/.test(code)) {
    output.push(reducerNames.length
      ? `Reducers найдены: ${reducerNames.join(", ")}. Reducer — это понятное правило изменения состояния.`
      : "Найден блок reducers. Reducer — это понятное правило изменения состояния.");
  }

  if (/dispatch\s*\(/.test(code)) {
    output.push("Найден dispatch(). Dispatch отправляет action в store, чтобы reducer применил изменение.");
  }

  if (/useSelector\s*\(|\bselect[A-Z]/.test(code)) {
    output.push(selectors.length
      ? `Selectors найдены: ${selectors.join(", ")}. Selector читает только нужный кусочек состояния.`
      : "Найден selector/useSelector. Selector читает только нужный кусочек состояния.");
  }

  if (/useDispatch\s*\(/.test(code)) {
    output.push("Найден useDispatch(). Компонент получает кнопку для отправки actions в store.");
  }

  if (/createAsyncThunk\s*\(/.test(code)) {
    output.push(thunks.length
      ? `Async thunk найден: ${thunks.join(", ")}. Он помогает честно показать загрузку, успех и ошибку.`
      : "Найден createAsyncThunk(). Он помогает честно показать загрузку, успех и ошибку.");
  }

  if (!output.length) {
    return {
      output: [],
      variables: {},
      error: "Пока учебный разбор Redux Toolkit понимает примеры со store, slice, reducers, dispatch, selector и async thunk.",
    };
  }

  if (sliceNames.length) variables.slices = sliceNames;
  if (reducerNames.length) variables.reducers = reducerNames;
  if (selectors.length) variables.selectors = selectors;
  if (storeNames.length) variables.stores = storeNames;
  if (thunks.length) variables.thunks = thunks;

  return { output, variables };
}
