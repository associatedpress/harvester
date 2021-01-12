import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { formReducer } from './reducers/form'
import { schemaMiddleware, validateMiddleware } from './middleware/feature/form'
import { apiMiddleware } from './middleware/core/api'
import { uiReducer } from './reducers/ui'
import { notificationsReducer } from './reducers/notification'
import { notificationMiddleware } from './middleware/core/notification'
import { loggerMiddleware } from './middleware/core/logger'
import { actionSplitterMiddleware } from './middleware/core/actionSplitter'

const rootReducer = combineReducers({
  form: formReducer,
  ui: uiReducer,
  notification: notificationsReducer,
})

const featureMiddleware = [
  schemaMiddleware,
  validateMiddleware,
]

const coreMiddleware = [
  actionSplitterMiddleware,
  apiMiddleware,
  notificationMiddleware,
  loggerMiddleware,
]

const enhancer = applyMiddleware(...featureMiddleware, ...coreMiddleware)
export default const store = createStore(rootReducer, {}, enhancer)
