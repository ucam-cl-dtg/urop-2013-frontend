$(document).ready(function() {

	//
	// Event handlers
	//

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

	//
	// Functions
	//

	function updateMainContent(templateName) {
		$.get('templates/' + templateName + '.html', function(data) {
			$('.main').html(data);
		}).fail(function() {
			alert('There was an error loading the content');
		});
	}

	updateMainContent('notification-feed');

});