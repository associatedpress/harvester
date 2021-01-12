export const loggerMiddleware = ({getState}) => (next) => (action) => {
  const {REACT_APP_ENV} = process.env;

  if (REACT_APP_ENV === 'development') {

    console.group(`${action.type}`);
    console.log(action.payload, action.meta);

    console.group('CURRENT STATE:');
    console.log(getState());
    console.groupEnd();

    next(action);

    console.group('NEXT STATE: ');
    console.log(getState());
    console.groupEnd();

    console.groupEnd();
  } else {
    next(action);
  }
};
