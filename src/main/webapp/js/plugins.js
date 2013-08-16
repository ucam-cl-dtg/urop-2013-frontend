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

function refreshNotificationCount(section) {
	for (var i = 0; i < section.length; i++) {
		$.ajax({
        	type: 'GET',
        	url: '/dashboard/api/notifications',
        	data: {'section': section[i]},
        	success: function(data) {
        		if (data.error || data.formErrors) {
        			console.log("Could not refresh notification count");
        		} else {
        			if (data.total === 0) {
        				$('.sidebar-navigation-item[data-section=' + data.section + '] .sidebar-navigation-item-header .notifications').text("");
        			} else {
        				$('.sidebar-navigation-item[data-section=' + data.section + '] .sidebar-navigation-item-header .notifications').text(data.total);
        			}
        		}
        	}, 
        	error: function() {
        		console.log("Could not refresh notification count");
        	}
		});	
	}
}