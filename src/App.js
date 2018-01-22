import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Todo from './components/Todo';


class App extends Component {

	static propTypes = {
		title: PropTypes.string,
		initialData: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			isCompleted: PropTypes.bool.isRequired
		})).isRequired
	}

	static defaultProps = {
		title: 'default title'
	}

	constructor(props) {
		super(props);

		this.state = {
			todos: this.props.initialData
		}

		this.handleStatusChange = this.handleStatusChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleStatusChange(id) {
		let todos = this.state.todos.map(todo => {
			if (todo.id === id) {
				todo.isCompleted = !todo.isCompleted
			}

			return todo;
		});

		this.setState({ todos });
	}

	handleDelete(id) {
		let todos = this.state.todos.filter(todo => todo.id !== id);

		this.setState({ todos });
	}

	render() {
		return (
			<main className="App">
				<Header logo={ logo } title={ this.props.title } />

				<section className="todo-list">
					{ this.state.todos.map(todo =>
						<Todo
							id={ todo.id }
							key={ todo.id }
							title={ todo.title }
							isCompleted={ todo.isCompleted }
							onStatusChange={ this.handleStatusChange }
							onDelete={ this.handleDelete }
						/>) }
				</section>
			</main>
		);
	}
}

export default App;
