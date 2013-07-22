$(document).ready(function() {

	//
	// Sidebar resize
	//

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
    // Support for .module-loader
    //

    $(document).on("click", ".module-loader", function() {
        var location = $(this).attr('data-target');
        router.navigate(location, {trigger: true});
    });
    
	//
	// Mobile navigation bar
	//

	$('.mobile-nav-options-button').on('click', function() {
		$('.mobile-nav-wrapper').slideToggle();
	});

	$('.mobile-nav-wrapper .module-loader').on('click', function() {
		$('.mobile-nav-wrapper').slideUp();
	});

	//
	// Essential event listeners
	//

	$(document).on('click', '.expand-sub-panel', function() {
		$(this).closest('.list-panel').siblings('.sub-panel').slideToggle();
	});

	$(document).on('click', '.upload-marked-work', function() {
		$('.upload-marked-work-form').slideToggle();
	});

	$(document).on('click', '.star-question-button', function() {
		alert('This question (set) has been added to your favourites');
	});

	$(document).on('click', '.remove-question-from-set', function() {
		$(this).closest('.panel-wrapper').slideUp();
	});

	$(document).on('click', '.question-to-add-to-set', function() {
		$(this).children('.list-panel').toggleClass('success');
	});

	$(document).on('click', '.delete-member', function() {
		$(this).closest('.member-controls').slideUp();
	});

});