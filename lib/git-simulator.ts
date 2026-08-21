export type GitSimulationResult = {
  output: string[];
  error?: string;
};

const unsupported = "Эта команда не запускается на устройстве. Учебный симулятор поддерживает только безопасные шаги Git и не обращается к файлам, сети или вашему аккаунту GitHub.";

export function runGitSimulation(command: string): GitSimulationResult {
  const input = command.trim();
  if (input === "git status") return { output: ["На ветке main", "Рабочая папка чистая: нет незаписанных изменений."] };
  if (input.startsWith("git config --global user.name")) return { output: ["Имя автора сохранено в учебном профиле Git."] };
  if (input === "git init") return { output: ["Инициализирован пустой учебный репозиторий Git.", "Создана ветка main."] };
  if (input.startsWith("git add ")) return { output: [`Файл добавлен в staging: ${input.slice("git add ".length)}`, "Следующий безопасный шаг — создать коммит."] };
  if (input.startsWith("git commit -m ")) return { output: ["[main 7ac31d2] Создан учебный коммит.", "Изменения сохранены в локальной истории."] };
  if (input === "git log --oneline") return { output: ["7ac31d2 docs: добавить README", "1f3b9d0 chore: создать репозиторий"] };
  if (input.startsWith("git switch -c ")) return { output: [`Создана и открыта ветка ${input.slice("git switch -c ".length)}.`] };
  if (input.startsWith("git switch ")) return { output: [`Переключение на ветку ${input.slice("git switch ".length)} выполнено в симуляторе.`] };
  if (input.startsWith("git merge ")) return { output: [`Ветка ${input.slice("git merge ".length)} безопасно слита в текущую учебную ветку.`] };
  if (input === "git remote -v") return { output: ["origin  https://github.com/example/learning-repo.git (fetch)", "origin  https://github.com/example/learning-repo.git (push)"] };
  if (input.startsWith("git push origin ")) return { output: [`Учебная ветка ${input.slice("git push origin ".length)} подготовлена к публикации. Настоящая сеть не используется.`] };
  if (input === "git fetch origin") return { output: ["Получены сведения об удалённых ветках в учебном примере. Слияние не выполнялось."] };
  if (input.startsWith("git diff ")) return { output: ["Сравнение учебных веток: добавлена карточка профиля, изменён README."] };
  if (input.startsWith("git tag ")) return { output: [`Создан учебный тег ${input.slice("git tag ".length)} для текущего коммита.`] };
  if (input.startsWith("echo .env >> .gitignore")) return { output: ["Строка .env добавлена в учебный .gitignore.", "Важно: уже отслеживаемый секрет нужно удалить из истории отдельно."] };
  return { output: [], error: unsupported };
}
