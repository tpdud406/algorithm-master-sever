const httpMocks = require("node-mocks-http");
const { login } = require("../controllers/auth.controller");
const ERROR = require("../../constant/error");
const User = require("../../models/User");
const userInfo = require("./__mocks__/userInfo.json");

let request, response, next;

beforeEach(() => {
  User.findOne = jest.fn();
  User.create = jest.fn();

  request = httpMocks.createRequest({
    method: "POST",
    url: "auth/login",
    body: userInfo,
  });
  response = httpMocks.createResponse();
  next = jest.fn();

  response.json(userInfo);
});

afterEach(() => {
  User.findOne.mockClear();
  User.create.mockClear();
});

describe("auth.controller", () => {
  it("Return 200 response code", () => {
    login(request, response, next);

    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toStrictEqual(userInfo);
    expect(next).toBeCalled();
  });

  it("return 401 for the request error occurs", async () => {
    try {
      login(request, response, next);
    } catch (err) {
      expect(next).not.toBeCalled();
      expect(err.statusCode).toBe(401);
      expect(err.message).toBe(ERROR.UNAUTHORIZED_USER);
    }
  });

  it("Should call User.findOne if user does not exists", async () => {
    User.findOne.mockReturnValue(null);

    await login(request, response, next);
    expect(User.findOne).toBeCalled();
  });
});
