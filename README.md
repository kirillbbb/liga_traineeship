## Структура проекта

```text
src
├── api                          # сетевой слой и работа с бэкендом
│   ├── axiosBase.ts             # базовый экземпляр Axios с настройками
│   ├── tasksActions.ts          # все createAsyncThunk (fetch, create, update, delete)
│   └── tasksApi.ts              # типы запросов, интерфейсы, вспомогательные функции
│
├── app
│   └── integration              # бизнес-логика и фичи приложения
│       ├── taskAdd              # фича: добавление задачи
│       │   ├── components
│       │   │   └── TaskForm.tsx # форма создания
│       │   └── TaskAdd.tsx      # контейнер с кнопкой и логикой открытия формы
│       │
│       └── taskList             # фича: отображение списка задач
│           ├── components
│           │   ├── TaskFilters.tsx  # поиск + фильтры
│           │   ├── TaskItem.tsx     # одна задача в списке
│           │   └── TaskList.tsx     # компонент списка (рендерит TaskItem)
│           └── TaskList.tsx
│
├── components                   # переиспользуемые UI-компоненты (без бизнес-логики)
│   ├── Button
│   ├── Checkbox                 # с Checkbox.tsx + Checkbox.types.ts
│   ├── Loader
│   ├── Modal                    # портал + блокировка скролла
│   ├── PageContainer
│   ├── SearchInput
│   ├── TextField
│   └── index.ts                 # баррель-экспорты
│
├── hooks
│   └── reduxHooks.ts            # типизированные useAppDispatch / useAppSelector
│
├── pages                        # страницы приложения (роутинг)
│   ├── TaskListPage.tsx         # главная страница — список задач + фильтры + добавление
│   └── TaskEditPage.tsx         # редактирование задачи в модальном окне
│
├── styles
│   ├── modules                  # SCSS-модули
│   │   ├── _variables.scss
│   │   ├── _buttons.scss
│   │   ├── _fields.scss
│   │   ├── _modal.scss
│   │   ├── _task-item.scss
│   │   └── ...
│   └── main.scss                # главный файл стилей (импорт всех модулей)
│
├── types
│   ├── generated.d.ts           # автосгенерированные типы из OpenAPI
│   └── task.ts                  # основные интерфейсы (Task, TaskFormValues и т.д.)
│
├── utils                        # вспомогательные утилиты (пока пусто)
├── App.tsx                      # роутинг (React Router v6)
├── index.tsx                    # точка входа, Provider + рендер
├── index.html
├── theme.ts                     # MUI-тема (используется минимально)
├── react-app-env.d.ts
├── openapi-spec.json            # спецификация бэкенда
├── package.json
├── tsconfig.json
├── webpack.config.js
├── .eslintrc.js
├── .prettierrc
└── README.md

 Стек и архитектура

- Управление состоянием: Redux Toolkit (createAsyncThunk + slices)
- Сетевой слой: Axios + собственная обертка
- Формы: React Hook Form + Controller
- Валидация: Yup (схема вынесена отдельно)
- Роутинг: React Router v6
- Стили: SCSS-модули + БЭМ-подобные классы
- Типизация API: openapi-typescript (автогенерация из OpenAPI-спецификации)

Архитектура: feature-sliced design
  api              → сетевые запросы и thunks
  app/integration  → фичи (taskAdd, taskList)
  components       → переиспользуемые UI-компоненты
  pages            → страницы приложения
  hooks, types, styles → отдельные слои

Дополнительно реализовано:
  • кастомные middleware (логирование и отладка)
  • мемоизация через React.memo
  • состояния loading / error с индикацией в UI
