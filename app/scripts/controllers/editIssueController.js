var gitApp = angular.module("gitApp");

angular.module("gitApp").controller("editIssueController", ['$http','$location','$routeParams','$window','getUserRepoService','$timeout','getUserDataFactory','toaster',function($http,$location,$routeParams,$window,getUserRepoService,$timeout,getUserDataFactory,toaster){
	
	var vm = this;

	function initData(){
		vm.pwdErr = false;
		vm.wrongPwd = false;
		vm.commentErrMsg = false;
		vm.editSubmit = '';
		vm.commetsArr = [];
		vm.comment = '';
		vm.noComment = false;
		vm.descriptions = getUserDataFactory.getDescription();
		
		vm.repo = $routeParams.repo;
		vm.number = $routeParams.id;
		vm.states = [{issueState: "open"}, {issueState: "closed"}];
	}

	initData();
	var username = getUserDataFactory.getUserName();
	var password = getUserDataFactory.getUserPassword();
	var repo = getUserDataFactory.getUserRepo();

	getUserRepoService.getIssueService(username,repo,vm.number).then(function suceessCall(res) {
      vm.editissueTitle = res.title;
      issueDescsplit = res.body.split("***");
      vm.issueDesc = issueDescsplit[0];
      vm.issueCreateDate = issueDescsplit[1];
      vm.assignee =  res.assignee;
      vm.selState = res.state;    
    },function failCall(errRes){
      //console.log(errRes);
    });

	
	
	vm.successMsg = false;
	
	getUserRepoService.getCommentService(username,repo,vm.number).then(function(res){
	
		if(res.length>0){
	      	vm.commetsArr = res;
	    }
      else{
      	vm.noComment = true;
      }
	},function(errRes){

	});
	
	vm.updateIssue = function(frm){
		
		vm.issueDescDate  =  vm.issueDesc+"***"+vm.issueCreateDate;
		
		if(frm.$valid){
			
			vm.pwdErr = false;
			var issueData = JSON.stringify({title:vm.editissueTitle,body:vm.issueDescDate,state:vm.selState});
			console.log(issueData);
		  	var encodeStr = btoa( username +":"+ password );
		  	
		  	var i=0;
		  	
		  	if(vm.comment==""){
		       	i=1;
		    }

		    getUserRepoService.updateIssueService(issueData,encodeStr,username,vm.repo,vm.number).then(function(res) {
		    	vm.wrongPwd = false;
		        vm.successMsg = true;
		        if(i==1){
		        	toaster.success({title: "Edit Issue", body:"Issue edited succesffuly"});
			        $timeout(function(){
			          $location.path("/list");
			       },3000);
		        }
		        
		    },function errorCall(errRes){
		    	vm.wrongPwd = true;
		    	toaster.error("Error", "Wrong Password.Please logout and try again");
		    });
		    if(i==0){
		    	var commentData = JSON.stringify({body:vm.comment});
		    	getUserRepoService.updateCommentService(commentData,encodeStr,username,vm.repo,vm.number).then(function(res){
		    		vm.successMsg = true;
		    		toaster.success({title: "Edit Issue", body:"Issue edited succesffuly"});
			        $timeout(function(){
			          $location.path("/list");
			       },3000);
		    	},function errorCall(errRes){
			    	vm.wrongPwd = true;
			    	toaster.error("Error", "Wrong Password.Please logout and try again");
		   		});
		    }
		}
		else{
			vm.editSubmit = true;
			vm.wrongPwd = false;
			if(vm.check=='yes'){
		        if(vm.comment==""){
		          vm.commentErrMsg = true;
		        }else{
		          vm.commentErrMsg = false;
		        }
		        
     		}
		}
		 
	}
	vm.checkPassword = function(){
		vm.wrongPwd = false;
	}
	vm.cancelIssue = function(){
		$location.path("/list");
	}
	vm.logout = function(){
		$location.path("/");
	}
}]);
