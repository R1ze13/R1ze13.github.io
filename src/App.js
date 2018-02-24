import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';


export default class App extends Component {

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
			todos: []
		}

		this.handleStatusChange = this.handleStatusChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}


	componentDidMount() {
		fetch('/api/todos')
			.then(response => response.json())
			.then(todos => this.setState({ todos }))
			.catch(error => console.warn(error));
	}


	_getNextId() {
		let maxId = 0;
		this.state.todos.forEach(todo => todo.id > maxId ? maxId = todo.id : '');
		return maxId + 1;
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

	handleAdd(title) {
		const todo = {
			id: this._getNextId(),
			title,
			isCompleted: false
		};
		const todos = [...this.state.todos, todo];
		this.setState({ todos });
	}


	handleEdit(id, title) {
		const todos = this.state.todos.map(todo => {
			if (todo.id === id) {
				todo.title = title;
			}
			return todo;
		});

		this.setState({ todos });
	}


	render() {
		return (
			<main className="App">
				<Header logo={ logo } title={ this.props.title } todos={ this.state.todos } />

				<section className="todo-list">
					{ this.state.todos.map(todo =>
						<Todo
							id={ todo.id }
							key={ todo.id }
							title={ todo.title }
							isCompleted={ todo.isCompleted }
							onStatusChange={ this.handleStatusChange }
							onDelete={ this.handleDelete }
							onEdit={ this.handleEdit }
						/>) }
				</section>

				<Form onAdd={ this.handleAdd } />
			</main>
		);
	}
}
