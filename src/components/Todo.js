import React from 'react';
import { PropTypes } from 'prop-types';

import Checkbox from './Checkbox';
import Button from './Button';


function Todo(props) {
	return (
		<div className={`todo ${props.isCompleted ? 'completed' : ''}`}>
			<Checkbox isChecked={ props.isCompleted } />
			<span className="todo-title">{ props.title }</span>
			<Button className="delete icon" icon="delete" />
		</div>
	);
}

Todo.propTypes = {
	title: PropTypes.string.isRequired,
	isCompleted: PropTypes.bool.isRequired
}


export default Todo;
