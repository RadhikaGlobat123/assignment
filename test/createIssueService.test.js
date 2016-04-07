describe('getUserRepoCreateIssueService',function(){
 var $controller;
 var getUserRepoService;
 var $httpBackend;

 beforeEach(module("gitApp"));

 beforeEach(inject(function($injector) {
  $httpBackend = $injector.get('$httpBackend');
  getUserRepoService = $injector.get('getUserRepoService');  
 }));

 afterEach(function() {
  $httpBackend.verifyNoOutstandingExpectation();
  $httpBackend.verifyNoOutstandingRequest();   
 });

 it('should create the issue', function(){

 var issueData = {"title":"New bug","body":"new bug found"};
 var username = "RadhikaGlobat123";
 var password = "Rsglobat123";
 var repo = "Test"
 var encodeStr = btoa(username+":"+password);
 
  $httpBackend.expectPOST('https://api.github.com/repos/RadhikaGlobat123/Test/issues',issueData).respond([{title:"new bug"}]);
  getUserRepoService.createIssueService(issueData,encodeStr,username,repo).then(function(data){
			expect(data).toEqual([{title:"new bug"}]);
	});
  	$httpBackend.flush();
  
 });
});