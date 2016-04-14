var gitApp = angular.module("gitApp");
gitApp.service('getUserRepoService',function($http,$q) {
	
	var repo = this;
	var descarr = [];
	var userArr = [];
	var repoArr = [];
	repo.getUserRepo = function(name){
		var deffer = $q.defer();
		$http.get("https://api.github.com/users/"+name+"/repos").then(function suceessCall(response) {
			deffer.resolve(response.data);
      	},function errorCall(errResponse){
      		deffer.reject(errResponse.data);
      	});	
      	return deffer.promise;	
	}
	repo.getIssueService = function(username,repo,number){
		var deffer = $q.defer();
		$http.get("https://api.github.com/repos/"+username+"/"+repo+"/issues/"+number).then(function suceessCall(response) {
			deffer.resolve(response.data);
      	},function errorCall(errResponse){
      		deffer.reject(errResponse.data);
      	});	
      	return deffer.promise;	
	}

	repo.getAllIssues = function(username,sItem){
		var deffer1 = $q.defer();
		$http.get("https://api.github.com/repos/"+username+"/"+sItem+"/issues?state=all").then(function(res) {
			deffer1.resolve(res.data);
      	},function errorCall(errResponse){
      		deffer1.reject(errResponse.data);
      	});	
      	return deffer1.promise;
	}

	repo.getOpenIssues = function(username,sItem){
		var deffer = $q.defer();
		$http.get("https://api.github.com/repos/"+username+"/"+sItem+"/issues?state=open").then(function(res) {
			deffer.resolve(res.data);
      	},function errorCall(errResponse){
      		deffer.reject(errResponse.data);
      	});	
      	return deffer.promise;
	}

	repo.getClosedIssues = function(username,sItem){
		var deffer = $q.defer();
		$http.get("https://api.github.com/repos/"+username+"/"+sItem+"/issues?state=closed").then(function(res) {
			deffer.resolve(res.data);
      	},function errorCall(errResponse){
      		deffer.reject(errResponse.data);
      	});	
      	return deffer.promise;
	}

	repo.createIssueService = function(issueData,encodeStr,username,repo){
		var deff = $q.defer();
		$http({
	          url: "https://api.github.com/repos/"+username+"/"+repo+"/issues",
	          method: 'POST',
	          data: issueData,
	          headers: {'Content-Type': 'application/json','Authorization': 'Basic '+encodeStr+"=" }
	    }).then(function(res){
	       	deff.resolve(res.data);
	    },function(errRes){
	       	deff.reject(errRes.data);
	    });
       return deff.promise;
	}

	repo.updateIssueService = function(issueData,encodeStr,username,repo,number){
		console.log("https://api.github.com/repos/"+username+"/"+repo+"/issues/"+number);
		var deffer = $q.defer();
		$http({
	          url: "https://api.github.com/repos/"+username+"/"+repo+"/issues/"+number,
	          method: 'POST',
	          data: issueData,
	          headers: {'Content-Type': 'application/json','Authorization': 'Basic '+encodeStr+"=" }
	    }).then(function successCall(res){
	    	console.log(res);
	    	deffer.resolve(res.data);
	    },function errorCall(errRes){
	    	console.log(errRes)
	    	deffer.reject(errRes.data);
	    });   
	    return deffer.promise;	
	}

	repo.getCommentService = function(username,repo,number){
		var deffer = $q.defer();
		 $http.get("https://api.github.com/repos/"+username+"/"+repo+"/issues/"+number+"/comments").then(function(res){
		 	deffer.resolve(res.data);
		 },function(errRes){
		 	deffer.reject(errRes.data);
		 });
		  return deffer.promise;
	}

	repo.updateCommentService = function(commentData,encodeStr,username,repo,number){
		var deffer = $q.defer();
		 $http({
	            url: "https://api.github.com/repos/"+username+"/"+repo+"/issues/"+number+"/comments",
	            method: 'POST',
	            data: commentData,
	            headers: {'Content-Type': 'application/json','Authorization': 'Basic '+encodeStr+"=" }
	        }).then(function successCall(res){  
	           deffer.resolve(res.data);    
		   	},function errorCall(errRes){
		       deffer.reject(errRes.data);
		 	});

	 	return deffer.promise;	
	}
	repo.closeIssueService = function(issueData,encodeStr,username,repo,number){
		var deffer = $q.defer();
		 $http({
              url: "https://api.github.com/repos/"+username+"/"+repo+"/issues/"+number,
              method: 'POST',
              data: issueData,
              headers: {'Content-Type': 'application/json','Authorization': 'Basic '+encodeStr+"=" }
             }).then(function successCall(res){  
                deffer.resolve(res.data);
             },function errorCall(errRes){
                deffer.reject(errRes.data);
        });
    	return deffer.promise;   
	}

});

