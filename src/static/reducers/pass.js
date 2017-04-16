import {createReducer} from "../utils/index";
import {
  ACCESS_POINT_FETCH_REQUEST,
  ACCESS_POINT_RECEIVE, PASS_FETCH_REQUEST, PASS_RECEIVE, PASS_SEARCH_INPUT_CHANGE,
  PASS_SEARCH_INPUT_SELECT
} from "../constants/index";

const initialState = {
  searchText: "",
  isFetching: false,
  isFetchingAccessPoints: false,
  accessPoints: [],
  data: [],
  selectedPass: null
};

function numberplate_normalizer(match, p1, p2, p3, offset, string) {
  return [p1.toUpperCase(), p2.toUpperCase(), p3.toUpperCase()].join('-');
}

export default createReducer(initialState, {
  [PASS_RECEIVE]: (state, payload) => {
    return Object.assign({}, state, {
      data: payload.data,
      isFetching: false
    });
  },
  [PASS_FETCH_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  [ACCESS_POINT_RECEIVE]: (state, payload) => {
    return Object.assign({}, state, {
      accessPoints: payload.data,
      isFetchingAccessPoints: false
    });
  },
  [ACCESS_POINT_FETCH_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetchingAccessPoints: true
    });
  },
  [PASS_SEARCH_INPUT_CHANGE]: (state, payload) => {
    let re = /^[ ]*([A-Z]{1,2}|[0-9]{1,4})[ -]*([0-9]{1,3}|[A-Z]{1,3})[ -]*([A-Z]{1,2}|[0-9]{1,2})[ ]*$/
    return state.data.map((pass, index) => {
      let normalized_numberplate = pass.vehicle.numberplate.replace(re, numberplate_normalizer);
      console.log(normalized_numberplate);
      if (index === 0) {
        return Object.assign({}, state, {
          selectedPass: pass,
          searchText: payload.text
        });
      }
      return pass
    })[0]
  },
  [PASS_SEARCH_INPUT_SELECT]: (state, payload) => {
    return Object.assign({}, state, {
      selectedPass: payload.item,
      searchText: payload.item.vehicle.numberplate
    });
  }
});
