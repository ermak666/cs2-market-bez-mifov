# Ориентиры предметной программы PowerShell для веб-разработчика

Курс объясняет PowerShell как кроссплатформенную оболочку, язык сценариев и платформу автоматизации. В отличие от текстовых оболочек он передаёт по pipeline .NET-объекты, а не только текст.

| Тема курса | Учебный вывод |
|---|---|
| Объекты и pipeline | Сначала узнать тип/свойства объекта, затем фильтровать как можно раньше и передавать только нужное. |
| Скрипты и модули | Разделять маленькие функции, параметры и повторно используемые модули. |
| REST | Понимать структуру `Invoke-RestMethod`, метод, заголовки, тело, статус и таймаут — без реальных запросов в учебной песочнице. |
| Безопасность | Не помещать токены в код и не отключать защитные механизмы ради запуска неизвестного сценария. |
| Execution policy | Это помощь от случайного запуска, а не абсолютная граница безопасности; сначала читать и проверять код сценария. |

## Источники

1. [Microsoft Learn: What is PowerShell?](https://learn.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.6)
2. [Microsoft Learn: One-Liners and the pipeline](https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/04-pipelines?view=powershell-7.6)
3. [Microsoft Learn: Invoke-RestMethod](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7.6)
4. [Microsoft Learn: about_Execution_Policies](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.6)
