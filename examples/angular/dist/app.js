'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function counterButton() {

	return {
		restrict: 'E',
		template: '<button>{{vm.text}}</button>',
		scope: {},
		bindToController: {
			text: '@',
			action: '@',
			update: '&onUpdate'
		},
		controllerAs: 'vm',
		controller: 'CounterButtonController',
		link: function link(scope, element, attrs, ctrl) {
			element[0].addEventListener('click', function () {
				ctrl.updateWithAction(scope.vm.action);
			});
		}
	};
}

var CounterButtonController = function () {
	function CounterButtonController($scope, CounterAppService) {
		_classCallCheck(this, CounterButtonController);

		this.CounterAppService = CounterAppService;
		this.$scope = $scope;
	}

	_createClass(CounterButtonController, [{
		key: 'updateWithAction',
		value: function updateWithAction(action) {
			console.log('action', action);
			this.CounterAppService.updateValue(action);
			this.update();
		}
	}]);

	return CounterButtonController;
}();

var CounterAppService = function () {
	function CounterAppService() {
		_classCallCheck(this, CounterAppService);

		this.value = 0;
	}

	_createClass(CounterAppService, [{
		key: 'updateValue',
		value: function updateValue(action) {
			if (action === 'add') {
				this.value += 1;
			} else if (action === 'subtract') {
				this.value -= 1;
			}
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			return this.value;
		}
	}]);

	return CounterAppService;
}();

var CounterAppController = function () {
	function CounterAppController($scope, CounterAppService) {
		_classCallCheck(this, CounterAppController);

		this.$scope = $scope;
		this.value = CounterAppService.getValue();
		this.CounterAppService = CounterAppService;
	}

	_createClass(CounterAppController, [{
		key: 'updateCounter',
		value: function updateCounter() {
			var _this = this;

			this.$scope.$apply(function () {
				_this.value = _this.CounterAppService.getValue();
			});
		}
	}]);

	return CounterAppController;
}();

function counterApp() {
	return {
		restrict: 'E',
		controllerAs: 'vm',
		bindToController: true,
		controller: 'CounterAppController',
		template: '\n\t\t  <div>\n\t\t\t<counter-button text=\'+\' action=\'add\' on-update="vm.updateCounter()">\n\t\t\t</counter-button>\n\t\t\t<counter-button text=\'-\' action=\'subtract\' on-update="vm.updateCounter()">\n\t\t\t</counter-button>\n\t\t\t<div>{{vm.value}}</div>\n\t\t  </div>\n\t\t'
	};
}

angular.module('counter.app', []).service('CounterAppService', CounterAppService).controller('CounterAppController', CounterAppController).controller('CounterButtonController', CounterButtonController).directive('counterButton', counterButton).directive('counterApp', counterApp);

angular.bootstrap(document, ['counter.app']);

//# sourceMappingURL=app.js.map