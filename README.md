# Stellar Burger

Учебный проект на React + TypeScript: конструктор бургеров с маршрутизацией, авторизацией, защищенными маршрутами, лентой заказов и тестами.

## Деплой

- Ссылка на приложение: [https://zipri.github.io/react-burger/](https://zipri.github.io/react-burger/)

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

## Реализовано (Sprint 5-6)

- Маршруты:
  - `/`
  - `/feed`
  - `/feed/:id`
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/reset-password`
  - `/profile`
  - `/profile/orders`
  - `/profile/orders/:id`
  - `/ingredients/:id`
  - `*` (страница 404)
- Экран ленты заказов и экран истории заказов с WebSocket-обновлением
- Модальные окна ингредиента и заказа с поддержкой роутинга
- Авторизация и защищенные маршруты (`ProtectedRoute`)
- Создание заказа только для авторизованного пользователя
- Обновление токенов при `401` и повтор исходного запроса
- Unit-тесты редьюсеров всех слайсов
- Playwright e2e-тесты страницы конструктора
- Мокирование API в e2e через HAR (`e2e/fixtures/stellar-api.har`)

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
