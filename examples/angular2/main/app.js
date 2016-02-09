import {bootstrap} from 'angular2/platform/browser';
import {Component, Attribute} from 'angular2/core';

class CounterService {
	value: number;
	constructor() {
		this.value = 0;
	}

	getValue() {
		return this.value;
	}
}

@Component({
	selector: 'counter-button',
	template: `
	   <button>{{text}}</button>
	`
})
class CounterButton {
	text: string;

	constructor(@Attribute("text") text) {
		this.text = text;
	}
}


@Component({
	selector: 'app'
	template: `
	   <counter-button text="+" (click)="increment()"></counter-button>
	   <counter-button text="-" (click)="decrement()"></counter-button>
	   <div>{{value}}</div>
	`,
	directives: [CounterButton]
})
class App {
	value: number;
	constructor(counterService: CounterService) {
		this.value = counterService.getValue();
	}

	increment() {
		this.value = this.value + 1;
	}

	decrement() {
		this.value = this.value - 1;
	}
}

bootstrap(App, [
	CounterService
]);
