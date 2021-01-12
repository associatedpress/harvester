import {API_REQUEST, apiError, apiSuccess} from "../../actions/api";

export const apiMiddleware = ({dispatch}) => (next) => (action) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const {body, url, method, feature} = action.meta;

    fetch(url, {body, method})
      .then(response => response.json())
      .then(response => dispatch(apiSuccess({response, feature})))
      .catch(error => dispatch(apiError({error: error, feature})))
  }
};
