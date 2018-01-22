import React from 'react';
import { PropTypes } from 'prop-types';

import Checkbox from './Checkbox';
import Button from './Button';


function Todo(props) {
	return (
		<div className={`todo ${props.isCompleted ? 'completed' : ''}`}>
			<Checkbox
				isChecked={ props.isCompleted }
				onChange={ _ => props.onStatusChange(props.id) }
			/>
			<span className="todo-title">{ props.title }</span>
			<Button
				className="delete icon"
				icon="delete"
				onClick={ _ => props.onDelete(props.id) }
			/>
		</div>
	);
}

Todo.propTypes = {
	title: PropTypes.string.isRequired,
	isCompleted: PropTypes.bool.isRequired,
	onStatusChange: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
}


export default Todo;
