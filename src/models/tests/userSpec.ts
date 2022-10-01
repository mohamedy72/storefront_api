import { client } from "../../database";
import {
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  overrideSingleUser,
  User,
  userSignin,
  userSignup,
} from "../user";

describe("Testing users endpoints", () => {
  it("should include CREATE method", () => {
    expect(userSignup).toBeDefined();
  });
  it("should include READ/INDEX method", () => {
    expect(getAllUsers).toBeDefined();
  });
  it("should include UPDATE method", () => {
    expect(overrideSingleUser).toBeDefined();
  });
  it("should include DELETE method", () => {
    expect(deleteSingleUser).toBeDefined();
  });
});

describe("All CRUD operations on /users should work as expected", () => {
  const user = {
    user_id: 1,
    first_name: "mohamed",
    last_name: "yasser",
    username: "myasser_74",
    password: "as123",
  };

  it("should create a user", async () => {
    const result = await userSignup(user);

    expect(result).toEqual({
      user_id: 1,
      first_name: "mohamed",
      last_name: "yasser",
      username: "myasser_74",
      password: "as123",
    });
  });

  it("should list all users", async () => {
    const result = await getAllUsers();
    expect(result).toEqual([
      {
        user_id: 1,
        first_name: "mohamed",
        last_name: "yasser",
        username: "myasser_74",
        password: "as123",
      },
    ]);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      "DELETE FROM users; ALTER SEQUENCE users_user_id_seq RESTART WITH 1";
    await connection.query(sql);
    connection.release();
  });
});
