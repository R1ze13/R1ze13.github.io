import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Todo from './components/Todo';


class App extends Component {

	static propTypes = {
		title: PropTypes.string
	}

	static defaultProps = {
		title: 'default title'
	}

	render() {
		return (
			<main className="App">
				<Header logo={ logo } title={ this.props.title } />

				<section className="todo-list">

					<Todo title={'ttl'} completed={ true } />
					<Todo title={'ttl2'} completed={ false } />

				</section>
			</main>
		);
	}
}

export default App;
