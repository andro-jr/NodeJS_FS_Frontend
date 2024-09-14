exports.postRegister = async () => {
  console.log("Mocked Register");
  return Promise.resolve({
    data: {
      user: {
        firstName: "Eric",
        lastName: "Clarke",
        address: "123 Mile Road",
        city: "Topeka",
        state: "KS",
        zipCode: "12345",
      },
      message: "Successful Registration",
    },
  });
};

exports.postLogin = async () => {
  console.log("Mocked login");
  return Promise.resolve({
    data: {
      user: {
        firstName: "Prabin",
        lastName: "pant",
        address: "Tahachal",
        city: "Kathmandu",
        state: "Oklahama",
        zipCode: "12345",
        email: "prabin21panta@gmail.com",
      },
      message: "Log in successfull!",
      logged: true,
    },
  });
};
