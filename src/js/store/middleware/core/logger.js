const { NODE_ENV } = process.env

export const loggerMiddleware = ({ getState }) => next => action => {
  if (NODE_ENV === 'development') {
    console.group(`${action.type}`)
    console.log(action.payload, action.meta)

    console.group('CURRENT STATE:')
    console.log(getState())
    console.groupEnd()

    next(action)

    console.group('NEXT STATE: ')
    console.log(getState())
    console.groupEnd()

    console.groupEnd()
  } else {
    next(action)
  }
}
