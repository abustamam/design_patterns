var ModernUtilsAdapter = {
	inherit: function(child,parent) {
		child.prototype = Object.create(parent.prototype);
		child.prototype.constructor = child;
	}
}

var FallbackUtilsAdapter = {
	inherit: function(child, parent) {
		var F = function() {}
		F.prototype = parent.prototype;
		child.prototype = new F;
    child.prototype.constructor = child;
	}
}

var utils;

if (~window.navigator.userAgent.indexOf("MSIE")) {
  utils = FallbackUtilsAdapter;
} else {
  utils = ModernUtilsAdapter;
}