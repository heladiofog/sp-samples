// Services, not a module
import 'whatwg-fetch';

// A new class with ES6
class HttpService {
  getProducts = () => {
    // 1
    let promise = new Promise((resolve, reject) => {
      // 2
      fetch('http://localhost:3004/product')
        .then(response => {
          // 4 At last
          // console.log(response.json());
          resolve(response.json());
          // reject("You suck!");    // Testing the promise sent 
        })
        .catch(error => {
          console.log("Error on promise " + error);
        });
    });
    // 3. Return the promise immediately
    return promise;
  }
}

export default HttpService;
// module.export = HttpService; // Old Style