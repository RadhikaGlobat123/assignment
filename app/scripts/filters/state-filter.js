angular.module('CustomFilterModule', [])
       .filter('stateFilter', [function () {
    return function (inputData, selectedState) {  
        var filteredData = [];
        if(!angular.isUndefined(selectedState)){
          if(selectedState=="All"){
            return inputData;
          }else{
           angular.forEach(inputData, function (client) {       
                if(client.indexOf(selectedState) !== -1) {
                   filteredData.push(client);   
                }
            });
           return filteredData;
           }
        }else{
            return inputData;
        }    
    };
}]);