'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _ReactRedux = ReactRedux;
var Provider = _ReactRedux.Provider;
var connect = _ReactRedux.connect;
var _Redux = Redux;
var bindActionCreators = _Redux.bindActionCreators;
var createStore = _Redux.createStore;

// Actions

var actions = {
	increment: function increment() {
		return { type: 'INCREMENT' };
	},
	decrement: function decrement() {
		return { type: 'DECREMENT' };
	}
};

// Reducers
var counter = function counter() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

// Components
var CounterButton = function CounterButton(_ref) {
	var text = _ref.text;

	var props = _objectWithoutProperties(_ref, ['text']);

	return React.createElement(
		'button',
		props,
		text
	);
};

var Counter = function Counter(_ref2) {
	var increment = _ref2.increment;
	var decrement = _ref2.decrement;

	var props = _objectWithoutProperties(_ref2, ['increment', 'decrement']);

	return React.createElement(
		'div',
		null,
		React.createElement(CounterButton, { onClick: increment, text: '+' }),
		React.createElement(CounterButton, { onClick: decrement, text: '-' }),
		React.createElement(
			'div',
			null,
			props.counter
		)
	);
};

// Create store with reducers
var store = createStore(counter);

// App container
var mapStateToProps = function mapStateToProps(state) {
	return {
		counter: counter
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		increment: actions.increment,
		decrement: actions.decrement
	}, dispatch);
};

var App = connect(mapStateToProps, mapDispatchToProps)(Counter);

var Root = function Root(_ref3) {
	var store = _ref3.store;
	return React.createElement(
		Provider,
		{ store: store },
		React.createElement(App, null)
	);
};

ReactDOM.render(React.createElement(Root, { store: store }), document.getElementById('app'));

//# sourceMappingURL=app.js.map