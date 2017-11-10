const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id) 
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}

export default todos

//The convention we follow is simple. The default export is always the reducer function, but any named export starting with 'get' is a function that prepares the data to be displayed by the UI. We usually call these functions selectors because they select something from the current state.

//In the reducers, the state argument corresponds to the state of this particular reducer, so we will follow the same convention for selectors. The state argument corresponds to the state of the exported reducer in this file.

export const getVisibleTodos = (todos, filter) => {
  console.log('getVisibleTodos filter: ' + filter)
  switch (filter) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter(t => t.completed)
    case 'active':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
