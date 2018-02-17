import React from 'react';
import { PropTypes } from 'prop-types';

import Checkbox from './Checkbox';
import Button from './Button';



export default class Todo extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		isCompleted: PropTypes.bool.isRequired,
		onStatusChange: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired
	}


	componentDidUpdate() {
		if (this.refs.title) {
			this.refs.title.select();
		}
	}


	constructor(props) {
		super(props);

		this.state = {
			editing: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}


	handleSubmit(ev) {
		ev.preventDefault();
		const title = this.refs.title.value;

		if (title) {
			this.props.onEdit(this.props.id, title);
			this.setState({ editing: false });
		}
	}


	handleClick(ev) {
		this.setState({ editing: true });
	}


	renderDisplay() {
		return (
			<div className={`todo ${this.props.isCompleted ? 'completed' : ''}`}>
				<Checkbox
					isChecked={ this.props.isCompleted }
					onChange={ _ => this.props.onStatusChange(this.props.id) }
				/>

				<span className="todo-title">{ this.props.title }</span>

				<Button
					className="edit icon"
					icon="edit"
					onClick={ this.handleClick }
				/>
				<Button
					className="delete icon"
					icon="delete"
					onClick={ _ => this.props.onDelete(this.props.id) }
				/>
			</div>
		);
	}


	renderForm() {
		return (
			<form className="todo-edit-form" onSubmit={ this.handleSubmit }>
				<input type="text" ref="title" defaultValue={ this.props.title } />
				<Button
					className="save icon"
					icon="save"
					type="submit"
				/>
			</form>
		);
	}


	render() {
		return this.state.editing ? this.renderForm() : this.renderDisplay();
	}
}
