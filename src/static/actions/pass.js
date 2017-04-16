import { PASS_FETCH_REQUEST, PASS_RECEIVE, PASS_SEARCH_INPUT_CHANGE } from '../constants';
import {authLoginUserFailure} from "./auth";
import {checkHttpStatus, parseJSON} from "../utils/index";
import {SERVER_URL} from "../utils/config";
import {PASS_SEARCH_INPUT_SELECT} from "../constants/index";

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

export function passSearchInputChange(text) {
  return {
    type: PASS_SEARCH_INPUT_CHANGE,
    payload: {
      text
    }
  }
}

export function passSearchInputSelect(item) {
  return {
    type: PASS_SEARCH_INPUT_SELECT,
    payload: {
      item
    }
  }
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