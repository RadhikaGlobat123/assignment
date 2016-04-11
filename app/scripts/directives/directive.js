var gitApp = angular.module("gitApp");

gitApp.directive("clickToEdit", function () {
    var editorTemplate =  '<div>'+
    '<span ng-show="!view.editorEnabled" ng-click="edit()" ng-bind="val"></span>'+
    '<input type="{{view.editableType}}" ng-show="view.editorEnabled" ng-model="view.editableValue"  >'+
    '<button ng-show="view.editorEnabled" ng-click="save()" class="glyphicon glyphicon-ok"></button>'+
    '<button ng-show="view.editorEnabled" ng-click="cancel()" class="glyphicon glyphicon-remove"></button>'
    '</div>';

    return {
        restrict: "E",
        replace: true,
        template: editorTemplate,
        scope: {
            val: "=",
            type: "@"    
        },
          link: function ( scope, element, attrs ) {
          	scope.view = {
               editableValue: scope.val,
               editableType : scope.type,
               editorEnabled: false
            };
    		scope.edit = function () {
              scope.view.editorEnabled = true;
            };
            scope.save = function () { 
	            scope.val = scope.view.editableValue;
	            scope.view.editorEnabled = false;
            };
            scope.cancel = function () { 
	            scope.view.editorEnabled = false;
            };
    	}  
    };
});

