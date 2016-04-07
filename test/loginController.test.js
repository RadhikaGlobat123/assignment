describe('getUserRepo',function(){
	var $httpBackend;
	var getUserRepoService;

	beforeEach(module("gitApp"));

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		getUserRepoService = $injector.get('getUserRepoService');
	}));

	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should get repositories', function(){
		$httpBackend.expectGET('https://api.github.com/users/Rsglobat123/repos').respond([{name:'Test'},{name:'angular-js-example'}]);
		getUserRepoService.getUserRepo('Rsglobat123').then(function(data){
			expect(data).toEqual([{name:'Test'},{name:'angular-js-example'}]);
		});

		$httpBackend.flush();
	});
});