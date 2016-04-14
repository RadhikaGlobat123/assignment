angular.module('CustomDateFilterModule', [])
       .filter('dateFilter', [function () {
    return function (inputData, selectedDate,selectedToDate) { 
      var showResult = [];
      var ret;
      //if(!angular.isUndefined(selectedState) && !angular.isUndefined(selectedToDate)){
       angular.forEach(inputData,function(value){
         
         var mmarrdate = moment(value[5],'DD-MM-YYYY').format('YYYY/MM/DD');
         var arrdate = new Date(mmarrdate);
         
         var mmselFromDate = moment(selectedDate,'DD-MM-YYYY').format('YYYY/MM/DD');
         var selFromDate = new Date(mmselFromDate);

         var mmselToDate = moment(selectedToDate,'DD-MM-YYYY').format('YYYY/MM/DD');
         var selToDate = new Date(mmselToDate);

        
          if(arrdate>=selFromDate && arrdate<=selToDate){
            // console.log(value[5],selectedDate);
            
            showResult.push(value);
           
          }else{
      //   showResult.push('');
          } 
       });
       
       return showResult;
     /*}else{
        return inputData;
     }*/
       
    };
}]);