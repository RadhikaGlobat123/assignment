(function(){
  var gitApp = angular.module("gitApp");

gitApp.controller("createIssueCtrl", ['$scope','$http','getUserRepoService','$timeout','$location','$window',function($scope,$http,getUserRepoService,$timeout,$location,$window){
  var vm = this;
  vm.gitUsername = '';
  vm.gitPasssword = '';
  vm.resData=[];
  vm.userData = [];
  vm.gitUser;
  vm.issueTitle = '';
  vm.issueDesc = '';
  vm.createDate ='';
  vm.password ='';
  vm.successMsg = false;
  vm.repoErrMsg = false;
  vm.pswdErrMsg = false;
  vm.titleErrMsg = false;
  vm.descErrMsg = false;
  vm.dateErrMsg = false;
  vm.wrongPwdMsg = false;

  vm.resData = getUserRepoService.getRepoData();
  var username = $window.sessionStorage.getItem('username');
 
  $("#createDate").datepicker({
      dateFormat: 'dd-mm-yy',
      minDate: 0,
      changeMonth: true
    });
  vm.createIssue = function(frm,repoItem){ 
   
    if(frm.$valid){
    
     vm.createDate = $("#createDate").val();
     vm.issueDescDate  =  vm.issueDesc+"***"+vm.createDate;
    var issueData = JSON.stringify({title:vm.issueTitle,body:vm.issueDescDate});
    var encodeStr = btoa( username +":"+ vm.password);
     console.log(issueData);   

     $http({
            url: "https://api.github.com/repos/"+username+"/"+repoItem+"/issues",
            method: 'POST',
            data: issueData,
            headers: {'Content-Type': 'application/json','Authorization': 'Basic '+encodeStr+"=" }
          }).then(function successCall(res){
              vm.wrongPwdMsg = false;
              vm.successMsg = true;
            $timeout(function(){
               $location.path("/list")
            },3000);
          },function errorCall(errRes){
              vm.wrongPwdMsg = true;
          });
    }
    else{
       
      if(typeof repoItem === 'undefined'){
          vm.repoErrMsg = true;
      }
      if( vm.password ==''){
          vm.pswdErrMsg = true;
      }else {
        vm.pswdErrMsg = false;
      }if( vm.issueTitle ==''){
          vm.titleErrMsg = true;
      }else {
        vm.titleErrMsg = false;
      }if( vm.issueDesc ==''){
          vm.descErrMsg = true;
      }else {
        vm.descErrMsg = false;
      }if( vm.createDate ==''){
          vm.dateErrMsg = true;
      }else {
        vm.dateErrMsg = false;
      }
    }

  }
}]);
})();