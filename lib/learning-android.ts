import type { Value } from "./learning-python";
export interface LearningAndroidResult { output: string[]; variables: Record<string, Value>; error?: string }
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:startActivity|requestPermissions|ActivityResultContracts|Intent\s*\(|openFileInput|openFileOutput|java\.net|Socket\s*\()/, "Запуск Activity, запрос разрешений, доступ к файлам и сети в учебном Android-разборе отключены."],
  [/\b(?:password|token|secret|api[_-]?key)\s*=/i, "Секреты нельзя помещать в Android-учебный пример."],
  [/\b(?:Runtime\.getRuntime|ProcessBuilder|exec)\b/, "Выполнение процессов в учебном Android-разборе отключено."],
];
export function analyzeLearningAndroid(code: string): LearningAndroidResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте маленький пример @Composable, состояния, ViewModel, навигации, списка или разрешения." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = []; const variables: Record<string, Value> = {};
  const names = Array.from(code.matchAll(/\b(?:fun|class|object|composable)\s+([A-Za-z_]\w*)/g)).map((match) => match[1]).slice(0, 6);
  if (/@Composable\b/.test(code)) output.push("Найден @Composable. Это функция, которая описывает часть интерфейса Compose.");
  if (/\b(?:Text|Button|TextField|Card|Scaffold)\s*\(/.test(code)) output.push("Найден Material/Compose-элемент. У него должна быть понятная подпись и доступное действие.");
  if (/\bModifier\./.test(code)) output.push("Найден Modifier. Он последовательно описывает размер, отступ или поведение элемента.");
  if (/\b(?:Column|Row|Box|LazyColumn|LazyRow)\s*\{?/.test(code)) output.push("Найдена Compose-раскладка или список. Для длинных данных подходит LazyColumn/LazyRow.");
  if (/\b(?:remember|mutableStateOf|mutableIntStateOf|StateFlow|collectAsState)\b/.test(code)) output.push("Найдено состояние. Экран должен показывать UI как результат текущего состояния.");
  if (/\bViewModel\b|viewModel\s*\(/.test(code)) output.push("Найдена ViewModel. Она хранит состояние экрана и не должна держать Activity или View.");
  if (/\b(?:NavHost|navController\.navigate|composable\s*\()/i.test(code)) output.push("Найдена навигация. Передавайте в маршрут только нужный идентификатор и обрабатывайте его отсутствие.");
  if (/\b(?:LaunchedEffect|DisposableEffect|SideEffect)\b/.test(code)) output.push("Найден Compose effect. Используйте его только для контролируемой реакции на изменение ключа.");
  if (/\b(?:viewModelScope|launch|suspend)\b/.test(code)) output.push("Найдена coroutine-конструкция. Учебный разбор объясняет форму кода и ничего не запускает в фоне.");
  if (/\b(?:permission|Permission)\b/.test(code)) output.push("Найдена тема разрешений. Запрашивайте минимум прав, объясняйте причину и имейте сценарий отказа.");
  if (names.length) variables.names = names;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный Android-разбор понимает @Composable, Material-элементы, Modifier, Column/Row/LazyColumn, состояние, ViewModel, навигацию, effect, coroutine и разрешения." };
  return { output, variables };
}
