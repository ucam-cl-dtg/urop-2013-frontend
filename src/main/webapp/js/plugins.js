// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

function showNotificationError(element,message) {
	element.html("<div class='fixed-width-icon'>" +
			"<span data-tooltip class='has-tip' title='"+message+"'>" +
			"<i class='icon icon-warning'></i>" +
			"</span>" +
			"</div>");					
}

function refreshNotificationCount(section) {
	for (var i = 0; i < section.length; i++) {
		var sectionName = section[i];
		var element = $('.sidebar-navigation-item[data-section=' + sectionName + '] .sidebar-navigation-item-header .notifications');
		// use function to let-bind sectionName and element otherwise they get mutated by future iterations of this loop
		(function(s,e) {
			$.ajax({
				type: 'GET',
				url: '/dashboard/api/notifications',
				data: {'section': s},
				success: function(data) {
					if (data.error || data.formErrors || !data.success) {
						showNotificationError(e,data.message);
					} else {
						e.text(data.total == 0 ? "" : data.total);
					}
				}, 
				error: function(data) {
					obj = $.parseJSON(data.responseText);
					showNotificationError(e,obj.message);
				}
			});	
		})(sectionName,element);
	}
}