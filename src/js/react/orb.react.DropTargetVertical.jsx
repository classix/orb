/* global module, require, react */
/*jshint eqnull: true*/

'use strict';

var React = typeof window === 'undefined' ? require('react') : window.React,
    DragManager = require('./orb.react.DragManager.jsx'),
		DropIndicator = require('./orb.react.DropIndicator.jsx'),
		createReactClass = typeof window === 'undefined' ? require('create-react-class') : window.createReactClass,
    dtid = 0;

module.exports = createReactClass({
	getInitialState: function () {
		this.dtid = ++dtid;
		return {
			isover: false
		};
	},
  	componentDidMount: function() {
  		DragManager.registerTarget(this, this.props.axetype, this.onDragOver, this.onDragEnd);
  	},
	componentWillUnmount : function() {
		DragManager.unregisterTarget(this);
	},
	onDragOver: function(callback) {
			this.setState({
				isover: true
			}, callback);
	},
	onDragEnd: function(callback) {
			this.setState({
				isover: false
			}, callback);
	},
	render: function() {	
		var self = this;

		var buttons = this.props.buttons.map(function(button, index) {			
			var currButton = [
					<tr><td><DropIndicator isFirst={index === 0} position={index} axetype={self.props.axetype} isVertical={true}></DropIndicator></td></tr>,
					<tr><td>{ button }</td></tr>
				];

			if(index == self.props.buttons.length - 1) {
				currButton.push(
					<tr><td><DropIndicator isLast={true} position={null} axetype={self.props.axetype} isVertical={true}></DropIndicator></td></tr>
				);
			}

			return currButton;
		});

		return <div className={'drp-trgt-vertical' + (this.state.isover ? ' drp-trgt-over' : '') + (buttons.length === 0 ? ' drp-trgt-vertical-empty' : '')}>
			<table>
			<tbody>
				{buttons}
			</tbody>
			</table>
		</div>;
	}
});