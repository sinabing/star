import fetch from 'isomorphic-fetch';
import chalk from 'chalk';

export default (name) => {

  const list = 'list';
  const current = 'current';

  const API_PREFIX = `/api/${name}`;
  const REDUX_POSTFIX = '_' + name.toUpperCase();

  const GET = 'GET' + REDUX_POSTFIX;
  const FIND = 'FIND' + REDUX_POSTFIX;
  const UPDATE = 'UPDATE' + REDUX_POSTFIX;
  const DELETE = 'DELETE' + REDUX_POSTFIX;
  const SET = 'SET' + REDUX_POSTFIX;
  const SET_CURRENT = 'SET_CURRENT' + REDUX_POSTFIX;

  const initialState = () => {
    const initial = {};
    initial[list] = {};
    initial[current] = null;
    return initial;
  };

  const actions = {
    get, find, update, deleteModel, set, setCurrent
  }

  const reducer = (state = initialState(), action) => {
    const model = action.model;
    const stateModels = state[list];
    const actionModels = action.models;
    const actionCurrentModel = action.currentModel;
    switch (action.type) {
      case GET:
      case FIND:
        return state;
      case UPDATE:
        if (model.id) {
          console.log(`update ${name}`, model);
          const assigned = assign(stateModels, [model]);
          return {
            ...state,
            list: assigned
          }
        } else {
          return state;
        }
      case DELETE:
        console.log(`delete ${name}`, model);
        delete stateModels[model.id];
        return {
          ...state,
          list: stateModels
        }
      case SET:
        console.log(`set ${name}`, actionModels);
        const assigned = actionModels ? assign(stateModels, actionModels) : [];
        return {
          ...state,
          list: assigned
        }
      case SET_CURRENT:
        let ch = {};
        ch[current] = actionCurrentModel;
        return Object.assign(state, ch);
      default:
        return state;
    }
  }

  return {
    reducer,
    actions
  }

  function get(id) {
    return {
      type: GET,
      promise: fetch(`${API_PREFIX}/${id}`)
    }
  }

  function find(query) {
    console.log(chalk.blue(`find ${name}`), query);
    const json = JSON.stringify(query);
    return {
      type: FIND,
      promise: fetch(`${API_PREFIX}?query=${json}`)
    }
  }

  function update(model) {
    const body = JSON.stringify(model);
    return {
      type: UPDATE,
      model,
      promise: fetch(API_PREFIX, {method: 'POST', headers: {'Content-Type': 'application/json'}, body})
    }
  }

  function deleteModel(model) {
    return {
      type: DELETE,
      model,
      promise: fetch(`${API_PREFIX}/${model.id}`, {method: 'DELETE', headers: {'Content-Type': 'application/json'}})
    }
  }

  function set(models) {
    return {
      type: SET,
      models
    }
  }

  function setCurrent(model) {
    return {
      type: SET_CURRENT,
      model
    }
  }
}

const assign = (map, array) => {
  let reduce = array.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
  return Object.assign(map, reduce);
}
