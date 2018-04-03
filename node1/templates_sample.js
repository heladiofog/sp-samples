/* jshint esversion: 6 */
function upcase(strings, ...values) {
    return values.map(name => name[0].toUpperCase() + name.slice(1))
        .join(' ') + strings[2];
}

const person = {
    first: 'brendan',
    last: 'jeijei',
    age: 31,
    position: 'CEO of Tezca Software',
};

const { first, last } = person;

console.log(upcase`${first} ${last} is the creator of JavaScript!`);

