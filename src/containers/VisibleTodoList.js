import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router-dom';

const getVisibleTodos = (todos, filter) => {
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

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.match.params.filter || 'all')
})

/*const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => { dispatch(toggleTodo(id))}
})*/

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList))

export default VisibleTodoList
