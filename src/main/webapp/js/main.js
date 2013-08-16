$(document).ready(function() {

	//
	// Sidebar dropdowns
	//

	$('.sidebar-navigation-item-header').on('click', function() {
		$(this).next('.sidebar-sub-navigation').slideToggle();
	});
    
	//
	// Mobile navigation bar
	//

	$('.mobile-nav-options-button').on('click', function() {
		$('.mobile-nav-wrapper').slideToggle();
	});

	$('.mobile-nav-wrapper a').on('click', function() {
		$('.mobile-nav-wrapper').slideUp();
	});

	//
	// Essential event listeners
	//

	$(document).on('click', '.expand-sub-panel', function() {
		$(this).closest('.list-panel').siblings('.sub-panel')
			.slideToggle().toggleClass('hidden');
	});

	$(document).on('click', '.upload-marked-work', function() {
		$('.upload-marked-work-form').slideToggle();
	});

	//
	// Update notifications every 'refresh' seconds
	//
	
	var refresh = 30;
	setInterval(function() {
		refreshNotificationCount(['dashboard', 'signups', 'questions', 'handins']);
	}, refresh*1000);

	// AJAX loader
	/*
	$(document).ajaxStart(function() {
		$(".ajax-loader").clearQueue().fadeIn(200);
	}).ajaxComplete(function() {
		$(".ajax-loader").clearQueue().fadeOut(200);
	});
	*/
});
