const createElement = (tagName) => {
	return document.createElement(tagName);
};

const render = (mountNode) => {
	const mount = document.querySelector(mountNode);
	const docFrag = document.createDocumentFragment();
	const incrementButton = createElement('button');
	const decrementButton = createElement('button');
	const valueContainer = createElement('div');

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

const initialize = () => {
	const APP_ID = '#app';

	render(APP_ID);

	const incButton = document.getElementById('increment');
	const decButton = document.getElementById('decrement');
	const valueContainer = document.getElementById('value');
	const value = valueContainer.getAttribute('data-value');

	let counterValue = Number(value);

	incButton.addEventListener('click', () => {
		counterValue = counterValue + 1;
		updateValue(counterValue);
	});

	decButton.addEventListener('click', () => {
		counterValue = counterValue - 1;
		updateValue(counterValue);
	});

	function updateValue(value) {
		const stringValue = String(value);

		valueContainer.setAttribute('data-value', stringValue);
		valueContainer.innerHTML = stringValue;
	}

};

initialize();
