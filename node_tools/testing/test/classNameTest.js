// Test for a more realistic problem
describe('Add CSS Class Test', function() {
	it('should add a class to element', function() {
		var element = { className: 'test-class'};

		addClass(element, 'test-class');

		assert.equal(element.className, 'test-class', 'already added to the element');
	});

	it('should not add a class which already exists');
});