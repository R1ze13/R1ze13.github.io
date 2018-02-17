import React from 'react';
import { PropTypes } from 'prop-types';
import Button from './Button';


class Form extends React.Component {
	static propTypes = {
		onAdd: PropTypes.func.isRequired
	}


	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleSubmit(ev) {
		ev.preventDefault();
		const value = this.refs.title.value;

		if (value) {
			this.props.onAdd(value);
			this.refs.title.value = '';
		}
	}


	render() {
		return (
			<form className="todo-form" onSubmit={ this.handleSubmit }>
				<input type="text" ref="title" placeholder="what u need to do?" />
				<Button type="submit">add todo</Button>
			</form>
		);
	}
}


export default Form;
