angular.module("gitApp",['ngRoute','ngProgress','toaster','720kb.datepicker']);

function navCtrl($scope, $route) {
//we set $route to  we have access to it in the HTML
$scope.$route = $route;
}

