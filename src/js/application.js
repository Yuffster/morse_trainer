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