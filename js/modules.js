var moduleScripts = {};

//
// Module script loader
//

function executeModuleScripts(elem, templateName) {
    var templateNamePath = templateName.split('.');
    var selected = moduleScripts;
    var haveFunctions = true;

    for (i = 0; i < templateNamePath.length; i++) {
      if (! selected[templateNamePath[i]]) {
        haveFunctions = false;
        break;
      }
      selected = selected[templateNamePath[i]];
    }
    if (haveFunctions && selected.length) {
      for (j = 0; j < selected.length; j++) {
        selected[j].call(elem, elem);
      }
    }
}

//
// Sidebar
//

function resizeSidebar() {
    var sidebarHeight = Math.max($('.main').outerHeight(), $(window).height() - $('.sidebar').offset().top);
    $('.sidebar').height(sidebarHeight);
}

function postModuleLoad (elem, templateName) {
  executeModuleScripts(elem, templateName);
  $(document).foundation();
  resizeSidebar();
}