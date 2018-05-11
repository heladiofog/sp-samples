/* Mocha Testing pattern:
	1. describe to say what you are testing -for example:"describe how array should work"
	2. Use a number of "it" functions to create individual testa.
		2.1. each "it" should explain one specific behavior - for example: "it should start empty"
	*/ 
// setup the assert variable
var assert = chai.assert;

// 'describe' is used to group individual tests
describe('Test Empty Array', function() {
	// it is used to create the actual test
	// first parameter is a descriotion for the test
	it('(It) should start empty', function() {
		// (SUT) System Under Test: Something you are testing.

		// Test implementation code goes here
		var arr = [];
		// Validation: the actual value, expected value [, some message]
		assert.equal(arr.length, 0, "Array lenght was not 0");
		// More complex: http://www.chaijs.com/api/bdd/
	});

	// We can have more its here
	it('(It) should not start empty', function() {
		// Test implementation code goes here
		var arr = [];

		assert(arr.length > 0, "Array lenght was 0 but should have been greater than 0.");
	});
});

