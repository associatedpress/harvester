import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { formReducer } from './reducers/form'
import { formMiddleware } from './middleware/feature/form'
import { apiMiddleware } from './middleware/core/api'
import { uiReducer } from './reducers/ui'
import { notificationsReducer } from './reducers/notification'
import { notificationMiddleware } from './middleware/core/notification'
import { actionSplitterMiddleware } from './middleware/core/actionSplitter'

const rootReducer = combineReducers({
  form: formReducer,
  ui: uiReducer,
  notification: notificationsReducer,
})

const featureMiddleware = [
  formMiddleware,
]

const coreMiddleware = [
  actionSplitterMiddleware,
  apiMiddleware,
  notificationMiddleware,
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(
  applyMiddleware(...featureMiddleware, ...coreMiddleware)
)
export default createStore(rootReducer, {}, enhancer)
