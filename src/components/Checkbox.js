import React from 'react';
import { PropTypes } from 'prop-types';


function Checkbox(props) {
	return (
		<button className="checkbox icon" onClick={ props.onChange }>
			<i className="material-icons">{ props.isChecked ? 'check_box' : 'check_box_outline_blank' }</i>
		</button>
	);
}

Checkbox.propTypes = {
	isChecked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired
}


export default Checkbox;
