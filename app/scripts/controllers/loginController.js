//var gitApp = angular.module("gitApp");

angular.module("gitApp").controller("loginController", ['$scope','$http','$location','$routeParams','$window','getUserRepoService','getUserDataFactory','ngProgressFactory',function($scope,$http,$location,$routeParams,$window,getUserRepoService,getUserDataFactory,ngProgressFactory){
	
	var vm = this;
	vm.progressbar = ngProgressFactory.createInstance();
   
	function initData(){
		vm.username = '';
		vm.password = '';
		vm.resData = [];
		vm.userData = [];
		vm.userErrMsg = false;
		vm.noRepoMsg = false;
		vm.noUserMsg = false;
		vm.showRepo = true;
		var username = '';
		vm.status = false;
	}

	initData();
	
	vm.getInfo = function(frm){

		//if(frm.$valid){
			vm.progressbar.start();

			vm.userErrMsg = false;
			vm.noUserMsg = false;

			getUserDataFactory.setUserName(vm.username);
			username = getUserDataFactory.getUserName();
			getUserDataFactory.setUserPassword(vm.password);
	
			getUserRepoService.getUserRepo(username).then(function(res){
				vm.progressbar.complete();
				vm.showRepo = false;
				if(res.length==0){
					vm.noRepoMsg = true;
				}
				else{
					vm.success = true;
					vm.gitUser = res;
					vm.noRepoMsg = false;
					for(var i=0;i< vm.gitUser.length; i++){				
						vm.resData.push({name:vm.gitUser[i].name,value:vm.gitUser[i].name});
					}
					getUserDataFactory.setRepoData(vm.resData);
					//$location.path("/list");
				}
			},function(errRes){
				vm.noRepoMsg = false;
				vm.userErrMsg = true;	
			});
		/*}
		else{
			vm.noUserMsg = true;
		}*/
		/*vm.userData.push(vm.username,vm.password);
		getUserRepoService.storeUserData(vm.userData);

		var encodeStr = btoa(vm.username+":"+vm.password);
		getUserRepoService.getUserRepo(vm.username).then(function(res){

			vm.gitUser = res;
			for(var i=0;i< vm.gitUser.length; i++){				
				vm.resData.push({name:vm.gitUser[i].name,value:vm.gitUser[i].name});
			}
			getUserRepoService.setRepoData(vm.resData);
			$location.path("/list");
		},function(errRes){
			vm.userErrMsg = true;
			console.log(errRes);
		});*/
	}

	vm.getIssue = function(sItem){
		
		getUserDataFactory.setUserRepo(sItem.name);
     	var arr = [];
     
     	getUserRepoService.getAllIssues(username,sItem.name).then(function(res){
      		var issueData = res;
  			vm.show = true;
  
      		if(issueData.length>0){
      			_.each(issueData,function(data,i){
      				arr.push([]);
      				var descDate = data.body.split("***");	
	      			var desc = descDate[0];
	      			var createDate = '';
	      			if(typeof descDate[1] === "undefined"){
	      				createDate = "N/A";
	      			}else{
      					createDate = descDate[1];
      				}
      				
					if(data.state == 'closed'){
						vm.showState = true;
					}
					else{
						vm.showState = false;
					}
	      			arr[i].push(data.body);
      				arr[i].push(data.title);
      				arr[i].push(data.assignee);
      				arr[i].push(data.number);
      				arr[i].push(desc);
      				arr[i].push(createDate);
      				arr[i].push(data.state);	
      				arr[i].push(data.comments);
      				arr[i].push(vm.showState);
      			});
      			
	      	/*	for(var i=0; i<issueData.length;i++){
	      			
	      			arr.push([]);
	      			
	      			var descDate = issueData[i].body.split("***");	
	      			var desc = descDate[0];
	      			var createDate = '';
	      			if(typeof descDate[1] === "undefined"){
	      				createDate = "N/A";
	      			}else{
      					createDate = descDate[1];
      				}
      				
					if(issueData[i].state == 'closed'){
						vm.showState = true;
					}
					else{
						vm.showState = false;
					}
	      			arr[i].push(issueData[i].body);
      				arr[i].push(issueData[i].title);
      				arr[i].push(issueData[i].assignee);
      				arr[i].push(issueData[i].number);
      				arr[i].push(desc);
      				arr[i].push(createDate);
      				arr[i].push(issueData[i].state);	
      				arr[i].push(issueData[i].comments);
      				arr[i].push(vm.showState);
	      		
	      	}*/
	      		vm.showErrRow = false;
	  		}else if(issueData.length==0) {
	  			vm.showErrRow = true;
	  		}
	  		
	  		vm.descriptions = arr;
	  		getUserDataFactory.storeDescription(vm.descriptions);
	  		$location.path("/list");
      	});
     
      }
	
}]);
