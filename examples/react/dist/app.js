'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _React = React;
var Component = _React.Component;

var Dispatcher = new Flux.Dispatcher();

// Base
var CHANGE_EVENT = 'change';

var BaseStore = Object.assign({}, EventEmitter.prototype, {

	emitChange: function emitChange() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeListener: function removeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

// Constants:
var ActionTypes = {
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT'
};

// Action Creators
var ActionCreators = {
	createIncrement: function createIncrement() {
		Dispatcher.dispatch({
			type: ActionTypes.INCREMENT
		});
	},

	createDecrement: function createDecrement() {
		Dispatcher.dispatch({
			type: ActionTypes.DECREMENT
		});
	}
};

var _counter = 0;
var CounterStore = Object.assign({}, BaseStore, {
	getCounter: function getCounter() {
		return _counter;
	},
	dispatchToken: Dispatcher.register(function (action) {
		switch (action.type) {
			case ActionTypes.INCREMENT:
				_counter += 1;
				CounterStore.emitChange();
				break;
			case ActionTypes.DECREMENT:
				_counter -= 1;
				CounterStore.emitChange();
				break;
		}
	})
});

function CounterButton(_ref) {
	var text = _ref.text;

	var props = _objectWithoutProperties(_ref, ['text']);

	return React.createElement(
		'button',
		props,
		text
	);
}

var Counter = function (_Component) {
	_inherits(Counter, _Component);

	function Counter() {
		_classCallCheck(this, Counter);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Counter).call(this));

		_this.state = {
			counter: _this._getStateFromStore()
		};

		_this._onChange = _this._onChange.bind(_this);
		return _this;
	}

	_createClass(Counter, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			CounterStore.addChangeListener(this._onChange);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			CounterStore.removeChangeListener(this._onChange);
		}
	}, {
		key: 'increment',
		value: function increment() {
			ActionCreators.createIncrement();
		}
	}, {
		key: 'decrement',
		value: function decrement() {
			ActionCreators.createDecrement();
		}
	}, {
		key: '_onChange',
		value: function _onChange() {
			var counter = this._getStateFromStore();
			this.setState({ counter: counter });
		}
	}, {
		key: '_getStateFromStore',
		value: function _getStateFromStore() {
			return CounterStore.getCounter();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				null,
				React.createElement(CounterButton, { text: '+', onClick: function onClick() {
						return _this2.increment();
					} }),
				React.createElement(CounterButton, { text: '-', onClick: function onClick() {
						return _this2.decrement();
					} }),
				React.createElement(
					'div',
					null,
					this.state.counter
				)
			);
		}
	}]);

	return Counter;
}(Component);

ReactDOM.render(React.createElement(Counter, null), document.getElementById('app'));

//# sourceMappingURL=app.js.map