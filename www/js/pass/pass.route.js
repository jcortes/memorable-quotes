(function () {
	'use strict';

	angular.module('app.pass')
	.config(config);

	config.$inject = ['$stateProvider'];
	/* @ngInject */
	function config($stateProvider) {
		$stateProvider
		.state('forgotpass', {
			url: '/forgotpass',
			templateUrl: 'js/pass/forgot-template.html',
			controller: 'ForgotpassCtrl as fpc',
			cache: false
		})
		.state('passwordReset', {
			url: '/password/reset?sptoken',
			templateUrl: 'js/pass/password-reset-template.html',
			controller: 'PasswordResetCtrl as prc',
			cache: false
		})
		.state('menu.chgpass', {
			url: '^/chgpass',
			views: {
				'menuContent': {
					templateUrl: 'js/pass/chg-template.html',
					controller: 'ChgpassCtrl as cpc'
				}
			},
			cache: false,
			sp: {
				authenticate: true
			}
		});
	}
    
})();
