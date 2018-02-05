import React from 'react';
import Button from './Button';


class Form extends React.Component {
	static propTypes = {

	}

	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<form className="todo-form">
				<input type="text" placeholder="what u need to do?" />
				<Button type="submit">add todo</Button>
			</form>
		);
	}
}


export default Form;
