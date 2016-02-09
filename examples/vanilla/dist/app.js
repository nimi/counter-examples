'use strict';

var createElement = function createElement(tagName) {
	return document.createElement(tagName);
};

var render = function render(mountNode) {
	var mount = document.querySelector(mountNode);
	var docFrag = document.createDocumentFragment();
	var incrementButton = createElement('button');
	var decrementButton = createElement('button');
	var valueContainer = createElement('div');

	incrementButton.innerHTML = '+';
	incrementButton.setAttribute('id', 'increment');

	decrementButton.innerHTML = '-';
	decrementButton.setAttribute('id', 'decrement');

	valueContainer.setAttribute('id', 'value');
	valueContainer.setAttribute('data-value', "0");
	valueContainer.innerHTML = '0';

	docFrag.appendChild(incrementButton);
	docFrag.appendChild(decrementButton);
	docFrag.appendChild(valueContainer);

	mount.appendChild(docFrag);
};

var initialize = function initialize() {
	var APP_ID = '#app';

	render(APP_ID);

	var incButton = document.getElementById('increment');
	var decButton = document.getElementById('decrement');
	var valueContainer = document.getElementById('value');
	var value = valueContainer.getAttribute('data-value');

	var counterValue = Number(value);

	incButton.addEventListener('click', function () {
		counterValue = counterValue + 1;
		updateValue(counterValue);
	});

	decButton.addEventListener('click', function () {
		counterValue = counterValue - 1;
		updateValue(counterValue);
	});

	function updateValue(value) {
		var stringValue = String(value);

		valueContainer.setAttribute('data-value', stringValue);
		valueContainer.innerHTML = stringValue;
	}
};

initialize();

//# sourceMappingURL=app.js.map