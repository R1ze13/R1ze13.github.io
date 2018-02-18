import React from 'react';
import { PropTypes } from 'prop-types';

import Stats from './Stats';
import StopWatch from './StopWatch';



function Header(props) {
	return (
		<header className="App-header">
			<img src={ props.logo } className="App-logo" alt="logo" />
			<h1 className="App-title">{ props.title }</h1>
			<Stats todos={ props.todos } />
			<StopWatch />
		</header>
	);
}


Header.propTypes = {
	logo: PropTypes.string,
	title: PropTypes.string.isRequired,
	todos: PropTypes.array.isRequired
}


export default Header;
