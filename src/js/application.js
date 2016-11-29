var __delegates = {};

function delegate(selector, event, fun) {

	var delegates = __delegates;

    if (!delegates[event]) {
        // Add a global event delegator for this action.
        document.body.addEventListener(event, function(evt) {
            // Check all the selectors for this item.
            for (let selector in delegates[event]) {
                // Bubble up the DOM tree in case the target is within a
                // delegated selector.
                (function bubble(el) {
                    if (el.matches(selector)) {
                        var funs = delegates.click[selector];
                        for (fun of funs) fun(evt, el);
                    }
                    // Recursion until we hit the root node.
                    var parent = el.parentNode;
                    if (parent && parent.matches) bubble(parent);
                }(evt.target))
            }
        });
        // Add this to our delegation object.
        delegates[event] = {};
    }

    // Ensure a callback list exists for this selector.
    if (!delegates[event][selector]) delegates[event][selector] = [];

    // Add this function to the list of selectors.
    delegates[event][selector].push(fun);

}

window.addEventListener('blur', function() {
	var cl = document.body.classList;
	cl.add('inactive');
	cl.remove('active');
});

window.addEventListener('focus', function(){
	var cl = document.body.classList;
	cl.add('active');
	cl.remove('inactive');
});

var ui = new UI();