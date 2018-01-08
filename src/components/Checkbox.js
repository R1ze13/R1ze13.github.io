import React from 'react';
import { PropTypes } from 'prop-types';


function Checkbox(props) {
	return (
		<button className="checkbox icon">
			<i className="material-icons">{ props.isChecked ? 'check_box_outline' : 'check_box_outline_blank' }</i>
		</button>
	);
}

Checkbox.propTypes = {
	isChecked: PropTypes.bool.isRequired
}


export default Checkbox;
