import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import * as actions from '../actions'
import { getVisibleTodos } from '../reducers'
import TodoList from '../components/TodoList'
import { fetchTodos } from '../api';


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
	  const { filter, receiveTodos } = this.props;
	  fetchTodos(filter).then(todos =>
	    receiveTodos(filter, todos)
	  );
	}

	render() {
		const { toggleTodo, ...rest } =  this.props;
		return (
			<TodoList 
				{...rest} 
				onTodoClick={toggleTodo} 
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all'
  return{
  	todos: getVisibleTodos(state, filter),
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
