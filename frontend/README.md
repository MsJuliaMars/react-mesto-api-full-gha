# mesto-react

**Figma**

- [Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
- [Обновленная ссылка на макет в Figma](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/JavaScript.-Sprint-12?node-id=4453%3A384&t=CJTJY45RvSMFawxD-0)

# Проект: Сдача проекта Mesto: регистрация и авторизация

## Результат работы на факультете "Веб-разработчик" Яндекс.Практикум

### Описание:

"mesto" - интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки. В нем использовались:

- флксбокс верстка и grid вестка
- позоционированние элементов
- продвинутая семантика языка HTML
- работа с DOM
- JavaScript
- методология БЭМ (с файловой структурой Nested БЭМ).
- обработка событий
- валидация форм
- установка локального сервера
- создание классов Card и FormValidator
- деструктуризация
- сборка проекта (Webpack)
- функциональные и классовые компоненты
- Webpack. Настройка обработки HTML, CSS, images, fonts Babel
- React: useState, useEffect, useHistory

_Технологии и функционал:_
Flexbox,Grid Layout, Positioning Elements, Animation and Transform using CSS, Iframe, BEM Methodology, File Structure and File Paths (Nested BEM), Git, JS, DOM, Webpack, React, useState, useRef, useEffect, объект контекста CurrentUserContext

В проекте была проделана работа:
1. Вся функциональность приложения доступна только авторизованным пользователям по роуту /, поэтому добавлены два дополнительных роута:
   /sign-up — для регистрации пользователя;
   /sign-in — для авторизации пользователя.
2. Добавлены новые компоненты
   **Login** — компонент авторизации пользователя с необходимыми стейт-переменными.
   **Register** — компонент регистрации пользователя с необходимыми стейт-переменными.
   **HOC ProtectedRoute** — этот компонент защищает роут /, чтобы на него не смогли перейти неавторизованные пользователи
   **InfoTooltip** — компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации.
3. Реализована работа с локальным хранилищем и токеном

### Инструкция по установке:

```
git clone https://github.com/msjuliamars/mesto-react.git
```

### _Возможня доработка проекта_

1. создание формы обратной связи

#### **Чеклист**

- [sprint-11](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-11.pdf)
- [sprint-12](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-12.pdf)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!