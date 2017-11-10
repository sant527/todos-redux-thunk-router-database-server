import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { toggleTodo } from '../actions'
import { getVisibleTodos } from '../reducers'
import TodoList from '../components/TodoList'



const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state, ownProps.match.params.filter || 'all')
})

/*const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => { dispatch(toggleTodo(id))}
})*/

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList))

export default VisibleTodoList
