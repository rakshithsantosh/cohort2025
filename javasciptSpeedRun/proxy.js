const user = {
  name: "rakshith",
  age: 20,
  password: "password",
};

const proxyUser = new Proxy(user, {
  get(target, prop) {
    if (prop == "passowrd") {
      throw new Error("Access Denied");
    }
    return target[prop];
  },
});

function negativeIndex(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      const index = Number(prop);
      if (index < 0) {
        return target[target.length + index];
      }
      return target[prop];
    },
    set(target, prop, value) {
      const index = Number(prop);
      if (index < 0) {
        target[target.length + index] = value;
      } else {
        target[prop] = value;
      }
      return true; // ✅ Must return true to confirm successful assignment
    },
  });
}

arr = [1, 2, 3, 4, 5];
let proxyarr = negativeIndex(arr);
proxyarr[-1] = 100;
console.log(proxyarr);
