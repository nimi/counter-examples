function counterButton() {

	return {
		restrict: `E`,
		template: `<button>{{vm.text}}</button>`,
		scope: {},
		bindToController: {
			text: '@',
			action: '@',
			update: '&onUpdate'
		},
		controllerAs: 'vm',
		controller: 'CounterButtonController',
		link: function link (scope, element, attrs, ctrl) {
			element[0].addEventListener('click',  () => {
				ctrl.updateWithAction(scope.vm.action);
			});
		}
	}
}

class CounterButtonController {

	constructor($scope, CounterAppService) {
		this.CounterAppService = CounterAppService;
		this.$scope = $scope;
	}

	updateWithAction(action) {
		console.log('action', action);
		this.CounterAppService.updateValue(action);
		this.update();
	}
}

class CounterAppService {

	constructor() {
		this.value = 0;
	}

	updateValue(action) {
		if (action === 'add') {
			this.value += 1;
		}
		else if (action === 'subtract') {
			this.value -= 1;
		}
	}

	getValue() {
		return this.value;
	}

}

class CounterAppController {
	constructor($scope, CounterAppService) {
		this.$scope = $scope;
		this.value = CounterAppService.getValue();
		this.CounterAppService = CounterAppService;
	}

	updateCounter() {
		this.$scope.$apply(() => {
			this.value = this.CounterAppService.getValue();
		});
	}
}

function counterApp () {
	return {
		restrict: 'E',
		controllerAs: 'vm',
		bindToController: true,
		controller: 'CounterAppController',
		template: `
		  <div>
			<counter-button text='+' action='add' on-update="vm.updateCounter()">
			</counter-button>
			<counter-button text='-' action='subtract' on-update="vm.updateCounter()">
			</counter-button>
			<div>{{vm.value}}</div>
		  </div>
		`
	};
}

angular.module('counter.app', [])
	.service('CounterAppService', CounterAppService)
	.controller('CounterAppController', CounterAppController)
	.controller('CounterButtonController', CounterButtonController)
	.directive('counterButton', counterButton)
	.directive('counterApp', counterApp)
;

angular.bootstrap(document, ['counter.app']);
