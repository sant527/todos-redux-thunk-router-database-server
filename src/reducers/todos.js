import { combineReducers } from 'redux'
import todo from './todo';

const byId = (state = {}, action) => {
  switch (action.type) {
    //If you forget a break/return then script will run from the case where criteria is met, and will run the case after that regardless if criteria was met. 
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};


const todos = combineReducers({
  byId,
  allIds,
});


export default todos

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
/*  console.log('getVisibleTodos filter: ' + filter)*/
  switch (filter) {
    case 'all':
      return allTodos
    case 'completed':
      return allTodos.filter(t => t.completed)
    case 'active':
      return allTodos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
