import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<main className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">React ToDo</h1>
				</header>
				<section className="todo-list">
					<div className="todo completed">
						<button className="checkbox icon">
							<i className="material-icons">check_box</i>
						</button>

						<span className="todo-title">Изучить js</span>

						<button className="delete icon">
							<i className="material-icons">delete</i>
						</button>
					</div>
					<div className="todo">
						<button className="checkbox icon">
							<i className="material-icons">check_box_outline_blank</i>
						</button>

						<span className="todo-title">Изучить React</span>

						<button className="delete icon">
							<i className="material-icons">delete</i>
						</button>
					</div>
				</section>
			</main>
		);
	}
}

export default App;
