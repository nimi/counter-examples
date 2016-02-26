const {Observable} = Rx;
const {div, button, p, makeDOMDriver} = CycleDOM;

function main({DOM}) {
	// Intent
	let action$ = Observable.merge(
		DOM.select('.decrement').events('click').map(ev => -1),
		DOM.select('.increment').events('click').map(ev => +1)
	);
	
	// Model
	let count$ = action$.startWith(0).scan((x,y) => x+y);
	
	// View
	return {
		DOM: count$.map(count =>
			div([
				button('.decrement', '+'),
				button('.increment', '-'),
				p(String(count))
			])
		)
	};
}

Cycle.run(main, {
	DOM: makeDOMDriver('#app')
});
