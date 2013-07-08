$(document).ready(function() {

	//
	// Functions
	//

	function resizeSidebar() {
		$('.sidebar').height($('.central-content').height());	
	}

	function updateMainContent(templateName) {
		$.get('templates/' + templateName + '.html', function(data) {
			$('.main').html(data);
			resizeSidebar();
		}).fail(function() {
			alert('There was an error loading the content');
		});
	}

	//
	// Event handlers
	//

	$('.mobile-nav-options-button').on('click', function() {
		$('.mobile-nav-wrapper').slideToggle();
	});

	$('.sidebar-navigation-item-header').on('click', function() {
		$(this).next('.sidebar-sub-navigation').slideToggle();
	});

	$('.sidebar-sub-navigation-item-header').on('click', function() {
		var templateName = $(this).attr('id');
		updateMainContent(templateName);
	});

	$('.header-logo-inner').on('click', function() {
		updateMainContent('notification-feed');
	});

	$(window).resize(function() {
		resizeSidebar();
	});

	updateMainContent('notification-feed');
});