const {Provider, connect} = ReactRedux;
const {bindActionCreators, createStore} = Redux;

// Actions
const actions = {
	increment: () => ({type: 'INCREMENT'}),
	decrement: () => ({type: 'DECREMENT'})
}

// Reducers
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

// Components
const CounterButton = ({text, ...props}) => (
	<button {...props}>{text}</button>
);

const Counter = ({increment, decrement, ...props}) => (
	<div>
		<CounterButton onClick={increment} text='+'></CounterButton>
		<CounterButton onClick={decrement} text='-'></CounterButton>
		<div>{props.counter}</div>
	</div>
);

// Create store with reducers
const store = createStore(counter);

// App container
const mapStateToProps = state => ({
	counter
});

const mapDispatchToProps = dispatch => (
	bindActionCreators(
		{
			increment: actions.increment,
			decrement: actions.decrement
		},
		dispatch
	)
);

const App = connect(mapStateToProps, mapDispatchToProps)(Counter);

const Root = ({store}) => (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('app')
);

