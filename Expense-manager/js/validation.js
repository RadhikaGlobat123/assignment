$(function() {

	$("#add").on("click", function(event){

		var payVal = $("#payee").val();
		var amtVal = $("#amt").val();
		var dateVal = $("#datepay").val();
		var payTypeVal= $("input[type='radio']:checked").val();
		var dateRecVal = $("#daterec").val();
		
		if(payVal == ""){
			$("#payeeErr").html("Payee is required");
		}else {
			$("#payeeErr").html("");
		}
		if(amtVal == ""){dateVal
			$("#amtErr").html("Amount is required");
		}else {
			$("#amtErr").html("");
		}
		if(dateVal == ""){
			$("#datepayErr").html("Date is required");
		}else {
			$("#datepayErr").html("");
		}
		var catVal = $("#category option:selected").val();
		if(catVal=="none"){
			$("#catErr").html("category is required");
		}
		else{
			$("#catErr").html("");
		}

		if($("#recur").is(":checked")){
			if($("#daterec").val()==""){
				$("#daterecErr").html("Recurring is required");
			}else{
				$("#daterecErr").html("");
			}
		}else{
			$("#daterec").val("");
			$("#daterecErr").html("");
		}
	});
});