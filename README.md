[![Playwright tests in CI](https://github.com/yalosyash/calculator-ts-playwright/actions/workflows/playwright.yaml/badge.svg)](https://github.com/yalosyash/calculator-ts-playwright/actions/workflows/playwright.yaml)

# Функция строкового калькулятора

Функция принимает на вход выражение типа `string`, возвращая ответ типа `number`

Код функции покрыт 35-ю [тестами](https://github.com/yalosyash/calculator-ts-playwright/blob/main/tests/calculate.spec.ts) на 100% с использованием фреймворка [**Playwright**](https://playwright.dev/)

Переписан и расширен [предыдущий](https://github.com/yalosyash/calculator) строковый калькулятор с одним оператором

## Запуск тестов

1. Установить необходимые пакеты для запуска тестов командой `npm ci`
2. Запустить тесты  командой `npx playwright test`

## Пример работы функции:
```
calc("2,2 * (5 - (1 + 5.2) / 6,1)"); // 8.76393442622951
calc("(5.5 + 15.2) - 0,7"); // 20
calc("4 + 42 / 7"); // 10
calc("4 () + 42"); // Error: Скобки расставлены неверно!
calc("4 ( + 42"); // Error: Скобки расставлены неверно!
calc("fgj"); // Error: Некорректное значение!
```