var HmisReport = angular.module("HmisReport",['HmisReportCtrl','hmisReportServices']);


$(document).ready(function(){
	$('#dossierTabs a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	  console.log("click in tab " + e);
	})
});
