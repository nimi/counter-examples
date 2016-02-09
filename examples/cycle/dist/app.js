'use strict';

var _Rx = Rx;
var Observable = _Rx.Observable;
var _CycleDOM = CycleDOM;
var div = _CycleDOM.div;
var button = _CycleDOM.button;
var p = _CycleDOM.p;
var makeDOMDriver = _CycleDOM.makeDOMDriver;


function main(_ref) {
	var DOM = _ref.DOM;

	var action$ = Observable.merge(DOM.select('.decrement').events('click').map(function (ev) {
		return -1;
	}), DOM.select('.increment').events('click').map(function (ev) {
		return +1;
	}));
	var count$ = action$.startWith(0).scan(function (x, y) {
		return x + y;
	});
	return {
		DOM: count$.map(function (count) {
			return div([button('.decrement', '+'), button('.increment', '-'), p(String(count))]);
		})
	};
}

Cycle.run(main, {
	DOM: makeDOMDriver('#app')
});

//# sourceMappingURL=app.js.map