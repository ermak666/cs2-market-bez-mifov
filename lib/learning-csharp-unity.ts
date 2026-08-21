import type { Value } from "./learning-python";
export interface LearningCSharpUnityResult { output: string[]; variables: Record<string, Value>; error?: string }
const FORBIDDEN: Array<[RegExp, string]> = [
  [/\b(?:Application\.OpenURL|File\.|Directory\.|System\.Net|WebClient|HttpClient|Process\.Start|System\.Diagnostics)\b/, "Доступ к сети, файлам и процессам в учебном разборе C#/Unity отключён."],
  [/\b(?:PlayerPrefs\.Set|Resources\.Load|SceneManager\.LoadScene|Instantiate|Destroy)\s*\(/, "Изменение сцены, сохранений и объектов в учебной песочнице не выполняется; доступен только разбор примера."],
  [/\b(?:password|token|secret|api[_-]?key)\s*=/i, "Секреты нельзя помещать в C#/Unity-учебный пример."],
];
export function analyzeLearningCSharpUnity(code: string): LearningCSharpUnityResult {
  if (!code.trim()) return { output: [], variables: {}, error: "Сначала добавьте небольшой пример C#-класса, MonoBehaviour, Start, Update, компонента, Rigidbody или события." };
  for (const [pattern, message] of FORBIDDEN) if (pattern.test(code)) return { output: [], variables: {}, error: message };
  const output: string[] = []; const variables: Record<string, Value> = {};
  const names = Array.from(code.matchAll(/\b(?:class|void|public|private)\s+([A-Za-z_]\w*)/g)).map((match) => match[1]).slice(0, 6);
  if (/\b(?:int|float|string|bool)\s+\w+/.test(code)) output.push("Найдены C#-данные. Тип помогает понять, что хранит переменная.");
  if (/\bclass\s+\w+/.test(code)) output.push("Найден C#-класс. Пусть у него будет одна понятная роль.");
  if (/\bMonoBehaviour\b/.test(code)) output.push("Найден MonoBehaviour. Такой скрипт Unity можно прикрепить к GameObject.");
  if (/\bStart\s*\(\)/.test(code)) output.push("Найден Start. Он вызывается один раз при запуске компонента.");
  if (/\bUpdate\s*\(\)/.test(code)) output.push("Найден Update. Он вызывается каждый кадр, поэтому не должен содержать тяжёлую работу.");
  if (/\b(?:GameObject|GetComponent|Transform|transform\.)\b/.test(code)) output.push("Найден GameObject, Transform или компонент. Проверяйте, что нужный компонент действительно есть.");
  if (/\b(?:Rigidbody|AddForce|FixedUpdate)\b/.test(code)) output.push("Найдена тема физики. Для физического движения используйте Rigidbody и отделяйте его от UI.");
  if (/\b(?:OnTriggerEnter|OnCollisionEnter|Collider)\b/.test(code)) output.push("Найдено событие столкновения. Проверяйте, какой объект вошёл в область, и делайте маленькое понятное действие.");
  if (/\b(?:event|Action<|UnityEvent)\b/.test(code)) output.push("Найдено событие. Оно позволяет компонентам сообщать об изменении без жёсткой связи.");
  if (/\b(?:ScriptableObject|CreateAssetMenu)\b/.test(code)) output.push("Найден ScriptableObject. Он подходит для общих настроек и данных проекта.");
  if (/\b(?:Debug\.Log|Debug\.Warning)\b/.test(code)) output.push("Найдена отладочная запись. Логи должны объяснять состояние и не содержать секретов.");
  if (names.length) variables.names = names;
  if (!output.length) return { output: [], variables: {}, error: "Пока учебный разбор C#/Unity понимает типы, классы, MonoBehaviour, Start, Update, GameObject, компоненты, Rigidbody, столкновения, события, ScriptableObject и Debug.Log." };
  return { output, variables };
}
