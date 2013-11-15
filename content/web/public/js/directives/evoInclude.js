'use strict';

// attributes
//		src: template reference

cai.module('cai.directives').directive('evoInclude', ['$http', '$templateCache', '$sce', '$log', function($http, $templateCache, $sce, $log) {
	return {
    	restrict: 'EA',
        compile: function(element, attrs) {
        	var srcExp = attrs.src || attrs.ngInclude;
            
            return function(scope, $element) {
            
            	scope.$watch($sce.parseAsResourceUrl(srcExp), function(src) {
		            if (src) {
			    		$http.get(src, {cache: $templateCache})
			            	.success(function(response) {
                            	
                            	//$element.html(response);
                                //$compile($element.contents())(scope);
			                	$element.replaceWith(response);
			                })
			                .error(function(err) {
			                    $log.error(err);
			                	$element.replaceWith('');
							});
		            }
		            else {
	                	$element.replaceWith('');
		            }
	            });
            }
        }        
	};
}]);
