const req = {
  body: {
    data: { username: "test", email: "test@test.com", password: "test" },
  },
};

const { data: { username, email, password } = {} } = req.body;
const data = req.body.data;
console.log(data);
console.log(username, email, password);
