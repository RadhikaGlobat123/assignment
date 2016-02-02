function expense() {
	var payee;
	var amount;
	var datePay;
	var payType;
	var category;
	var dateRec;

	this.setPayee =  function(payee){
		this.payee =  payee;

	}
	this.getPayee = function() {
		return this.payee;
	}
	this.setAmount =  function(amount){
		this.amount =  amount;

	}
	this.getAmount = function() {
		return this.amount;
	}
	this.setDatePay =  function(datePay){
		this.datePay =  datePay;

	}
	this.getDatePay = function() {
		return this.datePay;
	}
	this.setPayType =  function(payType){
		this.payType =  payType;

	}
	this.getPayType = function() {
		return this.payType;
	}
	this.setCategory =  function(category){
		this.category =  category;

	}
	this.getCategory = function() {
		return this.category;
	}
	this.setDateRec =  function(dateRec){
		this.dateRec =  dateRec;

	}
	this.getDateRec = function() {
		return this.dateRec;
	}
}

