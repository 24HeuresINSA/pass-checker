import { PASS_FETCH_REQUEST, PASS_RECEIVE, PASS_SEARCH_INPUT_CHANGE } from '../constants';
import {authLoginUserFailure} from "./auth";
import {checkHttpStatus, parseJSON} from "../utils/index";
import {SERVER_URL} from "../utils/config";
import {
    ACCESS_COMMENT_UPDATE_RECEIVE,
    ACCESS_COMMENT_UPDATE_REQUEST,
    ACCESS_CREATE_RECEIVE,
    ACCESS_CREATE_REQUEST, ACCESS_DELETE_RECEIVE, ACCESS_DELETE_REQUEST, ACCESS_FETCH_REQUEST,
    ACCESS_POINT_FETCH_REQUEST, ACCESS_POINT_RECEIVE, ACCESS_RECEIVE, PASS_CLOSE,
    PASS_SEARCH_INPUT_SELECT
} from "../constants/index";
import cookie from 'react-cookie';

export function passFetchRequest() {
  return {
    type: PASS_FETCH_REQUEST
  };
}

export function passReceive(data) {
  return {
    type: PASS_RECEIVE,
    payload: {
      data
    }
  };
}

export function accessPointFetchRequest() {
  return {
    type: ACCESS_POINT_FETCH_REQUEST
  };
}

export function accessPointReceive(data) {
  return {
    type: ACCESS_POINT_RECEIVE,
    payload: {
      data
    }
  };
}

export function passClose() {
  return {
    type: PASS_CLOSE
  };
}

export function passSearchInputChange(text) {
  return {
    type: PASS_SEARCH_INPUT_CHANGE,
    payload: {
      text
    }
  };
}

export function passSearchInputSelect(item) {
  return {
    type: PASS_SEARCH_INPUT_SELECT,
    payload: {
      item
    }
  };
}

export function passFetch(token) {
  return (dispatch, state) => {
    dispatch(passFetchRequest());
    return fetch(`${SERVER_URL}/api/v1/pass/`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(passReceive(response.pass));
      })
      .catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
          // Invalid authentication credentials
          return error.response.json().then((data) => {
            dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
            dispatch(push('/login'));
          });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
          // Server side error
          dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
        } else {
          // Most likely connection issues
          dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
        }

        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
      });
  };

}

export function accessPointFetch(token) {
  return (dispatch, state) => {
    dispatch(accessPointFetchRequest());
    return fetch(`${SERVER_URL}/api/v1/pass/access-points/`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(accessPointReceive(response.results));
      })
      .catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
          // Invalid authentication credentials
          return error.response.json().then((data) => {
            dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
            dispatch(push('/login'));
          });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
          // Server side error
          dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
        } else {
          // Most likely connection issues
          dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
        }

        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
      });
  };
}

export function accessFetchRequest() {
  return {
    type: ACCESS_FETCH_REQUEST
  };
}

export function accessReceive(data) {
  return {
    type: ACCESS_RECEIVE,
    payload: {
      data
    }
  };
}

export function accessFetch(token) {
  return (dispatch, state) => {
    dispatch(accessFetchRequest());
    return fetch(`${SERVER_URL}/api/v1/pass/accesses/`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(accessReceive(response.results));
      })
      .catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
          // Invalid authentication credentials
          return error.response.json().then((data) => {
            dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
            dispatch(push('/login'));
          });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
          // Server side error
          dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
        } else {
          // Most likely connection issues
          dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
        }

        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
      });
  };

}

export function accessCreateRequest() {
  return {
    type: ACCESS_CREATE_REQUEST
  };
}

export function accessCreateReceive(data) {
  return {
    type: ACCESS_CREATE_RECEIVE,
    payload: {
      data
    }
  };
}

export function accessCreate(token, accessType, accessPointName, numberplate) {
  return (dispatch, state) => {
    dispatch(accessCreateRequest());
    return fetch(`${SERVER_URL}/api/v1/pass/accesses/create/`, {
      method: 'POST',
      body: JSON.stringify({
        type: accessType,
        access_point: accessPointName,
        numberplate: numberplate
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.load('csrftoken'),
        Authorization: `Token ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(accessCreateReceive(response));
        dispatch(accessFetch(token));
      })
      .catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
          // Invalid authentication credentials
          return error.response.json().then((data) => {
            dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
            dispatch(push('/login'));
          });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
          // Server side error
          dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
        } else {
          // Most likely connection issues
          dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
        }

        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
      });
  };
}

export function accessCommentUpdateRequest() {
  return {
    type: ACCESS_COMMENT_UPDATE_REQUEST
  };
}

export function accessCommentUpdateReceive(data) {
  return {
    type: ACCESS_COMMENT_UPDATE_RECEIVE,
    payload: {
      data
    }
  };
}

export function accessCommentUpdate(token, access, comment) {
  return (dispatch, state) => {
    dispatch(accessCreateRequest());
    return fetch(`${SERVER_URL}/api/v1/pass/accesses/${access.id}/comment/`, {
      method: 'PATCH',
      body: JSON.stringify({
        comment
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.load('csrftoken'),
        Authorization: `Token ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(accessCommentUpdateReceive(response));
        dispatch(accessFetch(token));
      })
      .catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
          // Invalid authentication credentials
          return error.response.json().then((data) => {
            dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
            dispatch(push('/login'));
          });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
          // Server side error
          dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
        } else {
          // Most likely connection issues
          dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
        }

        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
      });
  };
}

export function accessDeleteRequest() {
  return {
    type: ACCESS_DELETE_REQUEST
  };
}

export function accessDeleteReceive(data) {
  return {
    type: ACCESS_DELETE_RECEIVE,
    payload: {
      data
    }
  };
}

export function accessDelete(token, access) {
  return (dispatch, state) => {
    dispatch(accessDeleteRequest());
    return fetch(`${SERVER_URL}/api/v1/pass/accesses/${access.id}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie.load('csrftoken'),
        Authorization: `Token ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((response) => {
        dispatch(accessDeleteReceive(response));
        dispatch(accessFetch(token));
      })
      .catch((error) => {
        if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
          // Invalid authentication credentials
          return error.response.json().then((data) => {
            dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
            dispatch(push('/login'));
          });
        } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
          // Server side error
          dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
        } else {
          // Most likely connection issues
          dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
        }

        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
      });
  };
}

