$(document).ready(function() {

	//
	// Sidebar resize
	//

	function resizeSidebar() {
		var sidebarHeight = Math.max($('.central-content').height(), $(window).height() - $('.sidebar').offset().top);
		$('.sidebar').height(sidebarHeight);
	}

	$(window).resize(function() {
		resizeSidebar();
	});

	//
	// Sidebar dropdowns
	//

	$('.sidebar-navigation-item-header').on('click', function() {
		$(this).next('.sidebar-sub-navigation').slideToggle();
	});

	//
	// Module loader AJAX
	//

	function loadModule(templateName) {
		$.get('templates/' + templateName + '.html', function(data) {
			$('.main').html(data);
			resizeSidebar();
		}).fail(function() {
			if (templateName) {
				$('.main').html('<h3>Error: could not load ' + templateName + '</h3>');
			} else {
				$('.main').html('<h3>Error: the target page must be defined</h3>');
			}
			resizeSidebar();
		});
	}

	$('.module-loader').on('click', function() {
		var templateName = $(this).attr('data-target');
		loadModule(templateName);
	});

	loadModule('home/notification-feed');

	//
	// Mobile navigation bar
	//

	$('.mobile-nav-options-button').on('click', function() {
		$('.mobile-nav-wrapper').slideToggle();
	});

});