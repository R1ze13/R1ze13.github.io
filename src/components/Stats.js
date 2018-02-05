import React from 'react';
import { PropTypes } from 'prop-types';


function Stats(props) {
	const { todos } = props;
	const todosCount = todos ? todos.length : 0;
	let completedCount = 0;
	let unCompletedCount = 0;

	if (todos) {
		todos.forEach(todo => todo.isCompleted ? completedCount += 1 : null);
	}

	unCompletedCount = todosCount - completedCount;

	return (
		<table className="stats">
			<tbody>
				<tr>
					<th>Всего задач:</th>
					<td>{ todosCount }</td>
				</tr>
				<tr>
					<th>Выполнено:</th>
					<td>{ completedCount }</td>
				</tr>
				<tr>
					<th>Осталось:</th>
					<td>{ unCompletedCount }</td>
				</tr>
			</tbody>
		</table>
	);
}

Stats.propTypes = {
	todos: PropTypes.array.isRequired
};


export default Stats;
