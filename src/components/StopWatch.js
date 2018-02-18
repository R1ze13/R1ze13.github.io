import React from 'react';

import Button from './Button';



export default class StopWatch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isRunning: false,
			elapsed: 0,
			lastTick: 0
		};

		this.handleStart = this.handleStart.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.handleStop = this.handleStop.bind(this);
		this.tick = this.tick.bind(this);
	}


	handleStart() {
		this.setState({
			isRunning: true,
			lastTick: Date.now()
		}, () => this.interval = setInterval(this.tick, 1000));
	}


	handlePause() {
		this.setState({ isRunning: false }, () => clearInterval(this.interval));
	}


	handleStop() {
		this.setState({
			isRunning: false,
			elapsed: 0,
			lastTick: 0
		}, () => clearInterval(this.interval));
	}


	componentWillUnmount() {
		clearInterval(this.interval);
	}


	tick() {
		if (this.state.isRunning) {
			const now = Date.now();
			const diff = now - this.state.lastTick;
			this.setState({
				elapsed: this.state.elapsed + diff,
				lastTick: now
			});
		}
	}


	format(ms) {
		const totalSec = Math.floor(ms / 1000);
		const min = Math.floor(totalSec / 60);
		const sec = totalSec % 60;
		return `${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}`;
	}


	render() {
		const time = this.format(this.state.elapsed);

		return (
			<section className="stopwatch">
				<div className="stopwatch-time">{ time }</div>
				<div className="stapwatch-controls">
					{ this.state.isRunning ?
						<Button className="icon" icon="pause" onClick={ this.handlePause } />
						:
						<Button className="icon" icon="play_arrow" onClick={ this.handleStart } />
					}
					<Button className="icon" icon="stop" onClick={ this.handleStop } />
				</div>
			</section>
		);
	}
}
