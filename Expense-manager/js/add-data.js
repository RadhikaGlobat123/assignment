$(function() {
	$("#datepay").datepicker({
		dateFormat: 'dd-mm-yy'
	});

	$("#datepay").on("change",function(){
		var curDate = $("#datepay").val();
		$("#daterec").datepicker({
			dateFormat: 'dd-mm-yy',
			minDate: curDate
		}).removeClass("hasDatepicker");
	});
	
	$('#recur').click(function() {
	    if($(this).is(':checked')) {
	       $("#daterec").show();
	    }
	    else{
	        $("#daterec").hide();
	        $("#daterec").val("");
	   		$("#daterecErr").html("");
	   		}
	});

	$("#add").on("click", function(event){
		var payVal = $("#payee").val();
		var amtVal = $("#amt").val();
		var dateVal = $("#datepay").val();
		var payTypeVal= $("input[type='radio']:checked").val();
		var catVal = $("#category option:selected").val();
		var dateRecVal = $("#daterec").val();

		var exp = new expense();
		exp.setPayee(payVal);
		exp.setAmount(amtVal);
		exp.setDatePay(dateVal);
		exp.setPayType(payTypeVal);
		exp.setCategory(catVal);
		exp.setDateRec(dateRecVal);

		if($('#recur').is(":checked")){ 
			if(payVal!="" && amtVal!="" && dateVal!="" && catVal!="none" && dateRecVal!=""){
				AddData.arrayexp.push(exp);
			}
		}else {
			if(payVal!="" && amtVal!="" && dateVal!="" && catVal!="none"){
				AddData.arrayexp.push(exp);
			}
		}
		var count = 0;
		$("tbody").empty();


		for(var i=0;i<AddData.arrayexp.length;i++){
			count= count+1;
			$("tbody").append("<tr id = 'tr_"+i+"'><td>"+count+"</td><td>"+AddData.arrayexp[i].getPayee()+"</td><td>"+AddData.arrayexp[i].getAmount()+"</td><td>"+AddData.arrayexp[i].getDatePay()+"</td><td>"+AddData.arrayexp[i].getPayType()+"</td><td>"+AddData.arrayexp[i].getCategory()+"</td><td>"+AddData.arrayexp[i].getDateRec()+"</td><td><a href='#' id='edit_"+i+"' onclick='editData(this.id)'>Edit</a></td></tr>");
		}
	});	

	$("#save").on("click",function(){
		
		var saveId = $("#dataId").val();
		var payValEdit = $("#payee").val();
		var amtValEdit = $("#amt").val();
		var dateValEdit = $("#datepay").val();
		var payTypeValEdit = $("input[type='radio']:checked").val();
		var dateRecValEdit = $("#daterec").val();
		var catVal = $("#category option:selected").val();
		var $trId = $("#tr_"+saveId);

		AddData.arrayexp[saveId].setPayee(payValEdit);
		AddData.arrayexp[saveId].setAmount(amtValEdit);
		AddData.arrayexp[saveId].setDatePay(dateValEdit);
		AddData.arrayexp[saveId].setCategory(catVal);
		AddData.arrayexp[saveId].setPayType(payTypeValEdit);
		AddData.arrayexp[saveId].setDateRec(dateRecValEdit);

		console.log(AddData.arrayexp[saveId].getPayee());

		$("#tr_"+saveId).find("td").eq(1).html(AddData.arrayexp[saveId].getPayee());
		$trId.find("td").eq(2).html(AddData.arrayexp[saveId].getAmount());
		$trId.find("td").eq(3).html(AddData.arrayexp[saveId].getDatePay());
		$trId.find("td").eq(4).html(AddData.arrayexp[saveId].getPayType());
		$trId.find("td").eq(5).html(AddData.arrayexp[saveId].getCategory());
		$trId.find("td").eq(6).html(AddData.arrayexp[saveId].getDateRec());
	});

	$("#addNew").on("click",function(){
		$(this).hide();
		$("#save").hide();
		$("#add").show();
		$("#payee").val("");
		$("#amt").val("");
		$("#datepay").val("");
		$("input:radio[value='income']").prop('checked', true);
		$("#daterec").val("");
	});
});

function editData(id){
	$("#add").hide();
	$("#save").show();
	$("#addNew").show();

	var idSplit = id.split("_");
	var expid = idSplit[1];
	$("#dataId").val(expid);

	var editPayee = AddData.arrayexp[expid].getPayee();
	var editAmount = AddData.arrayexp[expid].getAmount();
	var editPayType = AddData.arrayexp[expid].getPayType();
	var editCategory = AddData.arrayexp[expid].getCategory();
	var editDatePay = AddData.arrayexp[expid].getDatePay();
	var editDateRec = AddData.arrayexp[expid].getDateRec();

	$("#payee").val(editPayee);
	$("#amt").val(editAmount);
	$("input:radio[value='"+editPayType+"']").prop('checked', true);
	$("#category").find("option[value='"+editCategory+"']").prop("selected",true);
	$("#datepay").val(editDatePay);
	$("#daterec").val(editDateRec);	
}