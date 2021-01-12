import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { schemaReducer } from './reducers/schema'
import { schemaMiddleware } from './middleware/feature/schema'
import { fieldReducer } from './reducers/field'
import { fieldMiddleware } from './middleware/feature/field'
import { apiMiddleware } from './middleware/core/api'
import { uiReducer } from './reducers/ui'
import { notificationsReducer } from './reducers/notification'
import { notificationMiddleware } from './middleware/core/notification'
import { loggerMiddleware } from './middleware/core/logger'
import { actionSplitterMiddleware } from './middleware/core/actionSplitter'

const rootReducer = combineReducers({
  schema: schemaReducer,
  fields: fieldReducer,
  ui: uiReducer,
  notification: notificationsReducer,
})

const featureMiddleware = [
  schemaMiddleware,
  fieldMiddleware,
]

const coreMiddleware = [
  actionSplitterMiddleware,
  apiMiddleware,
  notificationMiddleware,
  loggerMiddleware,
]

const enhancer = applyMiddleware(...featureMiddleware, ...coreMiddleware)
export default const store = createStore(rootReducer, {}, enhancer)
