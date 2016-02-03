'use strict';

/**
 * @ngdoc function
 * @name priceComparatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the priceComparatorApp
 */
angular.module('priceComparatorApp')
  .controller('MainCtrl', function ($scope , $http) {
  	var oThis 		  = this
  	    ,categoryList = []
  	;

  	this.init = function() {
  		if( !categoryList.length ) {
  			var catFeedUrl = 'http://api.pricecheckindia.com/feed/product/categories.json?callback=JSON_CALLBACK';
  			$http({method:'jsonp' , url: catFeedUrl })
	  		.success( function( data ){
	  			categoryList = data.supported_categories;
	  			oThis.categoryAutoComplete( categoryList );
	  		});	
  		}
  		else {
  			oThis.categoryAutoComplete( categoryList );
  		}
  	};

  	this.categoryAutoComplete = function( categoryList ) {
  		$( "#txtCategorySearch" ).autocomplete({
	      source: categoryList,
	      minLength: 0
	    });
  	};

    $scope.searchCallback = function(){
    	var selectedCategory = $('#txtCategorySearch').val()
    		  ,searchKey 		 = $('#txtSearch').val() 
    	    ,url    		 = 'http://api.pricecheckindia.com/feed/product/' + selectedCategory + '/' + searchKey + '.json?user=debajitb&key=MGQXXEKEAJQICQQF&callback=JSON_CALLBACK'
    	;
    	$scope.loading 	  = true;
      $scope.storesAvailable = false;
    	$scope.showStatus = false;

    	$http({ method:'jsonp' , url: url })
    	.success( function( data ){
    		oThis.searchSuccess( data );
    	});
    };

    this.searchSuccess = function( products ) {
    	var storeList = []
    		  ,prodsLen = products.product.length
    	    ,storesLen
    	;
		
  		if( prodsLen ) {
  			for (var i = 0; i < prodsLen; i++) {
  				storesLen = storeList.push.apply( storeList , products.product[i].stores );
  			};
  		}
      storeList              = oThis.asignStoreImages( storeList );
  		$scope.stores 		     = storeList;
  		$scope.storesAvailable = storesLen || false;
  		$scope.loading         = false;

  		if(!storesLen ){
  			$scope.showStatus = true;
  		}
    };

    this.asignStoreImages = function( stores ) {
      var websiteName;
      for (var i = 0; i < stores.length; i++) {
        websiteName = stores[i].website.toLowerCase();
        stores[i].websiteUrl = '/images/stores/' + websiteName + '.jpg';
      }
      return stores;
    };

    oThis.init();
    
  });
