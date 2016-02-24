'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Key value database store
 */
var Database = {
	_counterValue: 0,

	get: function get() {
		return Database._counterValue;
	},

	update: function update(value) {
		return Database._counterValue = value;
	}
};

/**
* Counter model
 */

var Model = function () {
	function Model(storage) {
		_classCallCheck(this, Model);

		this.storage = storage;
	}

	_createClass(Model, [{
		key: 'read',
		value: function read() {
			return this.storage.get();
		}
	}, {
		key: 'update',
		value: function update(value) {
			this.storage.update(value);
		}
	}]);

	return Model;
}();

/**
* Counter view
 */


var View = function () {
	function View(container) {
		var _this = this;

		_classCallCheck(this, View);

		this.container = container;
		this.appName = 'Vanilla JavaScript (MVC)';
		this.incrementButton = 'inc';
		this.incButton = function () {
			return document.getElementById('inc');
		};
		this.decButton = function () {
			return document.getElementById('dec');
		};
		this.counterTotal = function () {
			return document.getElementById('total');
		};

		this.viewCommands = {
			showCounter: function showCounter(value) {
				return _this.container.innerHTML = _this.showTemplate(value);
			},
			updateCounter: function updateCounter(value) {
				return _this.counterTotal().innerHTML = value;
			}
		};
	}

	_createClass(View, [{
		key: 'render',
		value: function render(command, value) {
			this.viewCommands[command](value);
		}
	}, {
		key: 'showTemplate',
		value: function showTemplate(value) {
			return '\n\t\t<h1>' + this.appName + '</h1>\n\t\t<button id="inc">+</button>\n\t\t<button id="dec">-</button>\n\t\t\t  <div id="total">' + value + '</div>';
		}
	}, {
		key: 'bind',
		value: function bind(event, handler) {

			if (event === 'increment') {
				this.incButton().addEventListener('click', handler);
			}

			if (event === 'decrement') {
				this.decButton().addEventListener('click', handler);
			}
		}
	}]);

	return View;
}();

/**
* Counter view
 */


var Controller = function () {
	function Controller(model, view) {
		_classCallCheck(this, Controller);

		this.model = model;
		this.view = view;
	}

	_createClass(Controller, [{
		key: 'initializeView',
		value: function initializeView() {
			this.view.render('showCounter', this.model.read());
			this._bindEvents();
		}
	}, {
		key: 'increment',
		value: function increment() {
			var newValue = this.model.read() + 1;
			this.model.update(newValue);
			this._updateCount(newValue);
		}
	}, {
		key: 'decrement',
		value: function decrement() {
			var newValue = this.model.read() - 1;
			this.model.update(newValue);
			this._updateCount(newValue);
		}
	}, {
		key: '_bindEvents',
		value: function _bindEvents() {
			var _this2 = this;

			this.view.bind('increment', function () {
				return _this2.increment();
			});
			this.view.bind('decrement', function () {
				return _this2.decrement();
			});
		}
	}, {
		key: '_updateCount',
		value: function _updateCount(value) {
			this.view.render('updateCounter', value);
		}
	}]);

	return Controller;
}();

/**
* Counter component
 */


var Counter = function Counter(container) {
	_classCallCheck(this, Counter);

	this.storage = Database;

	this.model = new Model(Database);
	this.view = new View(container);
	this.controller = new Controller(this.model, this.view);
};

// Intialization


var container = document.getElementById('app');
var counter = new Counter(container);
var initializeView = function initializeView() {
	return counter.controller.initializeView();
};

window.addEventListener('load', initializeView);

//# sourceMappingURL=app.js.map