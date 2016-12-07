var ui = new UI();

window.addEventListener('blur', function() {
	var cl = document.body.classList;
	cl.add('inactive');
	cl.remove('active');
	ui.stop();
});

window.addEventListener('focus', function(){
	var cl = document.body.classList;
	cl.add('active');
	cl.remove('inactive');
});
