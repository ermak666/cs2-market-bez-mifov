import type { CourseData } from "./course-types";
type Stage = "junior" | "middle" | "senior" | "applied";
type Seed = { title: string; analogy: string; code: string; focus: string };
const seeds: Record<Stage, Seed[]> = {
  junior: [
    { title: "Переменные C#", analogy: "Переменная — подписанная коробка, где лежит число, текст или правда/ложь.", code: "int score = 0;", focus: "Тип подсказывает, какие данные хранит переменная." },
    { title: "Условия", analogy: "if — дорожная развилка для персонажа.", code: "if (score >= 10) { Debug.Log(\"Уровень\"); }", focus: "Условие выбирает понятный путь программы." },
    { title: "Метод", analogy: "Метод — маленькое умение предмета на сцене.", code: "void SayHello() { Debug.Log(\"Привет\"); }", focus: "Один метод делает одно понятное действие." },
    { title: "Класс", analogy: "Класс — чертёж игрушки, по которому создают похожие предметы.", code: "public class Coin { public int value = 1; }", focus: "Класс объединяет данные и действия объекта." },
    { title: "MonoBehaviour", analogy: "MonoBehaviour — карточка, которую Unity умеет прикрепить к предмету на сцене.", code: "public class Player : MonoBehaviour { }", focus: "Компонент MonoBehaviour живёт на GameObject и получает события Unity." },
    { title: "Start и Update", analogy: "Start — утренний звонок один раз, Update — спокойный ритм каждого кадра.", code: "void Start() { }\nvoid Update() { }", focus: "Не кладите тяжёлую работу в Update; используйте его осознанно." },
  ],
  middle: [
    { title: "GameObject и Component", analogy: "GameObject — актёр на сцене, Component — его умение: рисовать, двигаться, звучать.", code: "GetComponent<Rigidbody>()", focus: "Компоненты ищут и используют только при понятной необходимости." },
    { title: "Transform", analogy: "Transform — карточка позиции, поворота и размера предмета.", code: "transform.position = new Vector3(0, 1, 0);", focus: "Меняйте положение предсказуемо и не смешивайте физику с прямым Transform." },
    { title: "Prefab", analogy: "Prefab — формочка, по которой делают одинаковые игровые предметы.", code: "public GameObject coinPrefab;", focus: "Prefab помогает повторять объект без копирования настроек вручную." },
    { title: "События столкновения", analogy: "Collider — мягкая граница предмета: он сообщает, когда кто-то коснулся её.", code: "void OnTriggerEnter(Collider other) { }", focus: "Проверяйте нужный объект и не выполняйте опасные действия в ответ на столкновение." },
    { title: "UI", analogy: "UI — таблички игроку: счёт, цель и понятная кнопка.", code: "scoreText.text = score.ToString();", focus: "Интерфейс показывает состояние, а не хранит игровую логику." },
    { title: "ScriptableObject", analogy: "ScriptableObject — общая карточка настроек, не привязанная к одному актёру.", code: "public class GameConfig : ScriptableObject { }", focus: "Используйте для общих данных и настроек проекта." },
  ],
  senior: [
    { title: "Rigidbody и физика", analogy: "Rigidbody — тележка с правилами движения и массы.", code: "rb.AddForce(Vector3.forward * force);", focus: "Для физического движения используйте Rigidbody и FixedUpdate при необходимости." },
    { title: "Разделение ответственности", analogy: "У каждого помощника в театре одна роль: движение, здоровье или UI.", code: "public class Health : MonoBehaviour { }", focus: "Небольшие компоненты проще читать, тестировать и менять." },
    { title: "Состояния игры", analogy: "Состояние игры — табличка: играем, пауза, победа или конец.", code: "enum GameState { Playing, Paused, Won, Lost }", focus: "Явные состояния предотвращают противоречивое поведение." },
    { title: "Событие C#", analogy: "Событие — звонок: один объект сообщает, другие слушают при желании.", code: "public event Action<int> ScoreChanged;", focus: "События уменьшают жёсткую связанность компонентов." },
    { title: "Object pooling", analogy: "Пул объектов — коробка готовых мячиков, чтобы не лепить новый каждый раз.", code: "Queue<GameObject> pool = new();", focus: "Пул полезен при частом появлении однотипных объектов." },
    { title: "Отладка", analogy: "Debug.Log — фонарик: подсвечивает путь, но не должен засорять финальную сцену.", code: "Debug.Log($\"Score: {score}\");", focus: "Логи делайте понятными и убирайте лишние перед выпуском." },
  ],
  applied: [
    { title: "Проект: сбор монет", analogy: "Игрок ходит по маленькой сцене и собирает добрые монеты.", code: "public class Coin : MonoBehaviour { public int value = 1; }", focus: "Начните с понятной модели монеты и счёта." },
    { title: "Проект: движение", analogy: "Движение — одна роль игрока, без смешения со счётом и меню.", code: "rb.AddForce(input * speed);", focus: "Отделите ввод, движение и физику." },
    { title: "Проект: счёт", analogy: "Счёт — табличка состояния, которую UI только показывает.", code: "public event Action<int> ScoreChanged;", focus: "Пусть сбор монеты отправляет событие, а UI слушает его." },
    { title: "Проект: состояние", analogy: "Победа и пауза — разные таблички для всей сцены.", code: "GameState state = GameState.Playing;", focus: "Состояние игры делает переходы предсказуемыми." },
    { title: "Проект: настройки", analogy: "Конфигурация уровня — отдельная карточка, а не спрятанные числа в коде.", code: "[CreateAssetMenu] public class LevelConfig : ScriptableObject { }", focus: "Храните настраиваемые данные отдельно от логики." },
    { title: "Проект: README", analogy: "README — карта сцены: объекты, компоненты, управление и проверка.", code: "цель → сцена → компоненты → проверка", focus: "Опишите, как открыть сцену и проверить основные действия." },
  ],
};
const titles: Record<Stage, string> = { junior: "Том I · Junior: C# и Unity-сцена", middle: "Том II · Middle: компоненты и интерфейс", senior: "Том III · Senior: архитектура и производительность", applied: "Том IV · Игровые проекты" };
const body = (seed: Seed) => `Цель. Понять тему «${seed.title}».\n\nАналогия. ${seed.analogy}\n\n### Пример\n\n\`\`\`csharp\n${seed.code}\n\`\`\`\n\n### Разбор\n\n${seed.focus}\n\n### Практика\n\n#### Задача 1\nОбъясните этот C#/Unity-фрагмент своими словами.\n\nПодсказка. Найдите данные, компонент, событие или игровой шаг.\n\nРазбор решения. ${seed.focus}\n\n#### Задача 2\nНазовите безопасный граничный случай.\n\nПодсказка. Подумайте об отсутствующем компоненте, пустой сцене или состоянии паузы.\n\nРазбор решения. ${seed.analogy}\n\n#### Задача 3\nНапишите короткий похожий пример.\n\nПодсказка. Дайте классу одну роль и понятное имя.\n\nРазбор решения. Игровой код легче поддерживать, когда компоненты маленькие и явно связаны состоянием.`;
export const csharpUnityCourseContent: CourseData = { volumes: (Object.keys(seeds) as Stage[]).map((stage, stageIndex) => ({ id: stage, title: titles[stage], lessons: seeds[stage].map((seed, index) => ({ id: `csharp-unity-${stage}-${stageIndex * 6 + index + 1}`, number: stageIndex * 6 + index + 1, title: seed.title, goal: `Понять тему «${seed.title}».`, analogy: seed.analogy, code: seed.code, body: body(seed) })) })) };
