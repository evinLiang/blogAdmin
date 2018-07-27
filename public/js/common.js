jQuery(document).ready(function($) {
	$(".navbar-burger").click(function(event) {
		$("#navbarExampleTransparentExample").slideToggle("slow");
	});	
	$(".switchBtn").click(function(event) {
		$(".imgPanel").toggleClass('imgPanelHide');
		$(this).toggleClass('switchBtnHide');
	});
});
