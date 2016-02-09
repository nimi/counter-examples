const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}

const CounterButton = ({text, ...props}) => (
	<button {...props}>{text}</button>
);

const Counter = ({ value, onIncrement, onDecrement}) => (
	<div>
		<CounterButton onClick={onIncrement} text='+'></CounterButton>
		<CounterButton onClick={onDecrement} text='-'></CounterButton>
		<div>{value}</div>
	</div>
);

const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
	ReactDOM.render(
		<Counter
			value={store.getState()}
			onIncrement={() =>
				store.dispatch({
					type: 'INCREMENT'
				})
			}
			onDecrement={() =>
				store.dispatch({
					type: 'DECREMENT'
				})
			}
		/>,
		document.getElementById('app')
	);
};

store.subscribe(render);
render();
