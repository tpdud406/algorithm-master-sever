const httpMocks = require("node-mocks-http");
const usersController = require("../controllers/users.controller");
const Problem = require("../../models/Problem");
const User = require("../../models/User");

let req, res, next;

beforeEach(() => {
  User.findById = jest.fn();
  User.findByIdAndUpdate = jest.fn();
  Problem.findByIdAndUpdate = jest.fn();
  Problem.findById = jest.fn();
  Problem.find = jest.fn();
  Problem.create = jest.fn();

  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

afterEach(() => {
  User.findById.mockClear();
  User.findByIdAndUpdate.mockClear();
  Problem.findByIdAndUpdate.mockClear();
  Problem.findById.mockClear();
  Problem.find.mockClear();
  Problem.create.mockClear();
});

describe("getSubmitResult", () => {
  beforeEach(() => {
    req.params = { user_id: "user_id" };
  });

  it("Have a getSubmitResult function", () => {
    expect(typeof usersController.getSubmitResult).toBe("function");
  });

  it("Should call User.findById", async () => {
    await usersController.getSubmitResult(req, res, next);

    expect(User.findById).toBeCalledTimes(1);
  });
});

describe("getProblems", () => {
  it("Have a getProblems function", () => {
    expect(typeof usersController.getProblems).toBe("function");
  });

  it("Should call Problem.find", async () => {
    await usersController.getProblems(req, res, next);

    expect(Problem.find).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    await usersController.getProblems(req, res, next);

    expect(res._getStatusCode()).toBe(200);
  });
});

describe("createProblem", () => {
  beforeEach(() => {
    req.params = { user_id: "user_id" };
    req.body = {
      inputs: {
        title: "test",
        description: "description",
        testDescription: "testDescription",
        testInput: "testInput",
        tesOutput: "tesOutput",
      },
    };
  });

  it("Have a createProblem function", () => {
    expect(typeof usersController.createProblem).toBe("function");
  });

  it("Should call Problem.create", async () => {
    await usersController.createProblem(req, res, next);

    expect(Problem.create).toBeCalledTimes(1);
  });

  it("Return 201 response code", async () => {
    await usersController.createProblem(req, res, next);

    expect(res._getStatusCode()).toBe(201);
  });
});

describe("getProblem", () => {
  beforeEach(() => {
    req.params = { problem_id: "problem_id" };
  });

  it("Have a getProblem function", () => {
    expect(typeof usersController.getProblem).toBe("function");
  });

  it("Should call Problem.findById", async () => {
    await usersController.getProblem(req, res, next);

    expect(Problem.findById).toBeCalledTimes(1);
  });

  it("Return 200 response code", async () => {
    await usersController.getProblem(req, res, next);

    expect(res._getStatusCode()).toBe(200);
  });
});

describe("runSolution", () => {
  beforeEach(() => {
    req.params = { user_id: "user_id", problem_id: "problem_id" };
  });

  it("Have a runSolution function", () => {
    expect(typeof usersController.runSolution).toBe("function");
  });

  it("Should call Problem.findById", async () => {
    req.body = { solutionCode: "solutionCode" };
    await usersController.runSolution(req, res, next);

    expect(Problem.findById).toBeCalledTimes(1);
  });

  it("Should not call Problem.findById If there is no solutionCode,", async () => {
    await usersController.runSolution(req, res, next);

    expect(Problem.findById).not.toBeCalled();
  });

  it("Return 200 response code", async () => {
    await usersController.runSolution(req, res, next);

    expect(res._getStatusCode()).toBe(200);
  });
});
