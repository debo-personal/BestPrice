'use strict';

angular.module('priceComparatorApp')
	.directive('productFilter' , function() {
		return {
			restrict: 'E',
			templateUrl: 'views/productFilter.html'
		}
	})
	.directive('vendorPrice' , function() {
		return {
			restrict: 'E',
			templateUrl: 'views/vendorPrice.html'
		};
	})
	;