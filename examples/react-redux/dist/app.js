'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
	var value = _ref2.value;
	var onIncrement = _ref2.onIncrement;
	var onDecrement = _ref2.onDecrement;
	return React.createElement(
		'div',
		null,
		React.createElement(CounterButton, { onClick: onIncrement, text: '+' }),
		React.createElement(CounterButton, { onClick: onDecrement, text: '-' }),
		React.createElement(
			'div',
			null,
			value
		)
	);
};

var _Redux = Redux;
var createStore = _Redux.createStore;

var store = createStore(counter);

var render = function render() {
	ReactDOM.render(React.createElement(Counter, {
		value: store.getState(),
		onIncrement: function onIncrement() {
			return store.dispatch({
				type: 'INCREMENT'
			});
		},
		onDecrement: function onDecrement() {
			return store.dispatch({
				type: 'DECREMENT'
			});
		}
	}), document.getElementById('app'));
};

store.subscribe(render);
render();

//# sourceMappingURL=app.js.map