//
// Module script config
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

var moduleScripts = {
    'signapp': signupScripts,
    'questions': questionScripts,
    'handins': handinScripts,
};