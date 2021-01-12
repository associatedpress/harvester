export const actionSplitterMiddleware = () => (next) => (action) => {
  if (Array.isArray(action)) {
    action.forEach(_action => next(_action))
  } else {
    next(action);
  }
};