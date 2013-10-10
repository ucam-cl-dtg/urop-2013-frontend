var BASE_PATH = "/";
var ROUTER_OPTIONS = {
// pushState: true
};
var moduleScripts = {};

//
// Module-specific script loader
//

function executeModuleScripts(elem, templateName) {
	var templateNamePath = templateName.split('.');
	var selected = moduleScripts;
	var haveFunctions = true;

	for ( var i = 0; i < templateNamePath.length; i++) {
		if (!selected[templateNamePath[i]]) {
			haveFunctions = false;
			break;
		}
		selected = selected[templateNamePath[i]];
	}
	if (haveFunctions && selected.length) {
		for ( var j = 0; j < selected.length; j++) {
			selected[j].call(elem, elem);
		}
	}
}

//
// Call JavaScript after module has been loaded
//

function postModuleLoad(elem, templateName) {
	executeModuleScripts(elem, templateName);
	elem.foundation();
}

function fixLinks(router) {
	if (ROUTER_OPTIONS.pushState === undefined
			|| ROUTER_OPTIONS.pushState === null)
		return;
	$(document)
			.on(
					'click',
					'a',
					function(evt) {
						if (evt.ctrlKey)
							return;

						var href = $(this).attr('href');
						var protocol = this.protocol + '//';
						var dataBypass = $(this).attr('data-bypass');
						var absolute = $(this).attr('data-absolute');
						if (dataBypass != undefined && dataBypass != null) {
							return true;
						}

						if (href == undefined || href == null || href == "#")
							return;

						if (absolute != undefined && absolute != null) {
							var shouldNotReload = href.slice(0,
									CONTEXT_PATH.length) == CONTEXT_PATH;
							if (shouldNotReload) {
								href = href.slice(CONTEXT_PATH.length);
								router.navigate(href, {
									trigger : true
								});
							} else {
								return;
							}
						}

						href = href.slice(0, CONTEXT_PATH.length) == CONTEXT_PATH ? href
								.slice(CONTEXT_PATH.length)
								: href;

						if (href.slice(protocol.length) !== protocol) {
							evt.preventDefault();
							if (href[0] == "#")
								href[0] = "/";
							if (href[0] == "/")
								href = href.slice(1);
							if (href == Backbone.history.fragment)
								Backbone.history.fragment = null;
							router.navigate(href, {
								trigger : true
							});
						}
					});
}

//
// Router
//

function Router(routes) {
	var router = new Backbone.Router;

	for ( var route in routes) {
		var value = routes[route];
		config(router, route, value);
	}

	initializeHistory(router);
	return router;
}

function initializeHistory(router) {
	var ok = Backbone.history.start(ROUTER_OPTIONS);
	fixLinks(router);
	// Current page wasn't matched by the router
	if (!ok) {
		$('.main').html(
				"<h3>404 &ndash; page not found</h3><p>" + location
						+ " was not found.</p>");
	}
}

// Create a proper Backbone route from a given route

function config(router, route, value) {
	if ((typeof value != "string") && (typeof value != "function"))
		throw new Error("Unsupported type for route: " + route);

	return router.route(route + "(/)", route, function() {
		loadModule($('.main'), Backbone.history.getFragment()
				+ window.location.search, value);
	});
}

function prepareURL(url) {
	return getLocation(url);
}
function getLocation(location) {
	if (location[0] == "#" || location[0] == "/")
		location = location.slice(1);
	return window.location.protocol + "//" + window.location.host + BASE_PATH
			+ location;
}

function getRouteParams() {
	var fragment = Backbone.history.fragment, routes = _.map(
			Backbone.history.handlers, function(x) {
				return x.route;
			});
	var matched = _.find(routes, function(handler) {
		return handler.test(fragment);
	});

	return router._extractParameters(matched, Backbone.history.fragment);
}

function getTemplate(name) {
	var names = name.split('.');
	var res = window;
	for ( var i = 0; i < names.length; i++) {
		if (typeof(res) === "undefined") {
			return res;
		}
		res = res[names[i]];
	}
	return res;
}

function asyncLoad(elems) {
	elems
			.each(function(i) {
				var elem = $(elems[i]), data_path = getLocation(elem
						.attr("data-path")), template_name = elem
						.attr("template-name"), template_function = elem
						.attr("template-function"), template;

				if (template_function)
					template = getTemplate(template_function);
				else
					template = template_name;

				$.get(data_path, function(json) {
					applyTemplate(elem, template, json);
				}).fail(function(err) {
					console.log(err);
					applyTemplate(elem, template, {});
				});
			});
}
var SOY_GLOBALS = {};
function applyTemplate(elem, template, data, appendFunc) {
	if (typeof (appendFunc) === "undefined")
		appendFunc = "html";

	var templateFunc;
	var templateName;
	if (typeof template == "function") {
		templateName = template(data);
	} else { // if (typeof template == "string")
		templateName = template;
	}
	if (data.redirectTo) {
		router.navigate(data.redirectTo, {
			trigger : true
		});
		return;
	}
	templateFunc = getTemplate(templateName);
	if (typeof(templateFunc) === "undefined") {
		elem.html("<h3>An error occurred: failed to load template "+templateName);
	}
	else {
		elem[appendFunc](templateFunc(data, null, SOY_GLOBALS));
		postModuleLoad(elem, templateName);
		asyncLoad(elem.find(".async-loader"));
	}
}

//
// template can either be a string with the name of the template
// or a function that returns the name of the template.

var lastMainRequestTime = 0;
function loadModule(elem, apiPath, template, callback) {
	var location = getLocation(apiPath);
	var thisRequestTime = new Date().getTime();

	if (elem.hasClass("main")) {
		lastMainRequestTime = thisRequestTime;
	}

	$.get(location, function(data) {
		if (!elem.hasClass("main") || lastMainRequestTime == thisRequestTime) {
			applyTemplate(elem, template, data);
			if (callback)
				callback.call(elem);
		}
	}).fail(function(data) {
		displayError(data, elem);
	});
}

function displayError(data, elem) {
	obj = $.parseJSON(data.responseText);
	if (obj.message) {
		t = "<h3>An error occurred: " + obj.message + "</h3>";
		if (obj.cause) {
			t += "<p>Reasons reported by server:</p><ul>";
			c = obj.cause;
			while (c) {
				t += "<li>" + c.message + "</li>";
				c = c.cause;
			}
			t += "</ul>";
		}
		elem.html(t);
	} else if (data.status == 401) {
		elem
				.html("<h3>401 &ndash; not authorised</h3><p>You are not authorised to view this page.</p>");
	} else if (data.status == 404) {
		elem
				.html("<h3>404 &ndash; page not found</h3><p>Page was not found.</p>");
	} else if (data.status == 500) {
		elem.html("<h3>500 &ndash; Internal server error</h3>");
	} else if (data.status) {
		elem.html('<h3>Error (' + data.status
				+ '): could not load this page.</h3>');
	} else {
		elem.html('<h3>Unknown error: could not load this page.</h3>');
	}
}
