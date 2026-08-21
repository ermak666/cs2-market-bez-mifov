# Ориентиры предметной программы Node.js

Курс объясняет Node.js как среду JavaScript вне браузера с неблокирующими асинхронными операциями ввода-вывода. Он включает базовый HTTP, модули, Promise, `async/await`, event loop, тесты и практики безопасности зависимостей.

| Тема курса | Учебный вывод |
|---|---|
| Асинхронность | Не блокировать обработчик; отделять ожидание I/O от понятной логики. |
| HTTP | Проверять метод и вход, возвращать ясный статус, не показывать внутренние детали ошибки. |
| Пакеты | Проверять имя, фиксировать версии и lockfile; не доверять скриптам зависимостей автоматически. |
| Безопасность | Не хранить секреты в коде; не запускать инспектор в production; проверять входные данные. |
| Тесты | Писать небольшие unit-тесты, разделять окружения и не усложнять setup без необходимости. |

## Источники

1. [Node.js: Introduction to Node.js](https://nodejs.org/learn/getting-started/introduction-to-nodejs)
2. [Node.js: Security Best Practices](https://nodejs.org/learn/getting-started/security-best-practices)
3. [Node.js: Using Node.js's test runner](https://nodejs.org/learn/test-runner/using-test-runner)
