import { toInputDateString, fromInputDateString } from "../dateInput";

describe("dateInput", () => {
  describe("toInputDateString", () => {
    it("formats a date as YYYY-MM-DD", () => {
      expect(toInputDateString(new Date("2024-03-05T15:00:00"))).toBe("2024-03-05");
    });
  });

  describe("fromInputDateString", () => {
    it("parses YYYY-MM-DD without timezone day shift", () => {
      const date = fromInputDateString("2024-03-05");
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(5);
    });
  });
});
