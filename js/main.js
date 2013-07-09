$(document).ready(function() {

	//
	// Sidebar resize
	//

	function resizeSidebar() {
		var sidebarHeight = Math.max($('.main').outerHeight(), $(window).height() - $('.sidebar').offset().top);
		$('.sidebar').height(sidebarHeight);
	}

	$(window).resize(function() {
		resizeSidebar();
	});

	$(document).resize(function() {
		resizeSidebar();
	});

	$('.main').resize(function() {
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
		$('.main').html('<h3>Loading...</h3>');
		$.get('modules/' + templateName + '.html', function(data) {
			$('.main').html(data);
		}).fail(function() {
			$('.main').html('<h3>Error: could not load ' + templateName + '</h3>');
		});
		resizeSidebar();
	}

	$('.module-loader').on('click', function() {
		var templateName = $(this).attr('data-target');
		if (!templateName) {
			$('.main').html('<h3>Error: the target page must be defined</h3>');
		} else {
			location.hash = '#' + templateName;
			loadModule(templateName);
		}
	});

	if(window.location.hash) {
		var hash = window.location.hash.substring(1);
		loadModule(hash);
	} else {
		loadModule('home/notification-feed');
	}

	//
	// Mobile navigation bar
	//

	$('.mobile-nav-options-button').on('click', function() {
		$('.mobile-nav-wrapper').slideToggle();
	});

	$('.mobile-nav-wrapper .module-loader').on('click', function() {
		$('.mobile-nav-wrapper').slideUp();
	});

});