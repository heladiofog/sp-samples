function addClass(el, newClass) {
	console.log(el.className);
	// Si no tiene la clase agregada
	if (el.className.indexOf(newClass) === -1) {
		el.className += newClass;
	}
}