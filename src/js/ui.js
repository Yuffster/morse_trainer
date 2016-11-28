window.addEventListener('blur', function() {
	document.body.classList.add('inactive');
});

window.addEventListener('focus', function() {
	document.body.classList.remove('inactive');
});