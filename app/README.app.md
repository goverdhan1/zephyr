# App
App initializes zephyr web application, it is root of the application.
Angular2 with Redux is used as front-end framework.

## App Directory structure

- actions
- middleware
- mocks (will be removed)
- models
- reducers
- services
- store
- utils
- view
- bootstrap/hot_loader_bootstrap.ts
- index.html - Homepage

### actions
- Contains the redux action files that defines actions
- Action calls service to get data using a thunk middleware
- @Input: parameters
- @Output: action type and data fetched from service

### middleware
- Redux middleware will let actions perform asynchronous operations (API calls)

### models
- Representation of API data
- Validation on data

### reducers
- Redux rootReducers combine all the reducers defined for the application
- They should be **pure function**
- @Input: state and action (type and data)
- @Output: state

### services
- Contains all angular2 services
- Performs REST operations
- @Input: parameters
- @Output: Observable/Promise with data

### store
- Contains ZephyrStore that creates a Redux store
- @Input: Root reducer, initial state and middlewares
- @Output: dispatch, subscribe and getState functions

### utils
- Contains utility operations of the app like constants, i18n messages

### view
- This is where the HTML and everything releated to it resides
- Contains assets (images, icons, fonts, public css),
- Components (angular 2 components),
- Directives
- layouts

### bootstrap/hot_loader.bootstrap.ts
- Root component that is used to bootstrap angular
