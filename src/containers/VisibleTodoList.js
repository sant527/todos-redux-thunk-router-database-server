import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as actions from '../actions'
import { getVisibleTodos, getIsFetching } from '../reducers'
import TodoList from '../components/TodoList'

class VisibleTodoList extends Component {
	componentDidMount(){
		this.fetchData();
	}

	componentDidUpdate(prevProps) {
	   if (this.props.filter !== prevProps.filter) {
	   		this.fetchData();
	   }
	}

	fetchData() {
	  const { filter, requestTodos, fetchTodos } = this.props;
	  requestTodos(filter);
	  fetchTodos(filter);
	}

	render() {
		const { toggleTodo, todos, isFetching} =  this.props;
		if (isFetching && !todos.length) {
			return <p>Loading...</p>;
		}

		return (
			<TodoList 
				todos={todos} 
				onTodoClick={toggleTodo} 
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all'
  return{
  	todos: getVisibleTodos(state, filter),
  	isFetching: getIsFetching(state,filter),
  	filter
  }
};

/*const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => { dispatch(toggleTodo(id))}
  receiveTodos: (filter, todos) => { dispatch(receiveTodos(filter, todos))}
})*/

/*VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo, receiveTodos }
)(VisibleTodoList))*/

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList))

export default VisibleTodoList
