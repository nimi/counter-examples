/**
* Key value database store
 */
const Database = {
	_counterValue: 0,

	get: () => Database._counterValue,

	update: value => Database._counterValue = value
};

/**
* Counter model
 */
class Model {
	constructor(storage) {
		this.storage = storage;
	}

	read() {
		return this.storage.get();
	}

	update(value) {
		this.storage.update(value);
	}
}

/**
* Counter view
 */
class View {
	constructor(container) {
		this.container = container;
		this.appName = 'Vanilla JavaScript (MVC)';
		this.incrementButton = 'inc';
		this.incButton = () => document.getElementById('inc');
		this.decButton = () => document.getElementById('dec');
		this.counterTotal = () => document.getElementById('total');

		this.viewCommands = {
			showCounter: value => this.container.innerHTML = this.showTemplate(value),
			updateCounter: value => this.counterTotal().innerHTML = value
		};
	}

	render(command, value) {
		this.viewCommands[command](value);
	}

	showTemplate(value) {
		return `
		<h1>${this.appName}</h1>
		<button id="inc">+</button>
		<button id="dec">-</button>
			  <div id="total">${value}</div>`;
	}

	bind(event, handler) {

		if (event === 'increment') {
			this.incButton().addEventListener('click', handler);
		}

		if (event === 'decrement') {
			this.decButton().addEventListener('click', handler);
		}
	}
}

/**
* Counter view
 */
class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}

	initializeView() {
		this.view.render('showCounter', this.model.read());
		this._bindEvents();
	}

	increment() {
		const newValue = this.model.read() + 1;
		this.model.update(newValue);
		this._updateCount(newValue);
	}

	decrement() {
		const newValue = this.model.read() - 1;
		this.model.update(newValue);
		this._updateCount(newValue);
	}

	_bindEvents() {
		this.view.bind('increment', () => this.increment());
		this.view.bind('decrement', () => this.decrement());
	}

	_updateCount(value) {
		this.view.render('updateCounter', value);
	}

}

/**
* Counter component
 */
class Counter {
	constructor(container) {
		this.storage = Database;

		this.model = new Model(Database);
		this.view = new View(container);
		this.controller = new Controller(this.model, this.view);
	}
}

// Intialization
const container = document.getElementById('app');
const counter = new Counter(container);
const initializeView = () => counter.controller.initializeView();

window.addEventListener('load', initializeView);
