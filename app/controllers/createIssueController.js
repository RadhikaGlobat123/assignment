(function(){
  var gitApp = angular.module("gitApp");

gitApp.controller("createIssueCtrl", ['$scope','$http','getUserRepoService',function($scope,$http,getUserRepoService){
  var vm = this;
  vm.gitUsername = '';
  vm.gitPasssword = '';
  vm.resData=[];
  vm.disableSel = true;
  vm.gitUser;
  vm.issueTitle = '';
  vm.issueDesc = '';
  vm.login = function(){
    getUserRepoService.getUserRepo(vm.gitUsername).then(function(res){
      vm.gitUser = res;
      console.log(res);
      for(var i=0;i< vm.gitUser.length; i++){
        vm.resData.push({name:vm.gitUser[i].name,value:vm.gitUser[i].name});
      }
      vm.disableSel = false;
    }); 
  }
  vm.createIssue = function(repoItem,issueTitle,isuueDesc){ 
    var issueData = JSON.stringify({title:issueTitle,body:isuueDesc});
   
   var encodeStr = btoa( vm.gitUsername +":"+ vm.gitPasssword);
   
    $http({
          url: "https://api.github.com/repos/"+vm.gitUsername+"/"+repoItem+"/issues",
          method: 'POST',
          data: issueData,
          headers: {'Content-Type': 'application/json','Authorization': 'Basic '+encodeStr+"=" }
      }).then(function successCall(res){
    });

  }
}]);
})();