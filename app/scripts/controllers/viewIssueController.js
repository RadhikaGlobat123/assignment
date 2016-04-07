
  var gitApp = angular.module("gitApp");

angular.module("gitApp").controller("viewIssueController", ['$scope','$http','$routeParams','getUserRepoService','$timeout','$location','$window','getUserDataFactory','toaster',function($scope,$http,$routeParams,getUserRepoService,$timeout,$location,$window,getUserDataFactory,toaster){
 
  var vm = this;
  
  function initData(){
    vm.resData=[];
    vm.descriptions = [];
    vm.issueTitle = '';
    vm.issueDesc = '';
    vm.comment='';
    vm.saveCommentMsg = false;
    vm.commentErrMsg = false;
    vm.pswdErrMsg = false;
    vm.wrongPwdMsg = false;
    vm.commentSave = false;
    var cissueDescsplit = [];
    vm.commetsArr = [];
    vm.noComment = false;

    vm.resData = getUserDataFactory.getRepoData();
    vm.descriptions = getUserDataFactory.getDescription();
    
    vm.repo = $routeParams.repo;
    vm.number = $routeParams.id;
  }
  
  initData();

  var username = getUserDataFactory.getUserName();
  var password = getUserDataFactory.getUserPassword();
  var repo = getUserDataFactory.getUserRepo();

   getUserRepoService.getIssueService(username,repo,vm.number).then(function suceessCall(res) {
      vm.issueTitle = res.title;
      vissueDescsplit = res.body.split("***");
      vm.issueDesc = vissueDescsplit[0];
      vm.vissueCreateDate = vissueDescsplit[1];
      vm.assignee =  res.assignee;
      vm.number = res.number;

    },function failCall(errRes){
      console.log(errRes);
    });


  getUserRepoService.getCommentService(username,repo,vm.number).then(function(res) {
      if(res.length>0){
        vm.commetsArr = res;
      }
      else{
        vm.noComment = true;
      }
  });

  vm.updateComment = function(frm){ 
   
    if(frm.$valid){
        var commentData = JSON.stringify({body:vm.comment});
        var encodeStr = btoa( username +":"+ password);  

        getUserRepoService.updateCommentService(commentData,encodeStr,username,repo,vm.number).then(function(res){
              vm.wrongPwdMsg = false;
              vm.saveCommentMsg = true;
              toaster.success({title: "success", body:"Comment added succesffuly"});
              $timeout(function(){
                $location.path("/list");
              },3000);
              
        },function(errRes){
            vm.pswdErrMsg = false;
            vm.wrongPwdMsg = true;
            toaster.error("Error", "Wrong Password.Please logout and try again");
        });

      }else{    
          if(vm.check=='yes'){
            if(vm.comment==""){
              vm.commentErrMsg = true;
            }else{
              vm.commentErrMsg = false;
            }
            if(vm.password==""){
              vm.pswdErrMsg = true;
            }else{ 
              vm.pswdErrMsg = false;
            }
          }
      }
    
  }
  vm.checkPassword = function(){
    vm.wrongPwdMsg = false;
  }
  vm.cancelIssue = function(){
    vm.check = 'no';
  }
  vm.backTolist = function(){
    $location.path("/list");
  }
  vm.logout = function(){
    $location.path("/");
  }
}]);
