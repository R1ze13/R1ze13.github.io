import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Todo from './components/Todo';


class App extends Component {

	static propTypes = {
		title: PropTypes.string,
		todos: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			isCompleted: PropTypes.bool.isRequired
		})).isRequired
	}

	static defaultProps = {
		title: 'default title'
	}

	render() {
		return (
			<main className="App">
				<Header logo={ logo } title={ this.props.title } />

				<section className="todo-list">
					{ this.props.todos.map(todo =>
						<Todo
							id={ todo.id }
							key={ todo.id }
							title={ todo.title }
							isCompleted={ todo.isCompleted } />) }
				</section>
			</main>
		);
	}
}

export default App;
