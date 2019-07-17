import axios from 'axios'
import {
  GET_ITEMS,
  DELETE_ITEM,
  ADD_ITEM,
  ITEMS_LOADING
} from '../actions/types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading())
  axios.get('/api/v1')
    .then(res => dispatch({
      type: GET_ITEMS,
      payload: res.data
    }))
};

export const addItem = item => dispatch => {
  axios
    .post('/api/v1', item)
    .then(res => dispatch({
      type: ADD_ITEM,
      payload: res.data
    }))
};

export const deleteItem = id => dispatch => {
  axios.delete(`/api/v1/${id}`).then(res => dispatch({
    type: DELETE_ITEM,
    payload: id
  }))
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};