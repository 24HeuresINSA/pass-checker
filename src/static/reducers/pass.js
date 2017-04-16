import {createReducer} from "../utils/index";
import {
  ACCESS_COMMENT_UPDATE_RECEIVE, ACCESS_COMMENT_UPDATE_REQUEST,
  ACCESS_CREATE_RECEIVE,
  ACCESS_CREATE_REQUEST, ACCESS_FETCH_REQUEST,
  ACCESS_POINT_FETCH_REQUEST,
  ACCESS_POINT_RECEIVE, ACCESS_RECEIVE, PASS_CLOSE, PASS_FETCH_REQUEST, PASS_RECEIVE, PASS_SEARCH_INPUT_CHANGE,
  PASS_SEARCH_INPUT_SELECT
} from "../constants/index";

const initialState = {
  searchText: '',

  isFetching: false,
  isFetchingAccesses: false,
  isFetchingAccessPoints: false,
  isSavingAccess: false,
  isCommentUpdated: false,

  data: [],
  accessPoints: [],
  filteredPass: [],
  accesses: [],

  selectedPass: null,
  createdAccess: null
};

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
  [PASS_CLOSE]: (state, payload) => {
    return Object.assign({}, state, {
      selectedPass: null,
      searchText: '',
      filteredPass: [],
      createdAccess: null
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
    let searchText = payload.text.toUpperCase();
    let filteredPass = state.data.filter((item) =>
      item.vehicle.numberplate.toUpperCase().startsWith(searchText)
    );

    return Object.assign({}, state, {
      filteredPass,
      searchText: payload.text
    })
  },
  [PASS_SEARCH_INPUT_SELECT]: (state, payload) => {
    return Object.assign({}, state, {
      selectedPass: payload.item,
      searchText: payload.item.vehicle.numberplate,
      createdAccess: null
    });
  },
  [ACCESS_FETCH_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetchingAccesses: true
    });
  },
  [ACCESS_RECEIVE]: (state, payload) => {
    return Object.assign({}, state, {
      isFetchingAccesses: false,
      accesses: payload.data
    });
  },
  [ACCESS_CREATE_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isSavingAccess: true
    });
  },
  [ACCESS_CREATE_RECEIVE]: (state, payload) => {
    return Object.assign({}, state, {
      isSavingAccess: false,
      createdAccess: payload.data
    });
  },
  [ACCESS_COMMENT_UPDATE_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isCommentUpdated: false
    });
  },
  [ACCESS_COMMENT_UPDATE_RECEIVE]: (state, payload) => {
    return Object.assign({}, state, {
      createdAccess: payload.data,
      isCommentUpdated: true
    });
  }
});
