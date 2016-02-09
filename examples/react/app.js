const { Component } = React;
const Dispatcher = new Flux.Dispatcher();

// Base
const CHANGE_EVENT = 'change';

const BaseStore = Object.assign({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

// Constants:
const ActionTypes = {
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT'
};

// Action Creators
const ActionCreators = {
	createIncrement: () => {
		Dispatcher.dispatch({
			type: ActionTypes.INCREMENT
		});
	},

	createDecrement: () => {
		Dispatcher.dispatch({
			type: ActionTypes.DECREMENT
		});
	}
}

let _counter = 0;
const CounterStore = Object.assign({}, BaseStore, {
	getCounter: () => _counter,
	dispatchToken: Dispatcher.register(action => {
		switch(action.type) {
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

function CounterButton({text, ...props}) {
	return <button {...props}>{text}</button>;
}

class Counter extends Component {

	constructor() {
		super();
		this.state = {
			counter: this._getStateFromStore()
		}

		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		CounterStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		CounterStore.removeChangeListener(this._onChange);
	}

	increment() {
		ActionCreators.createIncrement();
	}

	decrement() {
		ActionCreators.createDecrement();
	}

	_onChange() {
		const counter = this._getStateFromStore();
		this.setState({ counter });
	}

	_getStateFromStore() {
		return CounterStore.getCounter();
	}

	render() {
		return (
			<div>
				<CounterButton text='+' onClick={() => this.increment()} />
				<CounterButton text='-' onClick={() => this.decrement()} />
				<div>{this.state.counter}</div>
			</div>
		)
	}
}

ReactDOM.render(<Counter />, document.getElementById('app'));
