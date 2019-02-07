/* global module, require, react */
/*jshint eqnull: true*/

'use strict';

var React = typeof window === 'undefined' ? require('react') : window.React,
		createReactClass = typeof window === 'undefined' ? require('create-react-class') : window.createReactClass,
    DragManager = require('./orb.react.DragManager.jsx');

module.exports = createReactClass({
	displayName: 'DropIndicator',
	getInitialState: function () {
		DragManager.registerIndicator(this, this.props.axetype, this.props.position, this.onDragOver, this.onDragEnd);
		return {
			isover: false
		};
	},
	componentWillUnmount : function() {
		DragManager.unregisterIndicator(this);
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
		var classname = 'drp-indic' + (this.props.isVertical ? '-vertical' : '');

		if(this.props.isFirst) {
			classname += ' drp-indic-first';
		}

		if(this.props.isLast) {
			classname += ' drp-indic-last';
		}

		var style = {};
		if(this.state.isover) {
			classname += ' drp-indic-over';
		}

		return <div style={style} className={classname}></div>;
	}
});