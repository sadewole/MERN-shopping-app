import axios from 'axios'
import {
  GET_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  ITEMS_LOADING
} from '../actions/types';
import {
  returnErrors
} from './errorAction';
import {
  tokenConfig
} from './authAction';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading())
  axios.get('/api/v1/item')
    .then(res => dispatch({
      type: GET_ITEMS,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.status, err.response.data)))
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post('/api/v1/item', item, tokenConfig(getState))
    .then(res => dispatch({
      type: ADD_ITEM,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.status, err.response.data)))
};

export const deleteItem = id => (dispatch, getState) => {
  axios.delete(`/api/v1/item/${id}`, tokenConfig(getState))
    .then(res => dispatch({
      type: DELETE_ITEM,
      payload: id
    }))
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};