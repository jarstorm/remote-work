Messages = (function () {
    var methods = {};
    methods.showMessageOk = function(message) {
        $.growl(message, {
	        type: "growl",
          offset: {
        		x: 20,
        		y: 60
        	}
        });
    };
     methods.showMessageError = function(message) {
        $.growl(message, {
          type: "danger",
          offset: {
            x: 20,
            y: 60
          }
        });
    };

    return methods;
})();
