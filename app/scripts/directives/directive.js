var gitApp = angular.module("gitApp");

gitApp.directive("clickToEdit",['getUserRepoService','getUserDataFactory',function(getUserRepoService,getUserDataFactory) {
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
            type: "@",
            index:"=",
            obj:"=",
            valIndex:"@"    
        },
          link: function ( scope, element, attrs ) {
            
            var username = getUserDataFactory.getUserName();
            var password = getUserDataFactory.getUserPassword();
            var repo = getUserDataFactory.getUserRepo();

          	scope.view = {
               editableValue: scope.val,
               editableType : scope.type,
               editableIndex: scope.index,
             //  editableObj: scope.obj,
             //  editValIndex:scope.valIndex,
               editorEnabled: false
            };
    		    scope.edit = function () {
              scope.view.editorEnabled = true;
            };
            scope.save = function () { 
        
             if(scope.view.editValIndex==1){
               var issueData = JSON.stringify({title:scope.view.editableValue});
             }else if(scope.view.editValIndex==4){
              var issueData = JSON.stringify({body:scope.view.editableValue});
             }
             var encodeStr = btoa( username +":"+ password );
            
             getUserRepoService.updateIssueService(issueData,encodeStr,username,repo,scope.view.editableIndex).then(function(res) {
            //    console.log("success");
             },function(errRes){
              //  console.log("error");
           });
             scope.val = scope.view.editableValue;
             scope.view.editorEnabled = false;
           //  console.log(editDesc)

             return false;
             // console.log(scope.view.editableIndex);
             // getUserRepoService.updateIssueService(issueData,encodeStr,username,repo,number)
	            

            };
            scope.cancel = function () { 
	            scope.view.editorEnabled = false;
            };
    	}  
    };
}]);

