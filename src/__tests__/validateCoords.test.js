import { validateCoords } from "../js/validateCoords";

let result;

test("returns false", () => {
  result = validateCoords("12255");

  expect(result).toBe(false);
});

test("returns coords with []", () => {
  result = validateCoords("[0.123,0.12356]");

  const expectedRes = {
    lat: "0.123",
    long: "0.12356",
  };

  expect(result).toEqual(expectedRes);
});

test("returns coords with whitespace", () => {
  result = validateCoords("0.12563, 0.123");

  const expectedRes = {
    lat: "0.12563",
    long: "0.123",
  };

  expect(result).toEqual(expectedRes);
});
