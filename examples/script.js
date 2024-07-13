function request(input) {
  return new Promise((resolve, reject) => {
    input ? resolve("request data") : reject("reject request");
  });
}

let promise = request(false);

// promise.then(
//   function (data) {
//     console.log(data);
//   },
//   function (error) {
//     console.error(error);
//   }
// );

// Example 2

promise

  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error(data);
  });
