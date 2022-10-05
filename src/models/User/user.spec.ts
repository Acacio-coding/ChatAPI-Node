import { User } from "./User";
import { expect, test } from "vitest";
import { Properties } from "../../utils/Constants";
import {
  blankProperty,
  invalidPropertyLength,
  invalidPropertyNumber,
  invalidPropertySpecial,
} from "../../utils/Functions";

test("can create an user", () => {
  const user = new User({
    username: "user",
  });

  expect(user).toBeInstanceOf(User);
  expect(user.username).toEqual("user");
});

test("can create an user with an username containing letters and numbers", () => {
  const user = new User({
    username: "user123",
  });

  expect(user).toBeInstanceOf(User);
  expect(user.username).toEqual("user123");
});

test("cannot create an user with an blank username", () => {
  expect(() => {
    return new User({
      username: "",
    });
  }).toThrow(blankProperty(Properties.USERNAME));
});

test("cannot create an user with username length lesser than four characters", () => {
  expect(() => {
    return new User({
      username: "usr",
    });
  }).toThrow(invalidPropertyLength(Properties.USERNAME));
});

test("cannot create an user with an username containing only white spaces", () => {
  expect(() => {
    return new User({
      username: "     ",
    });
  }).toThrow(invalidPropertySpecial(Properties.USERNAME));
});

test("cannot create an user with username length bigger than 8", () => {
  expect(() => {
    return new User({
      username: "user12345",
    });
  }).toThrow(invalidPropertyLength(Properties.USERNAME));
});

test("cannot create an user with an username containing special characters", () => {
  expect(() => {
    return new User({
      username: "user_1",
    });
  }).toThrow(invalidPropertySpecial(Properties.USERNAME));
});

test("cannot create an user with an username containing only numbers", () => {
  expect(() => {
    return new User({
      username: "12345",
    });
  }).toThrow(invalidPropertyNumber(Properties.USERNAME));
});
