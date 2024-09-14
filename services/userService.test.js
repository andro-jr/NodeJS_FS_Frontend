const service = require("./userService");

jest.mock("./userService");

describe("Test service calls backend", () => {
  test("Post resgister should return user", async () => {
    let id = Math.floor(Math.random() * 100);
    const body = {
      firstName: "Eric",
      lastName: "Clarke",
      address: "123 Mile Road",
      city: "Topeka",
      state: "KS",
      zipCode: "12345",
      email: `email${id}@gmail.com`,
      password: "123456789a",
    };

    const user = await service.postRegister(body);

    expect(user.data.message).toEqual("Successful Registration");
    expect(user.data.user.firstName).toEqual("Eric");
    expect(user.data.user.lastName).toEqual("Clarke");
    expect(user.data.user.address).toEqual("123 Mile Road");
    expect(user.data.user.city).toEqual("Topeka");
    expect(user.data.user.state).toEqual("KS");
    expect(user.data.user.zipCode).toEqual("12345");
  });

  test("Post Login should return user", async () => {
    let id = Math.floor(Math.random() * 100);
    const body = {
      email: `prabin21panta@gmail.com`,
      password: "123456789a",
    };

    const user = await service.postLogin(body);

    expect(user.data.message).toEqual("Log in successfull!");
    expect(user.data.user.firstName).toEqual("Prabin");
    expect(user.data.user.lastName).toEqual("pant");
    expect(user.data.user.address).toEqual("Tahachal");
    expect(user.data.user.city).toEqual("Kathmandu");
    expect(user.data.user.state).toEqual("Oklahama");
    expect(user.data.user.zipCode).toEqual("12345");
    expect(user.data.user.email).toEqual(`prabin21panta@gmail.com`);
    expect(user.data.logged).toBe(true);
  });
});
