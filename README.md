# Stellar Burger

Учебный проект на React + TypeScript: конструктор бургеров с маршрутизацией, авторизацией, защищенными маршрутами и модальными окнами.

## Технологии

- React
- TypeScript
- Redux Toolkit
- React Router (`createBrowserRouter` + `RouterProvider`)
- React DnD
- SCSS Modules
- Vite

## Запуск

Установить зависимости:

```bash
npm install
```

Запустить проект в dev-режиме:

```bash
npm run dev
```

Собрать production-версию:

```bash
npm run build
```

Предпросмотр production-сборки:

```bash
npm run preview
```

## Скрипты

- `npm run dev` - запуск dev-сервера
- `npm run build` - сборка проекта
- `npm run preview` - предпросмотр сборки
- `npm run lint` - `stylelint` + `eslint` + `prettier`
- `npm run eslint` - проверка и автоисправления JS/TS
- `npm run stylelint` - проверка и автоисправления стилей
- `npm run prettier` - форматирование файлов
- `npm run test` - unit-тесты (Vitest)
- `npm run e2e` - e2e-тесты (Playwright)
- `npm run commit` - создание commit через Commitizen

## Реализовано в Sprint 3

- Маршруты:
  - `/`
  - `/feed`
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/reset-password`
  - `/profile`
  - `/profile/orders`
  - `/ingredients/:id`
  - `*` (страница 404)
- Вложенные маршруты профиля через `<Outlet />`
- Открытие ингредиента:
  - модальное окно при переходе с главной страницы
  - отдельная страница при прямом переходе по URL
- Авторизация и регистрация
- Выход из аккаунта
- Получение и обновление профиля пользователя
- Восстановление и сброс пароля
- Защищенные маршруты (`ProtectedRoute`)
- Перенаправление на исходный защищенный маршрут после логина
- Заказ только для авторизованного пользователя
- Обновление токенов при `401` и повтор исходного запроса

## Структура проекта

```text
src/
  api/
    base/
    ingredients/
    orders/
    auth/
  components/
    app/
    app-header/
    burger-constructor/
    burger-ingredients/
    modal/
    modal-overlay/
    modals/
    protected-route/
    common/
  pages/
    home/
    login/
    register/
    forgot-password/
    reset-password/
    profile/
    profile-main/
    profile-orders/
    feed/
    ingredient-details/
    not-found/
    error/
  services/
    auth/
    constructor/
    ingredient-details/
    ingredients/
    order/
    router/
    common/
    store.ts
    root-reducer.ts
  utils/
    auth-storage.ts
    hooks/
```

## API

Базовый URL API:

`https://new-stellarburgers.education-services.ru/api`

Используемые группы запросов:

- ингредиенты
- заказы
- auth (`register`, `login`, `logout`, `token`)
- профиль пользователя (`/auth/user`)
- восстановление пароля (`/password-reset`, `/password-reset/reset`)

## Алиасы импортов

Основные алиасы:

- `@/*` -> `src/*`
- `@api/*` -> `src/api/*`
- `@components/*` -> `src/components/*`
- `@pages/*` -> `src/pages/*`
- `@services/*` -> `src/services/*`
- `@utils/*` -> `src/utils/*`
- `@styles/*` -> `src/styles/*`

## Проверки перед сдачей

1. `npm run lint`
2. `npm run build`
3. Проверить запуск приложения без ошибок (`npm run dev`)
4. Проверить маршруты и сценарии авторизации
5. Создать pull request из `sprint3` в `main`
