import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
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
		axios.get('/api/todos')
			.then(response => response.data)
			.then(todos => this.setState({ todos }))
			.catch(error => console.warn(error));
	}



	handleStatusChange(id) {
		axios.patch(`/api/todos/${id}`)
			.then(response => {
				const todos = this.state.todos.map(todo => {
					if (todo.id === id) {
						todo.isCompleted = response.data.isCompleted;
					}

					return todo;
				});

				this.setState({ todos });
			})
			.catch(error => console.warn(error));
	}


	handleDelete(id) {
		axios.delete(`/api/todos/${id}`)
			.then(() => {
				const todos = this.state.todos.filter(todo => todo.id !== id);
				this.setState({ todos });
			})
			.catch(this.handleError);
	}

	handleAdd(title) {
		axios.post('/api/todos', { title })
			.then(response => response.data)
			.then(todo => {
				const todos = this.state.todos.concat(todo);
				this.setState({ todos });
			})
			.catch(this.handleError);
	}


	handleEdit(id, title) {
		axios.put(`/api/todos/${id}`, { title })
			.then(response => response.data)
			.then(response => {
				const todos = this.state.todos.map(todo => {
					if (todo.id === id) {
						todo.title = response.title;
					}
					return todo;
				});

				this.setState({ todos });
			})
			.catch(this.handleError);
	}


	handleError(error) {
		console.warn(error);
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
